import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import AddTaskModal from "../../components/Tasks/AddTask"
import EditTaskData from "../../components/Tasks/EditTaskData"
import TaskList from "../../components/Tasks/TaskList"
import TaskModalDetails from "../../components/Tasks/TaskModalDetails"
import { useAuth } from "../../hooks/useAuth"
import ProjectService from "../../services/ProjectService"
import { isManager } from "../../utils/Policies"

function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()

    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const { data, isError, isLoading } = useQuery({
        queryFn: () => ProjectService.getFullProjectById(projectId),
        queryKey: ['project', projectId],
        retry: 10
    })
 const canEdit = useMemo(()=>
 {
    if(data && data.manager){
        return data.manager == user._id
    }
    return false
 },[data,user])
    if (isLoading && authLoading) return 'Loading'
    if (isError) navigate('/404')
    if (data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName} </h1>
            <p className="text-2xl font-light text-gray-500 mt-5 ">
                {data.description}
            </p>
            {isManager(data.manager, user._id) && <nav className="my-5 flex gap-3">

                <button
                    onClick={() => navigate('?newTask=true')}
                    type="button" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">
                    Add task
                </button>

                <Link to={`team`}
                    className="bg-purple-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                    Team members
                </Link>

            </nav>}


            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal>

            </AddTaskModal>
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}

export default ProjectDetailsView