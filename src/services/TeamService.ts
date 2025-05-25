import { isAxiosError } from "axios"
import api from "../lib/axios"
import { ProjectT, TeamMember, TeamMemberForm, TeamMembersSchema } from "../types"

export default {
    findUserByEmail: async ({projectId,formData}:{projectId:ProjectT['_id'],formData:TeamMemberForm}) => {
        try {
            const { data } = await api.post(`/projects/${projectId}/team/find`, formData)
            return data
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(` ${e.response.data.msg}`)
            }
            throw new Error(`Error ${e}`)

        }
    },
    addMemberToTeam: async ({projectId,id}:{projectId:ProjectT['_id'],id:TeamMember['_id']}) => {
        try {
            const { data } = await api.post(`/projects/${projectId}/team`, {id})
            return data
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(` ${e.response.data.msg}`)
            }
            throw new Error(`Error ${e}`)

        }
    },
    getTeamMembers: async (projectId:ProjectT['_id']) => {
        try {
            const { data } = await api(`/projects/${projectId}/team`)
            const response = TeamMembersSchema.safeParse(data.team)
            console.log(response,data)
            if(response.success){

                return data
            }
            throw new Error('invalid response')
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(` ${e.response.data.msg}`)
            }
            throw new Error(`Error ${e}`)

        }
    },

    removeMember: async ({projectId,memberId}:{projectId:ProjectT['_id'],memberId:TeamMember['_id']}) => {
        try {
            const { data } = await api.delete(`/projects/${projectId}/team/${memberId}`)
            return data
        }
        catch (e) {

            if (isAxiosError(e) && e.response) {
                throw new Error(` ${e.response.data.msg}`)
            }
            throw new Error(`Error ${e}`)

        }
    },
    
}