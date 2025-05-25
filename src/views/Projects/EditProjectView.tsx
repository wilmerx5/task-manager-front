import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import EditProjectForm from "../../components/Projects/EditProjectForm"
import ProjectService from "../../services/ProjectService"

function EditProjectView() {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()
    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => ProjectService.getProjectById(projectId),
        retry: 10
    })
    if (isLoading) return 'Loading'
    if (isError) navigate('/404')
    if (data) return (
        <EditProjectForm projectId={projectId} project={data} />
    )
}

export default EditProjectView