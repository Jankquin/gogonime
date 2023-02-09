import {useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'
import Manhwa from '../../db/manhwa'
import Hentai from '../../db/hentai'
import Nsfw from '../../db/nsfw'
import Cosplay from '../../db/cosplay'


export default function Home() {
    const [Req, setReq] = useState({
        Data         : Manhwa.doc.concat(Hentai.doc, Nsfw.doc, Cosplay.doc),
        Cookies      : [],
        ModalMenu    : false,
        SearchInput  : (''),
        ResultSearch : (''),
    })

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('Bookmark'));
            if (items) {
            setReq((doc) => ({...doc, Cookies: items}))
        }
    }, []);
    

      
    return (
        <>
            {/* Navbar */}
            <div className="bg-base-300 fixed w-full top-0 py-2 px-3 z-20">
                <div className="container relative">
                    <div className="absolute top-0 left-0 z-10">
                        <div className="flex flex-row gap-2">
                            <Link href={`/`} className="btn btn-md bg-transparent hover:bg-transparent" aria-label="www.eronime.com">
                                <Image src='/logo.svg' width={20} height={20} alt="www.eronime.com"/>
                            </Link>
                        
                            <Link href={`/`} className="btn btn-md bg-transparent hover:bg-transparent font-black text-lg md:flex hidden" aria-label="www.eronime.com">
                                <strong className="tracking-wider">ERO</strong>
                                <strong className='tracking-wider text-primary'>NIME</strong>
                            </Link>
                        </div>
                    </div>

                    <div className="md:w-5/12 relative rounded mx-auto">
                        <input id='SearchForm' className='bg-base-100 h-10 input focus:outline-none w-full md:pl-5 md:pr-16 pl-16 pr-28' type="text" placeholder="Search" value={Req.SearchInput} onChange={(event) => {
                            setReq((doc) => ({...doc, SearchInput: event.target.value})),
                            setReq((doc) => ({...doc, ResultSearch: Req.Data.filter(doc => doc.Title.toLowerCase().includes(event.target.value.toLowerCase()))}))
                        }}/>
                        
                        <button className={`${!Req.SearchInput && 'hidden'} absolute top-2 md:right-2 right-14 btn bg-transparent hover:bg-transparent btn-sm btn-circle`} aria-label='Close' onClick={(event) => {
                            setReq((doc) => ({...doc, SearchInput: ''})),
                            setReq((doc) => ({...doc, ResultSearch: ''}))
                        }}>          
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                        </button>

                        <div className={`${!Req.SearchInput && 'hidden'} absolute shadow top-0 left-0 w-full -z-10`}>
                            <div className="bg-base-100 rounded p-3 pt-12 flex flex-col gap-1">
                                {Req.SearchInput && Req.ResultSearch.slice(0, 8).map((doc, index) => 
                                    <a key={index} href={`/${doc.Type}/${doc.Slug}`} className="btn btn-ghost btn-sm gap-2 justify-start font-light" aria-label={doc.Title}>
                                        {doc.Type == "hentai" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image self-center" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>   
                                        : doc.Type == "manhwa" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                                        : doc.Type == "nsfw" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle-fill self-center" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/></svg> 
                                        : doc.Type == "cosplay" &&
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-images self-center" viewBox="0 0 16 16"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/></svg>
                                        }
                                        <span className="opacity-75">{doc.Title}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 z-10">
                        <div className="flex gap-2">
                            <Link href="/bookmark" className="btn btn-md bg-transparent hover:bg-transparent md:flex hidden" aria-label="Bookmark">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                            </Link>

                            <a href="#ModalMenu" className="btn btn-md bg-transparent hover:bg-transparent" aria-label="Menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>



            {/* Modal Menu*/}
            <div className="modal" id="ModalMenu">
                <div className="modal-box p-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold">Menu</div>
                        <a href="#" className="btn btn-sm btn-circle bg-transparent hover:bg-transparent" aria-label='Close'>          
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                        </a>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">    
                            <a href="./manhwa" className="bg-base-200 btn btn-ghost btn-sm gap-2 justify-start font-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>   
                                <span className="opacity-75">Manhwa</span>
                            </a>          
                            <a href="./hentai" className="bg-base-200 btn btn-ghost btn-sm gap-2 justify-start font-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                                <span className="opacity-75">Hentai</span>
                            </a>          
                            <a href="./nsfw" className="bg-base-200 btn btn-ghost btn-sm gap-2 justify-start font-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/></svg> 
                                <span className="opacity-75">NSFW</span>
                            </a>          
                            <a href="./cosplay" className="bg-base-200 btn btn-ghost btn-sm gap-2 justify-start font-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/></svg>
                                <span className="opacity-75">Cosplay</span>
                            </a>          
                        </div>

                        <a href="./" className="btn btn-ghost btn-sm gap-2 justify-start font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/></svg>
                            <span className="opacity-75">Home</span>
                        </a>          
                        <a href="./bookmark" className="btn btn-ghost btn-sm gap-2 justify-start font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path></svg>
                            <span className="opacity-75">Bookmark</span>
                        </a>          
                        <a href="./broken" className="btn btn-ghost btn-sm gap-2 justify-start font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/></svg>
                            <span className="opacity-75">Broken Link</span>
                        </a>          
                    </div>
                </div>
            </div>
        </>
    )
}
