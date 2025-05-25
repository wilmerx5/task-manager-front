import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import TaskService from "../../services/TaskService"
import EditTaskModal from "./EditTaskModal"

function EditTaskData() {
    const params= useParams()
    const projectId= params.projectId! 

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!
    const {data,isError} = useQuery({
        queryKey:['task',taskId],
        queryFn:()=>TaskService.getTaskById({projectId,taskId}),
        enabled:!!taskId
    })
if(isError) return <Navigate to={'/404'}></Navigate>

  if (data) return <EditTaskModal task={data.data.task}/> 
}


export default EditTaskData