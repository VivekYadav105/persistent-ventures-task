/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import {useForm} from 'react-hook-form'
import toast from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";
import {BarLoader, CircleLoader} from 'react-spinners'
import { useEffect, useState } from "react";
import { useResetMutation, useResetTokenQuery } from "../../api/auth";
import { AxiosError } from "axios";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface ResetFormValues{
    password:string;
    cnfrmPassword:string;
}

const Reset = ()=>{
    const {register,handleSubmit,formState} = useForm<ResetFormValues>();
    const {isLoading:loading,isSuccess,isError,error,mutate} = useResetMutation();
    const params = useParams()
    const {isLoading:tokenLoading} = useResetTokenQuery(params.token);                                                                                                            
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess){
            toast.success('Password reset successfully')
            navigate('/')
        }
    },[isSuccess])

    useEffect(()=>{
        if(isError){
            if(error instanceof AxiosError)
            toast.error(error?.message)
        }
    },[isError])


    const submitForm = (data:ResetFormValues)=>{
        mutate({data,token:params.token as string})
    }

    return(
        <div className="flex justify-center sm:p-5 items-center ">
        <div className="p-5 sm:p-8 md:p-5 lg:bg-transparent rounded-xl  lg:shadow-none">
            <article className="text-center md:mb-10">
                <h1 className="text-2xl md:text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Insight</span></h1>
                <p className="font-semibold mt-3">Create your new Password</p>
            </article>
            {tokenLoading&&<div className="flex justify-center"><CircleLoader loading={tokenLoading} color="#15f347" /></div>}
            {!tokenLoading&&<form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
            <div className="input-field flex flex-col">
                    <label htmlFor="">Password</label>
                    <article className="w-full border-2 border-blue-400 rounded-xl bg-white flex items-center">
                        <input placeholder="Enter your password" className="bg-transparent p-2.5 rounded-lg outline-none  h-full flex-1" type={showPassword?"text":"password"} {...register('password',{required:{value:true,message:"Password cannot be empty"}})}/>   
                        <button type="button" className="p-2 pe-4" onClick={()=>setShowPassword(prev=>!prev)}>
                            {showPassword?
                                <IoMdEye/>
                                :<IoMdEyeOff/>
                            }
                        </button>
                    </article>
                    <ErrorMessage 
                        render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} 
                        name="password" 
                        errors={formState.errors}
                    />
                </div>
                <div className="input-field flex flex-col">
                    <label htmlFor="" className="text-xs">Confirm Password</label>
                    <input type={showPassword?"password":"text"} placeholder="Enter your Password" className="border-2 border-blue-400 rounded-xl p-2.5" {...register('cnfrmPassword',{required:{value:true,message:"password is required"}})}/>
                    <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="cnfrmPassword"/>
                </div>
                <div className="input-wrapper flex itemx-center gap-2">
                    <button type="submit" className={`bg-blue-800 hover:bg-blue-300 flex flex-col items-center justify-center gap-2 ${loading?"cursor-none":""} text-white rounded-sm w-full duration-300 shadow-md p-2`}>
                        Create Password
                        {loading&&(<BarLoader/>)}
                    </button>
                </div>
            </form>}
        </div>
    </div>
    )
}

export default Reset