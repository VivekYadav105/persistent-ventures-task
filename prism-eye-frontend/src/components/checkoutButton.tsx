import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import axiosInstance from '../api/axiosinstance';
import { useSearchParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CheckoutButtonProps {
    priceId: string;
    focus?: boolean;
    couponId: string;
    payment?: string;
    planId: string;
}

const CheckoutButton:React.FC<CheckoutButtonProps> = ({ priceId,focus,payment, couponId,planId }) => {
    const [searchParams,setSearchParams] = useSearchParams();
    const handleCheckout = async () => {
        searchParams.set('purchase','pending')
        setSearchParams(searchParams)
        const axios = axiosInstance()
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`,{ priceId, couponId,planId,payment });
        const stripe = await stripePromise;
        console.log(response);
        await stripe?.redirectToCheckout({ sessionId: response.data.id });
    };

    return <button className={`border-2 w-[95%] py-1.5 rounded-2xl ${focus?"bg-blue-200 text-blue-800":"bg-gradient-to-r from-blue-600 to-blue-500 text-white"}`} onClick={handleCheckout}>Buy Now</button> 
};

export default CheckoutButton;
