/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast";
import {CircleLoader} from 'react-spinners'
import { useEffect, useState } from "react";
import { useCreateMutation } from "../../api/auth";
import { AxiosError } from "axios";


const Verify = ()=>{
    const params =useParams()
    const {isSuccess:creationSuccess,isLoading:creationLoading,error,isError:creationError,mutate} = useCreateMutation();
    const navigate = useNavigate();
    const [mouted,setMounted] = useState(false) 

    useEffect(()=>{
        if(!params.token) navigate('/')
        if(params.token&&!mouted){{
            setMounted(true)
            mutate(params.token)
        }}
    },[params.token])

    useEffect(()=>{
        if(creationSuccess){
            toast.success('Account created successfully')
            navigate('/')
        }
    },[creationSuccess])

    useEffect(()=>{
        if(creationError){
            if(error instanceof AxiosError){
                toast.error(error?.message)
                navigate('/')
            }
        }
    },[creationError])

    return(
        <div className="flex justify-center sm:p-5 items-center ">
        <div className="p-5 sm:p-8 md:p-5 bg-lime-500/30  lg:bg-transparent rounded-xl  lg:shadow-none">
            <img src="/logo.png" className="m-auto w-[180px] md:hidden h-[60px] mb-5 p-3 bg-white rounded-md"/>
            <article className="text-center md:mb-10">
                <h1 className="text-2xl md:text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Insight</span></h1>
                <p className="font-semibold mt-3">Please wait while we Create your account</p>
            </article>
            <article className="max-w-sm m-auto flex flex-col gap-6">
                <CircleLoader loading={creationLoading} color="#36d7b7" size={50} className="m-auto"/>
                {creationLoading&&<p className="text-[#36d7b7] text-center">creating the user ...</p>}
            </article>
        </div>
    </div>
    )
}

export default Verify