import { MdSearch,MdCalendarMonth } from "react-icons/md";
import { IoMdClock } from "react-icons/io";

interface HistoryTileProps{
    icon:string;
    resultCount:number;
    date:string;
    time:string;
    onClick:()=>void;
}

const HistoryTile:React.FC<HistoryTileProps> = (props)=>{
    
    return(
        <button onClick={props.onClick} className="flex items-center w-full max-w-[400px] m-auto justify-around rounded-2xl bg-[#1875FF] text-white p-2">
            <img src={props.icon} className="w-[100px] object-contain me-4 h-[100px] rounded-2xl"/>
            <article className="flex flex-col justify-center">
                <article className='flex items-center gap-2'>
                    <MdSearch/>
                    <span>{props.resultCount} Results found </span>
                </article>
                <article className='flex items-center gap-2'>
                    <MdCalendarMonth/>
                    <span>Date: {props.date}</span>
                </article>
                <article className='flex items-center gap-2'>
                    <IoMdClock/>
                    <span>Time: {props.time}</span>
                </article>
            </article>
        </button>
    )
}

export default HistoryTile;