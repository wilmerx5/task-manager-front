import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import ProfileService from "../../services/ProfileService"
import { User, UserProfileForm } from "../../types"
import ErrorMessage from "../ErrorMessage"

export default function ProfileForm({ data }:{data:User}) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data })

    const {mutate}= useMutation({
        mutationFn:ProfileService.updateProfile,
        onSuccess:(data)=>{
            toast.success(data)
        },
        onError:(e)=>{
            toast.error(e.message)
        }
    })

    const queryClient = useQueryClient()

    const handleEditProfile = (formData:UserProfileForm) => {
        mutate(formData)
        queryClient.invalidateQueries({queryKey:['user']})
    }



    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            {...register("userName", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.userName && (
                            <ErrorMessage>{errors.userName.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
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
                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}