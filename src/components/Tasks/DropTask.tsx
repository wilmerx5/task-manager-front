import { useDroppable } from "@dnd-kit/core"


function DropTask({status}:{status:string}) {
const {setNodeRef, isOver}= useDroppable({
    id:status
})

const style ={
    opacity:isOver?0.4:undefined
}
    return (
    <div
    style={style}
    ref={setNodeRef}
    className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-300 mt-5 grid
    place-content-center text-slate-500"
    >DropTask here</div>
  )
}

export default DropTask