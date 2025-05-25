import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Fragment } from "react/jsx-runtime"
import AddMemberModal from "../../components/Team/AddMemberModal"
import TeamService from "../../services/TeamService"
import { TeamMember } from "../../types"

function ProjectTeamView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn:TeamService.removeMember,
        onSuccess:()=>{
            toast.success('deleted from project')
            queryClient.invalidateQueries({
                queryKey:['projectTeam',projectId]
            })
        },
        onError:(err)=>{
            toast.error(err.message)

        }
    })

    const { data, isLoading, isError } = useQuery({
        queryFn: () => TeamService.getTeamMembers(projectId),
        queryKey: ['projectTeam', projectId],
        retry: false
    })

    if (isLoading) return <p>Loading</p>
    if (isError) return <Navigate to={'/404'}></Navigate>

    if (data) return (
        <>
            <h1 className="text-5xl font-black">Manage your team</h1>
            <p className="text-2xl font-light text-gray-500 mt-5 ">

            </p>
            <nav className="my-5 flex gap-3">

                <button
                    onClick={() => navigate(`/project/${projectId}`)}
                    type="button" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">
                    Back to project
                </button>

                <button onClick={() => navigate(location.pathname + '?addMember=true')}
                    className="bg-purple-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                    Add member
                </button>

            </nav>

            <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
            {data.team.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data?.team.map((member: TeamMember) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                        {member.userName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                <button
                                                onClick={()=>{
                                                    const data = {
                                                        projectId,
                                                        memberId: member._id
                                                    }
                                                    mutate(data)
                                                }}
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}
            <AddMemberModal />
        </>
    )
}

export default ProjectTeamView