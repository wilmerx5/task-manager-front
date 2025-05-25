import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaskService from '../../services/TaskService';
import { TaskFormData } from '../../types';
import TaskForm from './TaskForm';

export default function AddTaskModal() {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const initialValues: TaskFormData = {
        name: '',
        description: ''
    }

    const queryClient= useQueryClient()
    const {mutate}= useMutation({
        mutationFn: TaskService.createTask,
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['editProject', projectId]})
            toast.success('task Added')
            navigate('', { replace: true })
            reset()
        },
        onError:(e)=>{
            toast.error(e.message)
        }
    }) 
    const { register, handleSubmit,reset, formState: { errors } } = useForm({ defaultValues: initialValues })
    const show = modalTask ? true : false

    const handleCreateTask = (formData: TaskFormData) => {
        const data={
            formData,
            projectId:projectId,
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate('', { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        className='mt-10 space-y-3'
                                        noValidate
                                    >

                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        >

                                        </TaskForm>

                                        <input
                                            value='save task'
                                            className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full
                                        p-3 text-white uppercase font-bold
                                        cursor-pointer transition-colors
                                        '
                                            type='submit'>

                                        </input>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}