import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import NotesSercice from "../../services/NotesSercice"
import { NoteFormData } from "../../types"
import ErrorMessage from "../ErrorMessage"

function AddNoteForm() {
    const initialValues: NoteFormData = {
        content: ''
    }
    const { register, handleSubmit,reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient= useQueryClient()

    const { mutate } = useMutation({
        mutationFn: NotesSercice.createNote,
        onSuccess: (data) => {
            toast.success(data.msg)
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        },
        onError: (err) => {
            toast.error('error')
        }
    })
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams  = new URLSearchParams(location.search)

    const taskId = queryParams.get('viewTask')!

    const handleAddNote = (formData: NoteFormData) => {
        const data = {
            projectId,
            taskId,
            formData
        }
        mutate(data)
        reset()
    }


    return (
        <>
            <form
                onSubmit={handleSubmit(handleAddNote)}
                className="space-y-3"
                noValidate
            >

                <div className="flex flex-col gap-2">
                    <label className="font-bold" htmlFor="content">Create Note</label>
                    <input id="content" type="text" placeholder="content" className="w-full p-3 border border-gray-300"
                        {...register('content', {
                            required: 'The content is required'
                        })}
                    >
                    </input>


                    {errors.content && (
                        <ErrorMessage>
                            {errors.content.message}
                        </ErrorMessage>
                    )}

                </div>
                <input type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-900 w-full p-2 text-white font-black cursor-pointer"
                    value='save'
                >
                </input>
            </form>
        </>
    )
}

export default AddNoteForm