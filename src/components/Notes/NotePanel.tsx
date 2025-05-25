import { Task } from "../../types"
import AddNoteForm from "./AddNoteForm"
import NoteDetail from "./NoteDetail"




function NotePanel({ notes }: { notes: Task['notes'] }) {

    return (
        <>
            <AddNoteForm />

            <div className="divide-y divide-gray-100 mt-10">

                {notes.length ? (<>
                    <p className="font-bold text-2xl text-slate-600 my-5">
                        Notes:

                    </p>
                    {notes.map(note => <NoteDetail note={note} key={note._id} />)}
                </>) : <p className="text-gray-500 text-center pt-3">
                    There are not notes
                </p>}

            </div>
        </>
    )
}

export default NotePanel