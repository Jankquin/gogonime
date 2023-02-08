import {useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Manhwa from '../../../api/manhwa'


export default function Broken() {
    const { query } = useRouter()

    const [Req, setReq] = useState({
        Manhwa      : [],
    })

    useEffect(() => {
        setReq((doc) => ({
            ...doc,
            Manhwa: Manhwa.doc.find((doc) => doc.Slug  == query.slug),
        }))
        
    }, [query.slug]);


    // console.log(Req.Manhwa?.Chapters?.find((doc) => doc.Chapter == 1))

    return (
        <>
            <div className="container md:w-8/12 mx-auto mb-16 mt-48 p-3">
                <div className="grid mb-10">
                    {Req.Manhwa?.Chapters?.find((doc) => doc.Chapter === query.read).Images.map((doc, index) => 
                        <img key={index} src={`${doc}`} className="w-full" width="240" height="320" lazy='loading' />
                    )}
                </div>
            </div>
        </>
    )
}
