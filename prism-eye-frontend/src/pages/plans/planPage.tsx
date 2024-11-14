import { useState } from 'react';
import PlanCard from '../../components/planCard';
import paymentCanceled from '../../assets/Payment-Declined.gif'
import { MdClose } from 'react-icons/md';
import { ClockLoader } from 'react-spinners'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserContext } from '../../context/user.context';
import { FaRupeeSign } from 'react-icons/fa';
import CheckoutButton from '../../components/checkoutButton';

const Plans = ()=>{
    const [time,setTime] = useState('monthly')
    const {user} = useUserContext() 
    const [searchParams,setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const toogleTime = ()=>{
        setTime(prev=>prev === 'monthly' ? 'yearly' : 'monthly')
    }

    const [plan,] = useState([
        { 
            planName: "Basic", 
            planPrice: 100, 
            planId:1,
            priceId: import.meta.env.VITE_BASIC_PRICE_ID,
            couponId: import.meta.env.VITE_COUPON_ID,
            planFeatures: [
                { text: "Allow 20 credits per month", access: true },
                { text: "Access to image url", access: false },
                { text: "Access Interval between the use is reduced", access: false },
                { text: "Access to work along in teams", access: false }
            ] 
        },
        { 
            planName: "Standard", 
            planPrice: 250, 
            planId:2,
            priceId: import.meta.env.VITE_FEATURED_PRICE_ID,
            couponId: import.meta.env.VITE_COUPON_ID,
            focus: true,
            planFeatures: [
                { text: "Allow 50 credits per month", access: true },
                { text: "Access to image url", access: true },
                { text: "Access Interval between the use is reduced", access: true },
                { text: "Access to work along in teams", access: false },
            ] 
        },
        { 
            planName: "Premium/Enterprise", 
            priceId: import.meta.env.VITE_PREMIUM_PRICE_ID,
            couponId:'',
            planId:3,
            planPrice: 500, 
            planFeatures: [
                { text: "Allow 200 credits per month", access: true },
                { text: "Access to image url", access: true },
                { text: "Access Interval between the use is reduced", access: true },
                { text: "Access to work along in teams", access: true },
            ] 
        }
    ]);

    function closePanel(){
        let redirect = false;
        if(searchParams.get('purchase')=='success'){
            redirect = true;
        }
        searchParams.delete('purchase')
        setSearchParams(searchParams)
        if(redirect){
            localStorage.removeItem('token')
            navigate('/')    
        }
    }

    const Loader = (
        <section className='fixed flex items-center justify-center backdrop-blur-lg bg-gray-200/30 w-screen h-screen'>
            <div className='w-[300px] relative h-[300px] bg-white rounded-md flex flex-col items-center justify-center'>
                <button className='absolute top-5 right-5 p-3 duration-300 rounded-full hover:bg-gray-300' onClick={closePanel}>
                    <MdClose/>
                </button>
                {searchParams.get('purchase')=='cancel'&&(
                    <img src={paymentCanceled} className='w-[200px]' alt="" />
                )}
                {searchParams.get('purchase')=='success'&&(
                    <img src={`https://education.uoc.ac.in/images/ezgif.com-crop.gif`} alt="" />
                )}
                {searchParams.get('purchase')=='pending'&&(
                    <ClockLoader color="#36d7b7" />
                )}
                {
                    searchParams.get('purchase')=='cancel'?
                        <p>Payment Cancelled by User</p>:
                        searchParams.get('purchase')=='success'?
                            <p>Payment Successful</p>:
                        searchParams.get('purchase')=='pending'?
                            <p>Payment Pending</p>:""
                }
            </div>
        </section>
    )

    return(
        <section className="w-full plans-section flex flex-col min-h-screen pt-[5rem]">
            {user&&user.planId&&(
                <div className=''>
                   {Number(user.planId)==1&&<p className='text-center mt-5'>User is on Basic Plan</p>}
                   {Number(user.planId)==2&&<p className='text-center mt-5'>User is on Standard Plan</p>}
                   {Number(user.planId)==3&&<p className='text-center mt-5'>User is on Premium Plan</p>}
                    <h1 className='text-4xl text-center my-10'>Want extra credentials?</h1>
                    <article className='rounded-xl m-auto bg-gradient-to-r py-3 items-center from-blue-200 to-blue-400 text-white flex flex-col w-[300px]'>
                        <article className='flex items-center gap-2'>
                            <FaRupeeSign className="text-2xl"/>
                            <h1 className='text-center leading-tight'>
                                100
                            </h1>
                        </article>
                        <p>Get 5 credits added right now.</p>
                        <CheckoutButton priceId={import.meta.env.VITE_CREDITS_5} payment={'payment'} couponId={''} focus={true} planId={''}/>
                    </article>
                </div>
            )}
            {!user.planId&& <>
                <article className="mx-auto mt-5">
                    <h1 className="text-2xl text-center pb-2 font-medium">Plan Billing</h1>
                    <article className='flex items-center gap-2'>
                        <span>Monthly</span>
                        <button onClick={toogleTime} className={`w-[62px] ${time==='monthly'?"bg-blue-200":"bg-blue-600"} rounded-2xl p-[2px] flex items-center h-[32px]`}>
                            <span className={`inline-block duration-200 relative ${time==='monthly'?"":"translate-x-[28px]"} rounded-full w-[30px] h-[30px] bg-white `}></span>
                        </button>
                        <span>Yearly</span>
                    </article>
                </article>
                <div className="m-auto flex flex-wrap justify-center gap-5 mt-5">
                    {
                        plan.map((ele,id)=>(
                            <PlanCard planId={ele.planId} priceId={ele.priceId} couponId={ele.couponId} yearly={time=='yearly'} key={id} planName={ele.planName} planPrice={ele.planPrice} planFeatures={ele.planFeatures} focus={ele.focus||false}/>
                        ))
                    }
                </div>
            </>
            }
            {searchParams.get('purchase')&&Loader}
        </section>
    )

}
export default Plans;