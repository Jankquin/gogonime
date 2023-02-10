import {useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import Manhwa from '../../api/manhwa'


export default function Broken() {
    const { query } = useRouter()

    const [Req, setReq] = useState({
        Manhwa       : [],
        Cookies      : [],
    })

    useEffect(() => {
        setReq((doc) => ({
            ...doc,
            Manhwa: Manhwa.doc.find((doc) => doc.Slug  == query.slug),
        }))

        const items = JSON.parse(localStorage.getItem('Bookmark'));
        if (items) {
            setReq((doc) => ({...doc, Cookies: items}))
        }

    }, [query.slug]);



    return (
        <>
            {/* Detail Post */}
            <div className="container mx-auto mb-16 mt-20 p-3">
                <div className="flex md:flex-row flex-col gap-3 mb-10">
                    <div className="flex-none">
                        <div className="flex flex-col items-center gap-2">
                            <img src={Req.Manhwa?.Image} className="rounded" width="240" height="320" lazy='loading' alt={Req.Manhwa?.Title} />
                            
                            <button className="btn btn-primary btn-sm btn-block normal-case gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book-fill" viewBox="0 0 16 16"><path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/></svg>
                                <strong>Start Read</strong>
                            </button>

                            <div className="bg-base-100 flex flex-row justify-between rounded w-full p-2">
                                <div className="flex flex-row gap-1 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                </div>
                                <strong>{Req.Manhwa?.Score}</strong>
                            </div>

                            <div className="bg-base-100 flex flex-col gap-2 rounded w-full p-2">
                                <div className="flex flex-row justify-between">
                                    <small>Status</small>
                                    <small>{Req.Manhwa?.Status}</small>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <small>Artist</small>
                                    <small>{Req.Manhwa?.Artist}</small>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <small>Released</small>
                                    <small>{Req.Manhwa?.Released}</small>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <small>Updated</small>
                                    <small>{Req.Manhwa?.Chapters?.[0].Uploaded}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="bg-base-100 flex flex-col gap-2 rounded p-2">
                            <h1 className='text-2xl font-black whitespace-nowrap text-ellipsis overflow-hidden'>
                                {Req.Manhwa?.Title}
                            </h1>

                            <strong className="flex flex-row gap-1">
                                {Req.Manhwa?.Tags?.map((doc, index) => 
                                    <button key={index} className="btn btn-xs btn-ghost btn-active normal-case font-light">
                                        {doc}
                                    </button>
                                )}
                            </strong>

                            <p>{Req.Manhwa?.Description}</p>
                        </div>

                        <div className="flex flex-col gap-1 max-h-96 overflow-y-scroll">
                            {Req.Manhwa?.Chapters?.map((doc, index) => 
                                <Link key={index} href={`${query.slug}/${doc.Chapter}`} className="btn btn-ghost bg-base-100 normal-case justify-between">
                                    Chapter - {doc.Chapter}
                                    <small>{doc.Uploaded}</small>    
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}