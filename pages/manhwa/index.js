import {useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'



export default function Broken() {
    const [Req, setReq] = useState({
        Manhwa      : [],
    })

    useEffect(() => {
        fetch("/api/manhwa")
            .then((doc) => doc.json())
            .then((doc) => setReq((dom) => ({...dom, Manhwa: doc})))
    }, []);


    return (
        <>
            {/* Header */}
            <div className="bg-neutral relative flex h-48 mt-16 mb-10">
                <div className="container mx-auto self-center px-3 z-10">
                    {Req.Manhwa.length !== 0 ?
                        <div className="md:w-1/2 w-full flex flex-row gap-3 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/></svg> 

                            <div className="flex flex-col">
                                <strong className='text-2xl'>Broken Link</strong>
                                <small>Will be fix soon</small>
                            </div>
                        </div>
                        :
                        <div className="md:w-1/2 flex flex-row items-center">
                            <strong className="text-2xl">Not Found</strong>
                        </div>
                    }
                </div>

                <div className="absolute w-6/12 h-full top-0 right-0">
                    <div style={{backgroundImage: `url(https://res.cloudinary.com/dvdute5j8/image/upload/c_scale,h_480,q_50/Eronime/Hentai/seika-jogakuin-kounin-sao-ojisan-4.webp)`, backgroundPosition: 'center 20%'}} className="bg-cover bg-center absolute w-full h-full right-0"  />
                    <div className="absolute bg-gradient-to-r from-neutral via-neutral/80 to-neutral/40 w-full h-full right-0" />
                </div>
            </div>

            <div className="container mx-auto mb-16 p-3">
                manhwa page
            </div>
        </>
    )
}
