import profileIcon from '../assets/profileIcon.svg'
import dropDownIcon from '../assets/dropdown.png'
import logoutIcon from '../assets/logout.svg'
import { useEffect, useState } from 'react'
import { MdHome, MdShoppingBag } from 'react-icons/md'
import { FaUserClock } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/user.context'
import { useGetCredentialsQuery } from '../api/auth'

const Header = ()=>{
    const [expanded,setExpanded] = useState(false)
    const {user} = useUserContext()
    const {data} = useGetCredentialsQuery()

    useEffect(()=>{
        console.log(user);
    },[user])

    const logout = ()=>{
        localStorage.removeItem('token')
        window.location.reload()
    }

    return(
        <header className='w-screen z-10 fixed top-0 flex bg-white shadow-md border-b-2'>
            <div className='flex  max-w-[900px] items-center justify-between m-auto w-full p-5'>
                <article className="flex items-center gap-3">
                    <img width={40} src="https://cdn-icons-png.flaticon.com/512/3137/3137672.png" alt="" />
                    <span className='font-bold text-2xl font-[#ECF3FF]'>Insight</span>
                </article>
                <div className="relative flex items-center gap-4">
                    <Link to={'/main'} className='flex hover:text-blue-400 duration-300 items-center gap-2'>
                        <MdHome size={20}/>
                        <span className='font-medium'>Home</span>
                    </Link>
                    <Link to={'/main/history'} className='flex hover:text-blue-400 duration-300 items-center gap-2'>
                        <FaUserClock size={20}/>
                        <span className='font-medium'>History</span>
                    </Link>
                    <Link to={'/main/plans'} className='flex hover:text-blue-400 duration-300 items-center gap-2'>
                        <MdShoppingBag size={20}/>
                        <span className='font-medium'>Plans</span>
                    </Link>
                    <div className='relative'>
                        <button onClick={()=>setExpanded(!expanded)} className='flex items-center gap-2'>
                            {/* <img className='p-1.5 rounded-full bg-white' src={profileIcon} alt=""/> */}
                            <span className='p-2 hover:bg-secondary rounded-full aspect-square inline-block bg-white text-[#1875FF] font-medium'>JD</span>   
                            <img className='w-3' src={dropDownIcon} alt=""/>
                        </button>
                        <article className={`${expanded?"":"h-0"} bg-white overflow-hidden rounded-xl flex flex-col shadow-md absolute top-10 right-0`}>
                            <article className='flex p-3 px-4 border-b-2 flex-col'>
                                <span className='text-md font-medium'>{user&&user.email}</span>
                                <span className='text-xs font-semibold text-gray-400'>
                                    Credits left: 
                                    <span className='font-medium text-[#1875FF]'>
                                    {data&&data.credits}
                                    </span>
                                </span>
                            </article>
                            <button className='font-medium flex items-center w-full justify-center gap-4 text-sm p-3 px-4 hover:text-[#1875FF] hover:bg-[#ECF3FF]'>
                                <img src={profileIcon} alt="" />
                                <span>View Profile</span>
                            </button>
                            <button onClick={logout} className='font-medium flex items-center w-full justify-center gap-4 text-sm p-3 px-4 hover:text-[#1875FF] hover:bg-[#ECF3FF]'>
                                <img src={logoutIcon} alt="" />
                                <span>Logout</span>
                            </button>
                        </article>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;