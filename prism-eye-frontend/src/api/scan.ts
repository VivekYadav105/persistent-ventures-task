import { QueryFunctionContext, useMutation, UseMutationResult, useQuery } from "react-query"
import axiosInstance from "./axiosinstance"
import { AxiosResponse } from "axios"

interface Scan{
    id:string,
    createdAt:string,
    updatedAt:string,
    image:string,
    results:{image:string,photoId:string,createdAt:string}[]
}

interface createScanRequest{
    file?:File,
    url?:string
}

interface history{
    count: 0
    createdAt:string 
    id:number|string 
    image:string
    userId:string 
}

const useCreateNewScanMutation = (): UseMutationResult<AxiosResponse<{scan:Scan}>, Error, createScanRequest> => {
    return useMutation({
        mutationKey: ["create-scan"],
        mutationFn: async ({file,url}:createScanRequest) => {
            const axios = axiosInstance();
            const data = new FormData();
            if(file){
                data.append("file",file)
            }
            if(url){
                data.append("url",url)
            }
            const res = await axios.post<{scan:Scan}>("/scan/create",data,{headers:{
                "Content-Type":"multipart/form-data"
            }});
            return res;
        }
    });
};

const useGetHistoryQuery = ()=>{
    return useQuery({
        queryKey:["history"],
        queryFn:async()=>{
            const axios = axiosInstance()
            const res = await axios.get<{history:history[]}>("/scan/")
            return res.data.history
        }    
    })
}

const useGetScanResultQuery = (id:string)=>{
    return useQuery({
        queryKey:["get-scan",id],
        queryFn:async(context:QueryFunctionContext)=>{
            const id = context.queryKey[1]
            const axios = axiosInstance()
            const res = await axios.get<{scan:Scan}>(`/scan/${id}`)
            return res.data.scan
        },
        enabled:!!id
    })
}

export {
    useCreateNewScanMutation,
    useGetHistoryQuery,
    useGetScanResultQuery
}