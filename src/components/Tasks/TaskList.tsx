import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaskService from '../../services/TaskService';
import { ProjectT, TaskProject, TaskStatus } from "../../types";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";

type TaskListProps = {
    tasks: TaskProject[],
    canEdit: boolean
}

type GroupedTask = {
    [key: string]: TaskProject[]
}

function TaskList({ tasks, canEdit }: TaskListProps) {

    const initialStatusGroups: GroupedTask = {
        pending: [],
        onHold: [],
        inProgress: [],
        underReview: [],
        completed: [],

    }

    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: TaskService.updateTaskStatus,
        onSuccess: () => {
            toast.success('status updated')
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            //queryClient.invalidateQueries({ queryKey: ['task', taskId] })


        },
        onError: () => {
            toast.error('error updating estatus')
        }
    })

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const statusStyles: { [key: string]: string } = {
        pending: 'border-t-slate-500',
        onHold: 'border-t-red-500',
        inProgress: 'border-t-blue-500',
        underReview: 'border-t-amber-500',
        completed: 'border-t-emerald-500',

    }
    const handleDragEnd = (e: DragEndEvent) => {

        const { over, active } = e
        if (over && over.id) {
            const taskId = active.id.toString()
            const status = over.id as TaskStatus

            mutate({ projectId, taskId, status })

            queryClient.setQueryData(['project', projectId], (prevData:ProjectT) => {

                const updatedData = prevData.tasks.map((task: TaskProject) => {
                    if (task._id === active.id) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })
                return {
                    ...prevData,
                    tasks: updatedData
                }
            })
        }
    }
    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd} >
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 className={`capitalize text-xl
                         font-light border border-slate-300 bg-white p-3  border-t-8 ${statusStyles[status]}`}>{status}</h3>

                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard canEdit={canEdit} key={task._id} task={task} />)
                                )}
                            </ul>
                        </div>
                    ))}</DndContext>
            </div>
        </>
    )
}

export default TaskList