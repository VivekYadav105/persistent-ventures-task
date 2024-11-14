import React, { useEffect, useState }  from "react";
import { useDropzone } from "react-dropzone";

interface componentProps{
    handleChange: (url?:string) => void;
    updateFile: (file?: File) => void;
    file?: File;
}

const FileUploaderComponent:React.FC<componentProps> = ({handleChange,updateFile,file}) => {

    const [mode,setMode] = useState(0)

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            updateFile(acceptedFiles[0]);
        } else {
            updateFile(undefined);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const urlInput = form.elements.namedItem('url') as HTMLInputElement;
        const url = urlInput.value;
        handleChange(url);
        urlInput.value = ''; // Clear the input field
    }

    useEffect(()=>{
        console.log(file);
    },[file])


    const accept = {
        'image/*': ['.png','.jpg','.jpeg'],
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    return(
        <>
            <div className={`dropzone-div border-2 border-black text-primary w-100 ${mode==0?"border-dashed":" border-none"}`} {...getRootProps()}>
                {mode==0&&(
                    <>
                    <input className="dropzone-input" {...getInputProps()} />
                <div className="text-center w-full h-40 flex items-center justify-center">
                    {isDragActive ? (
                    <p className="dropzone-content">Release to drop the selected files here to upload</p>
                    ) : (<div className="flex flex-col items-center gap-5">
                    <p className="dropzone-content">
                        Drag 'n' drop Image, or click to select files
                    </p>
                    <article>
                        {file&&<img className="w-10" src={URL.createObjectURL(file)}/>}
                    </article>
                    </div>
                )}
                </div>
                </>
                )}
                {mode==1&&(
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                        <label htmlFor="">Image Url</label>
                        <input name="url" type="text" className="border-2 rounded-md p-2 border-blue-600" required />
                        <button className="py-2 my-2 rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-300 hover:text-blue-600 border-2 border-blue-600 duration-300">Submit</button>
                    </form>
                )}
            </div>
            <p className="text-center">or <button onClick={()=>{
                setMode(mode==0?1:0)
            }} className="bg-transparent text-sm text-purple-500 underline hover:text-violet-800 duration-300">Click here</button> {mode==0?"to Enter url":"Upload file"}</p>
        </>
    )
}

export default FileUploaderComponent;
