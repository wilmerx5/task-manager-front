import { useQuery } from "@tanstack/react-query"
import AuthService from "../services/AuthService"

export const useAuth=()=>{
    const{data,isError, isLoading}= useQuery({

        queryKey:['user'],
        queryFn:AuthService.getUser,
        retry:false,
        refetchOnWindowFocus:false
    })
    return {data,isError, isLoading}
}