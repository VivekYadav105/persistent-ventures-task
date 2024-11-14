import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

const axiosInstance =(config?:AxiosRequestConfig,isAuth=true)=> {
    let authHeader = '';
    if(isAuth){
        authHeader = `Bearer ${localStorage.getItem('token')}`
    }

    const instance = axios.create({
        baseURL:import.meta.env.VITE_API_URL,
        headers:{
            Authorization:authHeader
        },
        ...config
    })

    instance.interceptors.request.use(config => {
        if(!config.headers.Authorization){
          const token = localStorage.getItem('token');
          if (isAuth) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        }
        return config;
    }, error => Promise.reject(error));


    instance.interceptors.response.use(
        (response)=>response,
        (error: AxiosError) => {
            if (error.response) {
                if (error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                    error.message = (error.response.data as { message: string }).message;
                }
                if(error.response.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
                    error.message = (error.response.data as { error: string }).error;
                }
                if (error.response.status === 401 || error.response.status === 403) {
                    toast.error(error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
                        ? (error.response.data as { message: string }).message
                        : 'Authentication error');
                    localStorage.removeItem('token');
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        window.location.href = '/auth/login';
                    }, 800); 
                }
                if(error.response.status === 500){
                    toast.error("Some Issue with the backend");
                }
            }else{
                console.log("inside");
                toast.error("Trouble connecting to Backend");
            }
            return Promise.reject(error);
        })

    return instance;
}

export default  axiosInstance;


