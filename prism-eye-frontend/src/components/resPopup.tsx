import React from "react"
import { MdClose } from "react-icons/md"
import { useGetScanResultQuery } from "../api/scan"
import { useSearchParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"


const ResPopup:React.FC = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    
    const {data,isLoading} = useGetScanResultQuery(searchParams.get("scanId") as string)

    const closePopup = ()=>{
        searchParams.delete("res")
        searchParams.delete("scanId")
        setSearchParams(searchParams)
    }

    const parseDate = (date:string)=>{
        const dateObj = new Date(date)
        const day = dateObj.getDate()
        const month = dateObj.getMonth()
        const year = dateObj.getFullYear()
        return `${day}/${month}/${year}`
    }

    const parseTime = (date:string)=>{
        const dateObj = new Date(date)
        let hour = dateObj.getHours()
        let status = 'AM' 
        const minute = dateObj.getMinutes()
        if(hour>=12){
            hour-=12
            status = 'PM'
        }
        return `${hour}:${minute} ${status}`
    }

    return(
        <section className="w-screen flex items-center pt-[5rem] justify-center bg-gray-500/40 backdrop-blur-md fixed top-0 h-screen">
            <div className="max-w-[800px] w-full h-[calc(95vh-5rem)] flex flex-col bg-white rounded-xl shadow-md">
                {
                    isLoading&&(
                        <div className="w-full h-full flex items-center justify-center">
                            <BeatLoader color="#1875FF" size={20}/>
                        </div>
                    )
                }
                {!isLoading&&data&&(
                    <>
                        <div className="w-full py-5 border-b-2 border-gray-200 flex items-center justify-between px-5">
                            <article className="flex items-center">
                                Scan on &nbsp;&nbsp;
                                <img src={data.image} className="w-10 h-10" alt=""/>
                                <span>{parseDate(data.createdAt)}</span> &nbsp;&nbsp;
                                <span>{parseTime(data.createdAt)}</span>
                            </article>
                        <button className="rounded-full p-2 hover:bg-gray-200" onClick={closePopup}>
                            <MdClose/>
                        </button>
                        </div>
                        <div className="flex items-center grow h-px overflow-y-scroll scrollbar py-5 justify-center flex-wrap gap-4">
                            {
                                data&&data.results.map((item,index)=>(
                                    <div key={index} className="w-[300px] h-[300px] rounded-2xl overflow-hidden">
                                        <img src={item.image} className="w-full h-full object-cover"/>
                                    </div>
                                ))
                            }
                            {data.results.length==0&&(
                                <div className="flex flex-col items-center gap-3">
                                    <span>No Images found for the Image</span>
                                    <img src={data.image} className="w-[200px] h-[200px]" alt="" />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default ResPopup