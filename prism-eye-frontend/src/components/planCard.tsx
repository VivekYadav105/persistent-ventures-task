import React from "react";
import { FaRupeeSign } from "react-icons/fa"
import { MdClose, MdDone } from "react-icons/md"
import CheckoutButton from '../components/checkoutButton';


interface plancardProps{
    planName:string;
    planPrice:number;
    planFeatures:{text:string,access:boolean}[];
    focus?:boolean
    priceId:string
    couponId:string
    planId:number
    yearly:boolean
}

const PlanCard:React.FC<plancardProps> = (props)=>{
    return(
        <div className={`border-2 w-[300px] min-h-[400px] mx-2 flex flex-col items-center rounded-md ${props.focus?"bg-gradient-to-r from-blue-200 to-blue-400 text-white":"bg-white"} pb-5 shadow-lg`} id="plan-1">
            <p className='text-start mt-3 text-xl self-start ps-4'>{props.planName}</p>
            <article className='my-3 text-4xl flex items-center justify-center gap-2'>
                <FaRupeeSign className="text-2xl"/>
                <h1 className='text-center leading-tight'>
                    {props.yearly?props.planPrice*12-(props.planPrice*12*0.2):props.planPrice}
                    {props.yearly&&<span className="text-xs">/ per Year</span>}
                    {!props.yearly&&<span className="text-xs">/ per month</span>}
                </h1>
            </article>
            <article className="px-4 w-full flex items-center justify-center">
                <CheckoutButton planId={String(props.planId)} focus={props.focus} priceId={props.priceId} couponId={props.couponId}/>
            </article>
            <article className='mt-5'>
                <article className="w-full flex items-center justify-center">
                    <span className='m-auto border-2 bg-slate-300/40 text-xs font-medium rounded-xl p-1 px-1.5'>What you get</span>
                </article>
                {
                    props.planFeatures.map((ele,id)=>(
                        <p key={id} className='flex items-center gap-4 my-2 px-5 text-justify'>
                            {ele.access?(<MdDone fontSize={20} color='green'/>):(
                                <MdClose fontSize={20} color='red'/>
                            )}
                            {ele.text}
                        </p>
                    ))
                }
            </article>
        </div>
    )
}

export default PlanCard;