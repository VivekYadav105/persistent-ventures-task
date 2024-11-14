import { useMutation, useQuery } from "react-query"
import axiosInstance from "./axiosinstance"

export interface LoginData{
    email:string,
    password:string
}

export interface SignupData{
    email:string,
    password:string
}

export interface ResetData{
    password:string,
    cnfrmPassword:string
}

const useLoginMutation = ()=>{
    return useMutation({
        mutationFn:async(data:LoginData)=>{
            const axios = axiosInstance({},false)
            const response = await axios.post('/auth/login',data)
            localStorage.setItem('token',response.data.token)
            return response
        },
        mutationKey:['login']
    })
}

const useSingupMutation = ()=>{
    return useMutation({
        mutationFn:async(data:SignupData)=>{
            const axios = axiosInstance({},false)
            const response = axios.post('/auth/signup',data)
            return response
        },
        mutationKey:['signup']
    })
}

export const useGetCredentialsQuery = ()=>{
    return useQuery({
        queryFn:async()=>{
            const axios = axiosInstance({headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}},false)
            const response = await axios.get('/auth/credLeft')
            return response.data
        },
        queryKey:['credentials']
    })
}

const useForgotMutation = ()=>{
    return useMutation({
        mutationFn:async(data:{email:string})=>{
            const axios = axiosInstance({},false)
            const response = axios.post<{email:string}>('/auth/forgot',data)
            return response
        },
        mutationKey:['forgot']
    })
}

export const useCreateMutation = ()=>{
    return useMutation({
        mutationFn:async(token:string)=>{
            const axios = axiosInstance({headers:{Authorization:`Bearer ${token}`}},false)
            const response = axios.post('/auth/create')
            return response
        },
        mutationKey:['create']
    })
}

const useResetMutation = () => {
    return useMutation({
        mutationFn: async ({ data, token }: { data: ResetData; token: string }) => {
            const axios = axiosInstance({ headers: { Authorization: `Bearer ${token}` } }, false)
            const response = await axios.post('/auth/reset', data)
            return response
        },
        mutationKey: ['reset']
    })
}
const useVerifyTokenQuery = (token?:string)=>{
    return useQuery({
        queryFn:async()=>{
            const axios = axiosInstance({headers:{Authorization:`Bearer ${token}`}},false)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const response = axios.get(`/auth/verifyToken/temp`)
            return response
        },
        queryKey:['verify'],
        enabled:!!token,
        cacheTime:0
    })
}

const useResetTokenQuery = (token?:string)=>{
    return useQuery({
        queryFn:async()=>{
            const axios = axiosInstance({},false)
            const response = axios.get(`/auth/reset/${token}`)
            return response
        },
        queryKey:['reset'],
        enabled:!!token,
    })
}


export {
    useLoginMutation,
    useSingupMutation,
    useForgotMutation,
    useResetMutation,
    useVerifyTokenQuery,
    useResetTokenQuery
}