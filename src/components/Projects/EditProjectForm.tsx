import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ProjectService from "../../services/ProjectService"
import { ProjectFormData } from "../../types"
import ProjectForm from "./ProjectForm"

type EditProjectFormProps = {
  project: ProjectFormData
  projectId: string
}


export default function EditProjectForm({ project, projectId }: EditProjectFormProps) {


  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: project.projectName,
    clientName: project.clientName,
    description: project.description
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })


  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ProjectService.updateProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:['projects']})
      queryClient.invalidateQueries({queryKey:['editProject', projectId ]})

      toast.success('updated')
      navigate('/')
    }, onError: (e) => {
      toast.error(`Not updated ${e}`)
      console.log(e)
    }
  })
  const handleForm = async (data: ProjectFormData) => {

    const formdata={
      formData:data,
      projectId

    }
    await mutation.mutate(formdata)
  }
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black"> Edit Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5"> EditProject</p>

        <nav className="py-5">
          <Link to='/' className="mt-10 bg-purple-400 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">

            Back Home
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
          className="mt-10 bg-white shadow-lg p-10 rounded-lg ">

          <ProjectForm
            register={register}
            errors={errors}
          />

          <input
            className="bg-fuchsia-600 w-full text-white font-black p-3 hover:bg-fuchsia-700  
            cursor-pointer transition-colors"
            type="submit" value='Edit Project'>
          </input>
        </form>
      </div>
    </>
  )

}
