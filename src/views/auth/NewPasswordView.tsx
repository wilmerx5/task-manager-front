import { useState } from "react"
import NewPasswordToken from "../../components/auth/NewPassWordToken"
import NewPasswordForm from "../../components/auth/NewPasswordForm"

export default function NewPasswordView() {
  const [token, setToken] = useState<string>('')
    const [isValidToken, setIsValidToken]= useState(false)
  return (
    <>
    <p className="text-fuchsia-500 font-bold">Write the code that you get by email</p>

    {isValidToken==false?<NewPasswordToken token={token} setIsValidToken={setIsValidToken} setToken={setToken}/>
    
    :<NewPasswordForm token={token}/>}
    </>
  )
}
