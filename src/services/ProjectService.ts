import { isAxiosError } from "axios";
import api from "../lib/axios";
import { DashboardProjectSchema, ProjectFormData, ProjectT } from "../types";

export default {
    createProject: async (formData: ProjectFormData) => {
        try {
            const { data } = await api.post('/projects', formData)
            return data

        } catch (e) {
            if (isAxiosError(e)) {
                throw new Error(e.response?.data)
            } else {
                throw new Error(`Try again later ${e}`)

            }
        }
    },
    getProjects: async () => {
        const token = localStorage.getItem('up_token')
        try {
            const { data } = await api.get('/projects')
            const response = DashboardProjectSchema.safeParse(data.projects)
            if (response.success) {

                return response.data
            } else {

                throw new Error("error")
            }
        } catch (e) {
            console.log(e)
            if (isAxiosError(e)) {
                throw new Error(e.response?.data)
            } else {
                throw new Error(`Try again later ${e}`)

            }
        }
    },

    getProjectById: async (id: ProjectT['_id']) => {
        try {
            const { data } = await api.get(`/projects/${id}`)
            console.log(data)
            return data.project
        } catch (e) {
            console.log(e)
            if (isAxiosError(e)) {
                throw new Error(e.response?.data)
            } else {
                throw new Error(`Try again later ${e}`)
            }
        }
    },
    updateProject: async ({ formData, projectId }: { formData: ProjectFormData, projectId: string }) => {
        try {
            const { data } = await api.put(`/projects/${projectId}`, formData)
            console.log(data, 'assa')
            return data.project
        } catch (e) {
            console.log(e)
            if (isAxiosError(e)) {
                throw new Error(e.response?.data)
            } else {
                throw new Error(`Try again later ${e}`)
            }
        }
    },
     deleteProject: async (id: ProjectT['_id']) => {
        try {
            const { data } = await api.delete(`/projects/${id}`)
            console.log(data)
            return data.project
        } catch (e) {
            console.log(e)
            if (isAxiosError(e)) {
                throw new Error(e.response?.data)
            } else {
                throw new Error(`Try again later ${e}`)
            }
        }
    },


}