/* eslint-disable react-hooks/exhaustive-deps */
import FileUploaderComponent from "../../components/fileUpload"
import { useCreateNewScanMutation } from "../../api/scan"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import loader from "../../assets/loader.gif"
import { useQueryClient } from "react-query"
import toast from "react-hot-toast"

const ScanPage = () => {
    const {data:res,isPaused,isLoading,mutate,isSuccess,isError,error} = useCreateNewScanMutation()
    const [file,setFile] = useState<File>()
    const queryClient = useQueryClient()
    
    useEffect(()=>{
        if(isSuccess){
            setFile(undefined)
            queryClient.invalidateQueries("history")
            queryClient.invalidateQueries("credentials")
        }
    },[isSuccess])

    useEffect(()=>{
        if(isError){
            console.log(isError);
            toast.error(error.message)
        }
    },[isError])

    const handleFileChange = (url?: string) => {
        mutate({file,url})
    }

    const loaderPopUp = (
        <section className="fixed w-screen h-screen z-20 flex items-center bg-gray-300/30 backdrop-blur-lg justify-center">
            <div className=" bg-white shadow-md rounded-md p-5 flex flex-col gap-3 items-center justify-center w-[300px] h-[300px] md:h-[400px] md:w-[400px]">
                <img src={loader} alt="loader" className="w-[200px] h-[200px] object-cover"/>
                <h1 className="font-medium text-2xl text-center px-4">Please wait while the AI does its job</h1>
            </div>
        </section>
    )
    
    return (
        <>
            {(isLoading||isPaused)&&loaderPopUp}
            <section className="w-full flex flex-col min-h-screen">
                <div className="w-full bg-blue-400 flex items-center flex-col-reverse md:flex-row justify-center h-auto md:h-px grow pt-[5rem]">
                    <div className="p-3 flex-1">
                        <div className="max-w-[500px] min-w-[300px] shadow-md bg-white p-5 rounded-xl m-auto">
                            <h1 className="text-4xl font-medium text-center">Wanna get recognised on Browser?</h1>
                            <p className="text-center py-3">Check if your picture exists on the browser or not</p>
                            <FileUploaderComponent file={file} updateFile={(f)=>setFile(f)} handleChange={handleFileChange} />
                            {file&&(
                                <article className="w-full flex items-center justify-center">
                                    <button onClick={()=>handleFileChange()} className="py-2 bg-blue-800 rounded-md shadow-md px-4 text-white">Submit</button>
                                </article>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 flex items-center h-full overflow-y-auto flex-col pt-10">
                        <div className="max-w-[500px] shadow-md p-4 m-auto bg-white/30 backdrop-blur-sm  rounded-lg">
                            <h1 className="text-center text-2xl font-medium">Instruction</h1>
                            <ul className="list-decimal list-inside">
                                <li>
                                    Get started by uploading the image in the left side section
                                    <span className="block ps-5 text-gray-600 text-sm">Note: You can also use image via link </span>
                                </li>
                                <li>
                                    Let our model do the work and find all the browser references for the give image
                                </li>
                                <li>
                                    View the results and see if your image exists on the browser or not
                                    <span className="block ps-5 text-gray-600 text-sm">Note: To get url for the link you need to purchase premium <Link className="font-medium text-violet-800 underline" to={'/main/plans'}>here</Link> </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {res&&(
                <div className="bg-white py-10 flex flex-col">
                    <h1 className="text-blue-800 text-6xl text-center my-5">Your Results</h1>
                    <div className="flex p-5 gap-5">
                        {res.data.scan.results.map((item)=>(
                            <img className="h-64 object-contain rounded-xl" src={item.image} key={item.photoId} alt="" />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default ScanPage