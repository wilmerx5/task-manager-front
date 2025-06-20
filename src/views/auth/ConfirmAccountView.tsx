import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';
export default function ConfirmAccountView() {
    const [token, setToken] = useState('')

    const handleChange=(token:string)=>{
        setToken(token)
    }

    const {mutate}= useMutation({
        mutationFn: AuthService.confirmAccount,
        onSuccess:(data)=>{
            toast.success(data)
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })
    const handleComplete=(token:string)=>{
            mutate(token)
    }
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className='w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white'/>
            <PinInputField className='w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white'/>
            <PinInputField className='w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white'/>
            <PinInputField className='w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white'/>
            <PinInputField className='w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white'/>
            <PinInputField className='w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white'/>

        </PinInput>
        </div>

      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/new-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}
