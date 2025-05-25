import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";
import type { NewPasswordForm } from "../../types";
import ErrorMessage from "../ErrorMessage";


type NewPasswordFormProps={
    token:string
}

export default function NewPasswordForm({token}:NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        passwordConfirmation: '',
    }
    
    const {mutate}= useMutation({
        mutationFn:AuthService.updatePassword,
        onSuccess:(data)=>{
            toast.success(data)
            navigate('/auth/login')
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });


    const handleNewPassword = (formData: NewPasswordForm) => {


mutate({formData,token})
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("passwordConfirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.passwordConfirmation && (
                        <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}