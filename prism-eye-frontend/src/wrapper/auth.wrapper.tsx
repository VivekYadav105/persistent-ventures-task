import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import loginIllustration from '../assets/login-illustration.png'

const AuthWrapper:React.FC = ()=>{

    if(localStorage.getItem('token')){
        return <Navigate to={'/main/'}/>
    }

    return(
        <section className="bg-blue-500 min-h-screen flex items-center justify-center">
            <div className="bg-gray-300/20 flex flex-col md:flex-row backdrop-blur-sm border-2 rounded-xl max-w-[800px]">
                <div className="flex-1 flex items-center h-full">
                    <img src={loginIllustration} className="h-32 md:h-full md:mt-10" alt="" />
                    <p className="text-white text-center m-auto text-4xl md:hidden">Insight</p>
                </div>
                <div className="flex-1 bg-white rounded-md">
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default AuthWrapper;