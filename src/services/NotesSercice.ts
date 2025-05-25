import { isAxiosError } from "axios"
import api from "../lib/axios"
import { NoteFormData, ProjectT, Task } from "../types"


type NoteAPIType={
    formData:NoteFormData
    ,projectId:ProjectT['_id']
    ,taskId:Task['_id'],
    noteId:string
}

export default{
        createNote: async ({projectId,taskId,formData}:Pick<NoteAPIType,'formData'|'projectId' |'taskId' >) => {
            try {
                const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/notes`,formData)
                console.log(data)
                return data
            }
            catch (e) {
    
                if (isAxiosError(e) && e.response) {
                    throw new Error(` ${e.response.data.msg}`)
                }
                throw new Error(`Error ${e}`)
    
            }
        },

        deleteNote: async ({projectId,taskId,noteId}:Pick<NoteAPIType,'noteId' | 'projectId' | 'taskId'>) => {
            try {
                const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`)
                console.log(data)
                return data
            }
            catch (e) {
                console.log(e)
    
                if (isAxiosError(e) && e.response) {
                    throw new Error(` ${e.response.data.msg}`)
                }
                throw new Error(`Error ${e}`)
    
            }
        },
}