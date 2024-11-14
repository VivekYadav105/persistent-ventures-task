/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import toast from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";
import {BarLoader} from 'react-spinners'
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../api/auth";
import { AxiosError } from "axios";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface LoginFormValues{
    email:string;
    password:string;
}

const Login = ()=>{
    const {register,handleSubmit,formState} = useForm<LoginFormValues>();
    const {isLoading:loading,isSuccess,isError,error,mutate} = useLoginMutation();
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess){
            window.location.href = '/'
        }
    },[isSuccess])

    useEffect(()=>{
        if(isError){
            if(error instanceof AxiosError)
            toast.error(error?.message)
        }
    },[isError])

    const submitForm = (data:LoginFormValues)=>{
        console.log(data);
        mutate(data)
    }
    const [showPassword,setShowPassword] = useState(false);

    return(
        <div className="flex justify-center sm:p-5 items-center ">
        <div className="p-5 sm:p-8 md:p-5 bg-transparent rounded-xl  lg:shadow-none">
            <article className="text-center md:mb-10">
                <h1 className="text-2xl md:text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Insight</span></h1>
                <p className="font-semibold mt-3">Login to your account</p>
            </article>
            <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
                <div className="input-field flex flex-col">
                    <label htmlFor="" className="text-xs">Email</label>
                    <input type="text" placeholder="Enter your Email" className="border-2 border-blue-400 rounded-xl p-2.5" {...register('email',{required:{value:true,message:"Email is required"}})}/>
                    <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="email"/>
                </div>
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
                    <Link to={'/auth/forgot'} className="self-end mt-2">
                        <button type="button" className="text-xs hover:text-violet-500 cursor-pointer duration-300">Forgot Password</button>
                    </Link>
                </div>
                <div className="input-wrapper flex itemx-center gap-2">
                    <button type="submit" className={`bg-blue-800 hover:bg-blue-300 flex flex-col items-center justify-center gap-2 ${loading?"cursor-none":""} text-white rounded-sm w-full duration-300 shadow-md p-2`}>
                            Login
                        {loading&&(<BarLoader/>)}
                    </button>
                </div>
                <article className="border-t-2 hidden md:inline-block relative border-gray-500">
                    <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#F3FFDA] p-1 text-xs inline-block rounded-xl">Or</span>
                </article>
                <div className="input-wrapper">
                    <article className="text-xs text-center">
                        Don&apos;t have account?<button onClick={()=>navigate('/auth/signup')} type="button" className="text-xs mx-1 underline text-medium text-main">Create Here</button>
                    </article>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login