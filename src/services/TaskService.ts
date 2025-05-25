import { isAxiosError } from "axios"
import api from "../lib/axios"
import { ProjectT, Task, TaskFormData, TaskSchema } from "../types"

export default {

    createTask: async ({ formData, projectId }: { formData: TaskFormData, projectId: ProjectT['_id'] }) => {
        try {
            const { data } = await api.post(`/projects/${projectId}/tasks`, formData)
            return data
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(`Axios error ${e}`)
            }
            throw new Error(`Error ${e}`)

        }
    },
    getTaskById: async ({ projectId, taskId }: { projectId:ProjectT['_id'], taskId: Task['_id'] }) => {
        try {
            const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}` )
            const response =TaskSchema.safeParse(data.data.task)
            console.log(data)
            console.log(response)
            if(response.success){

                return data
            }
            throw new Error("error paarsing")
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(`Axios error ${e}`)
            }
            throw new Error(`Error ${e}`)

        }
    },

    updateTask: async ({ projectId, taskId, formData }: { projectId:ProjectT['_id'], taskId: Task['_id'], formData: TaskFormData }) => {
        try {
            const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, formData )
            return data
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(`Axios error ${e}`)
            }
            throw new Error(`Error ${e}`)

        }
    },

    deleteTask: async ({ projectId, taskId }: { projectId:ProjectT['_id'], taskId: Task['_id'] }) => {
        try {
            const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}` )
            return data
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(`Axios error ${e}`)
            }
            throw new Error(`Error ${e}`)

        }
    },

    updateTaskStatus: async ({ projectId, taskId, status }: { projectId:ProjectT['_id'], taskId: Task['_id'], status: Task['status'] }) => {
        try {
            const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/status`,{status} )
            return data
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(`Axios error ${e}`)
            }
            throw new Error(`Error ${e}`)

        }
    },
}