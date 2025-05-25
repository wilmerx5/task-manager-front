import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import NotesSercice from "../../services/NotesSercice"
import { Note } from "../../types"
import { formatDate } from "../../utils/utils"

function NoteDetail({ note }: { note: Note }) {

    const { data, isLoading } = useAuth()

    const params = useParams()
    const location= useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId= queryParams.get('viewTask')!

    const queryClient = useQueryClient()

    const {mutate}= useMutation({
        mutationFn: NotesSercice.deleteNote,
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })
    const onDelete=()=>{
        const data ={
            projectId,
            taskId,
            noteId: note._id

        }
        mutate(data)
    }
    const canDelete = useMemo(() => data?._id == note.createdBy._id, [data])

    if (isLoading) return 'Loading'
    return (
        <div className="p-3 flex justify-between items-center">
            <p>
                {note.content} by:<span className="font-bold"> {note.createdBy.userName}</span>
            </p>
            <p>
                {formatDate(note.createdAt)}
            </p>

            {
                canDelete && (<button 
                    onClick={()=>{onDelete()}}
                    type="button" className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transitions-color">Delete</button>)
            }

        </div>
    )
}

export default NoteDetail