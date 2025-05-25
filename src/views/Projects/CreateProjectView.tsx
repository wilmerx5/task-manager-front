import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ProjectForm from "../../components/Projects/ProjectForm"
import ProjectService from "../../services/ProjectService"
import { ProjectFormData } from "../../types"

import { useMutation } from "@tanstack/react-query"
import 'react-toastify/dist/ReactToastify.css'

function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        projectName: '',
        clientName: '',
        description: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: ProjectService.createProject,
        onSuccess: (data) => {
            navigate('/')
            toast.success('Created')
        }, onError: (e) => {
            toast.error(`Not created  ${e}`)
            console.log(e)
        }
    })
    const handleForm = async (data: ProjectFormData) => { await mutation.mutate(data) }
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black"> Add a project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5"> Manage and create your projects</p>

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
                        type="submit" value='Save Project'>
                    </input>
                </form>
            </div>
        </>
    )
}

export default CreateProjectView