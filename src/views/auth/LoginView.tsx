
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage";
import AuthService from "../../services/AuthService";
import { UserLoginForm } from "../../types";

export default function LoginView() {

    const navigate = useNavigate()
    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const{mutate}= useMutation({
        mutationFn:AuthService.login,
        onSuccess:(data)=>{
                toast.success('Sabia que eras tu :)')
                navigate('/')
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })
    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

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
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <p className="text-white">Don you have an account?  <Link className="text-fuchsia-500 underline" to={'/auth/register'}> Create One</Link></p>
                <p className="text-white">Forgot  yout password?  <Link className="text-fuchsia-500 underline" to={'/auth/forgot-password'}> Recovered it</Link></p>

            </nav>
        </>
    )
}
