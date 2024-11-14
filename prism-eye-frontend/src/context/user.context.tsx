import React, { createContext, useEffect } from "react";

interface user{
    email:string,
    planId:string,
    id:string,
    creditsLeft:number,
    createdAt:string,
    exp:number,
    iat:number
}


const UserContext = createContext<user|object>({})

const UserProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [user,setUser] = React.useState({})

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            const details = JSON.parse(atob(token.split('.')[1]));
            if(details.exp*1000 < Date.now()){
                localStorage.removeItem("token")
            }else setUser(details)
        }
    },[])

    useEffect(()=>{
        console.log(user);
    },[user])

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = ():{user:user} =>React.useContext(UserContext) as {user:user}

export default UserProvider