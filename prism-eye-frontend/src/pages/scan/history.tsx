import { useEffect } from "react"
import { useGetHistoryQuery } from "../../api/scan"
import HistoryTile from "../../components/historyTile"
import toast from "react-hot-toast"
import ResPopup from '../../components/resPopup'
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "react-router-dom"

const HistorySection = ()=>{

    const {data,isLoading,isError} = useGetHistoryQuery()
    const [searchParams,setSearchParams] = useSearchParams()

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

    useEffect(()=>{
        console.log(data);
    },[data])

    useEffect(()=>{
        if(isError){
            console.log(isError);
            toast.error("failed to fetch history")
        }
    })

    function openResultsPanel(index:string){
        searchParams.set("res","active")
        searchParams.set("scanId",index.toString())
        setSearchParams(searchParams)
    }

    return(
        <section className="w-full flex flex-col min-h-screen pt-[5rem] ">
        <h1 className="text-center my-10 text-4xl text-blue-800">Your Scan History</h1>
        {data&&!data.length&&<article className="m-auto">No history found</article>}
        {isLoading&&<article className="m-auto"><BeatLoader color="#1875FF" size={15}/></article>}
        <div className={`w-full grid grid-cols-12 grid-flow-row-dense gap-3 p-5 md:h-px grow overflow-y-auto`}>
                {
                    data&&data.map((item,index)=>(
                        <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                            <HistoryTile key={index} onClick={()=>{openResultsPanel(item.id as string)}} date={parseDate(item.createdAt)} time={parseTime(item.createdAt)} resultCount={item.count} icon={item.image}/>
                        </div>
                    ))
                }
        </div>
        {searchParams.get("res")==="active"&&<ResPopup/>}
        </section>
    )
}

export default HistorySection