import { isAxiosError } from "axios";
import api from "../lib/axios";
import { checkPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, SignUpForm, UserLoginForm, UserSchema } from "../types";

export default {

    createAccount: async (formData: SignUpForm) => {
        try {
            const { data } = await api.post(`/auth/sign-up`, formData)
            console.log(data)
            return data

        }
        catch (e) {
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },

    confirmAccount: async (token: string) => {
        try {
            const { data } = await api.post(`/auth/confirm-account`, { token })
            console.log(data)
            return data

        }
        catch (e) {
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },

    requestConfirmationCode: async (formData: RequestConfirmationCodeForm) => {
        try {
            const { data } = await api.post(`/auth/request-confirmation-code`, formData)
            console.log(data)
            return data

        }
        catch (e) {
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },
    requestRecoveredPasswordCode: async (formData: ForgotPasswordForm) => {
        try {
            const { data } = await api.post(`/auth/forgot-password`, formData)
            console.log(data)
            return data

        }
        catch (e) {
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },
    login: async (formData: UserLoginForm) => {
        try {
            const { data } = await api.post(`/auth/login`, formData)
            console.log(data)
            localStorage.setItem('up_token', data)
            return data

        }
        catch (e) {
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },
    validateToken: async (formData: ConfirmToken) => {

        try {
            const { data } = await api.post(`/auth/validate-token`, formData)
            console.log(data)
            return data

        }
        catch (e) {
            console.log(e)
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },
    updatePassword: async ({ formData, token }: { formData: NewPasswordForm, token: string }) => {
        console.log(formData, token)
        try {
            const { data } = await api.post(`/auth/update-password/${token}`, formData)
            console.log(data)
            return data

        }
        catch (e) {
            console.log(e)
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },

    getUser: async () => {
        try {
            const { data } = await api.get(`/auth/user`)

            const response = UserSchema.safeParse(data)
            if (response.success) {
                return data
            }
            throw new Error('as')
            console.log(data)

        }
        catch (e) {
            console.log(e)
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },


    checkPassword: async (formData:checkPasswordForm) => {
        try {
            const { data } = await api.post(`/auth/check-password`,formData)
            
            return data

        }
        catch (e) {
            console.log(e)
            console.log(e)
            if (isAxiosError(e) && e.response) {
                throw new Error(`Error in request ${e.response.data.msg}`)
            }
            throw new Error(`Error in request `)
        }
    },

}