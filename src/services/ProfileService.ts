import { isAxiosError } from "axios";
import api from "../lib/axios";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";

export default {

    updateProfile: async (formData: UserProfileForm) => {
        try {
            const { data } = await api.put('/auth/profile', formData)
            return data
        }
        catch (e) {
            if (isAxiosError(e) && e.response) {
                throw new Error(e.response.data.msg)
            }
            throw new Error('unknown erro')

        }
    },

    changePassword: async (formData: UpdateCurrentUserPasswordForm) => {
        console.log(formData)
        try {
            const { data } = await api.put('/auth/update-password', formData)
            return data
        }
        catch (e) {
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(e.response.data.msg)
            }
            throw new Error('unknown erro')

        }
    }
}