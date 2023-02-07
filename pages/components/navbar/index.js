import {useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'



export default function Home() {
    const [Req, setReq] = useState({
        Hentai          : [],
        Cookies         : [],
        ModalMenu       : false,
        SearchInput     : (''),
        ResultSearch    : (''),
    })

    useEffect(() => {
        fetch("/api/hentai")
            .then((doc) => doc.json())
            .then((doc) => setReq((dom) => ({...dom, Hentai: doc})))

            const items = JSON.parse(localStorage.getItem('Bookmark'));
                if (items) {
                setReq((doc) => ({...doc, Cookies: items}))
            }
    }, []);
    

      
    return (
        <>
            {/* Navbar */}
            <div className="bg-neutral fixed w-full top-0 py-2 px-3 z-20">
                <div className="container relative">
                    <div className="absolute top-0 left-0 z-10">
                        <div className="flex flex-row gap-3">
                            {Req.Hentai.length !== 0 ? 
                                <Link href={`/`} className="btn btn-ghost bg-base-100" aria-label="www.eronime.com">
                                    <Image src='/logo.svg' width={20} height={20} alt="www.eronime.com"/>
                                </Link>
                                :
                                <div className="animate-pulse">
                                    <div className="flex flex-row">
                                        <div className="bg-slate-700 rounded h-12 w-12" />
                                    </div>
                                </div>
                            }
                            
                            {Req.Hentai.length !== 0 ? 
                                <Link href={`/`} className="btn btn-ghost text-lg md:flex hidden" aria-label="www.eronime.com">
                                    <strong>ERO</strong>
                                    <strong className='text-primary'>NIME</strong>
                                </Link>
                                :
                                <div className="animate-pulse md:flex hidden">
                                    <div className="flex flex-row">
                                        <div className="bg-slate-700 rounded h-12 w-28" />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {Req.Hentai.length !== 0 ? 
                        <div className="md:w-5/12 relative rounded-sm mx-auto">
                            <input id='SearchForm' className='input focus:outline-none w-full md:pl-5 md:pr-16 pl-16 pr-28' type="text" placeholder="Search" value={Req.SearchInput} onChange={(event) => {
                                setReq((doc) => ({...doc, SearchInput: event.target.value})),
                                setReq((doc) => ({...doc, ResultSearch: Req.Hentai.filter(doc => doc.Title.toLowerCase().includes(event.target.value.toLowerCase()))}))
                            }}/>

                            <button className={`${!Req.SearchInput && 'hidden'} absolute top-0 md:right-0 right-14 btn btn-ghost`} aria-label='Close' onClick={(event) => {
                                setReq((doc) => ({...doc, SearchInput: ''})),
                                setReq((doc) => ({...doc, ResultSearch: ''}))
                            }}>          
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                            </button>

                            <div className={`${!Req.SearchInput && 'hidden'} absolute top-0 left-0 w-full -z-10`}>
                                <div className="bg-base-100 rounded-sm p-3 pt-6 flex flex-col gap-1">
                                    <div className="divider" /> 
                                    {Req.SearchInput && Req.ResultSearch.slice(0, 8).map((doc, index) => 
                                        <a key={index} href={`/hentai/${doc.Slug}`} className='btn btn-ghost flex flex-nowrap gap-3 justify-start overflow-hidden' aria-label={`${doc.Title}`}>
                                            <div className="avatar">
                                                <div className="w-8 rounded">
                                                    <Image  src={`https://res.cloudinary.com/dvdute5j8/image/upload/c_scale,h_80,q_50/Eronime/Hentai/${doc.Image}`} alt={doc.Title} width={240} height={320} />
                                                </div>
                                            </div>
                                            <small className='text-ellipsis whitespace-nowrap overflow-hidden'>{doc.Title}</small>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="md:w-5/12 relative rounded-sm mx-auto">
                            <div className="animate-pulse">
                                <div className="flex flex-row">
                                    <div className="bg-slate-700 rounded h-12 w-full" />
                                </div>
                            </div>
                        </div>
                    }

                    <div className="absolute top-0 right-0 z-10">
                        <div className="flex gap-3">
                            {Req.Hentai.length !== 0 ? 
                                <Link href="/broken" className="btn btn-ghost gap-2 md:flex hidden" aria-label="Broken">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill lg:hidden md:flex" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/></svg>
                                    <strong className='lg:flex hidden'>Broken</strong>
                                </Link>
                                :
                                <div className="animate-pulse md:flex hidden">
                                    <div className="flex flex-row">
                                        <div className="bg-slate-700 rounded h-12 w-12 lg:w-28" />
                                    </div>
                                </div>
                            }
                            {Req.Hentai.length !== 0 ? 
                                <Link href="/bookmark" className="btn btn-ghost gap-2 md:flex hidden" aria-label="Bookmark">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill lg:hidden md:flex" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                    <strong className='lg:flex hidden'>Bookmark</strong>
                                </Link>
                                :
                                <div className="animate-pulse md:flex hidden">
                                    <div className="flex flex-row">
                                        <div className="bg-slate-700 rounded h-12 w-12 lg:w-28" />
                                    </div>
                                </div>
                            }
                            {Req.Hentai.length !== 0 ? 
                                <a href="#ModalMenu" className="btn btn-ghost" aria-label="Menu">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>
                                </a>
                                :
                                <div className="animate-pulse">
                                    <div className="flex flex-row">
                                        <div className="bg-slate-700 rounded h-12 w-12" />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            <div className="modal" id="ModalMenu">
                <div className="modal-box ">
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/></svg>
                            <strong>Menu</strong>
                        </div>
                        
                        <a href="#" className="btn btn-ghost btn-sm">
                            <small>Back</small>
                        </a>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <a href="/bookmark" className="btn btn-ghost btn-block flex flex-col items-start normal-case py-3 space-y-1" aria-label="Bookmark">
                            <strong>Bookmark</strong>
                            <small>Your Bookmark List</small>
                        </a>
                        <a href="/broken" className="btn btn-ghost btn-block flex flex-col items-start normal-case py-3 space-y-1" aria-label="Broken">
                            <strong>Broken</strong>
                            <small>Will be fix soon</small>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
