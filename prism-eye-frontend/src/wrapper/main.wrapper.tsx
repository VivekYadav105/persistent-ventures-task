import React  from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/header";

const MainWrapper:React.FC = ()=>{
    if(!localStorage.getItem('token')){
        console.log("inside here");        
        return <Navigate to={'/auth/login'} replace/>
    }

    

    return(
        <section className="">
            <Header/>
            <Outlet/>
        </section>
    )
}

export default MainWrapper;