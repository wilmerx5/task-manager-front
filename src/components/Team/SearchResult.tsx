import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TeamService from "../../services/TeamService";
import { TeamMember } from "../../types";

export default function SearchResult({ user, reset }: { user: TeamMember, reset:()=>void }) {

    const params = useParams()
    const projectId= params.projectId!
    const queryClient= useQueryClient()

    const {mutate}= useMutation({
        mutationFn:TeamService.addMemberToTeam,
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({
                queryKey:['projectTeam',projectId]
            })
            
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })
    const addMember = async()=>{
        const data={
            projectId,
            id:user._id
        }
        mutate(data)
    }
    return (
        <>

            <p className="mt-10 text-center font-bold">
                Result:
            </p>
            <div className="flex justify-between items-center">
                <p>{user.userName}</p>
                <button
                onClick={addMember}
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                >
                    Add to Project
                </button>
            </div>
        </>
    )
}
