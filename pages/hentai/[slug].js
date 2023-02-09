import {useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Hentai from '../api/hentai'



export default function Slug() {
    const { query } = useRouter()

    const [Req, setReq] = useState({
        Hentai      : Hentai.doc,
        GetHentai   : [],
        Cookies     : [],
        HentaiPage  : 16,
    })

    useEffect(() => {
        setReq((doc) => ({
            ...doc,
            GetHentai: Req.Hentai.find((doc) => doc.Slug  == query.slug),
        }))

        const items = JSON.parse(localStorage.getItem('Bookmark'));

        if (items) {
            setReq((doc) => ({...doc, Cookies: items}))
        }    
    }, [query.slug]);
    
    if(Req.GetHentai?.length !== 0){
        if(Req.GetHentai?.Title.split(' ').length > 3){
            var DataSplit   = Req.GetHentai?.Title.split(' ', 3).join(" ").toString().toLowerCase()
            var DataSimilar = Req.Hentai?.filter(doc => doc.Title.toLowerCase().includes(DataSplit));
        }else{
            var DataSplit   = Req.GetHentai?.Title.split(' ', 1).join(" ").toString().toLowerCase()
            var DataSimilar = Req.Hentai && Req.Hentai?.filter(doc => doc.Title.toLowerCase().includes(DataSplit));
        }
    }


    return (
        <>
            {/* Content */}
            <div className="container mx-auto mb-16 mt-20 p-2">
                {/* Main Post */}
                <div className="flex md:flex-row flex-col gap-2 mb-5">
                    <div className="md:w-9/12 flex flex-col gap-2">
                        <iframe src={Req.GetHentai?.Image} className='aspect-video bg-base-100 bg-center rounded w-full' scrolling="no" frameBorder="0" allowFullScreen={true} />
                    
                        <div className="bg-base-100 flex flex-col gap-2 rounded p-2">
                            <h1 className='text-2xl font-black whitespace-nowrap text-ellipsis overflow-hidden'>
                                {Req.GetHentai?.Title}
                            </h1>

                            <div className="flex flex-row flex-wrap gap-1">
                                {Req.GetHentai?.Tags?.map((doc, index) => 
                                    <button key={index} className="btn btn-xs btn-ghost bg-base-300"> {doc} </button>
                                )}
                            </div>

                            <p>{Req.GetHentai?.Description}</p>
                        </div>
                    </div>

                    <div className="md:w-3/12">
                        <div className="flex flex-col gap-2">
                            <div className="bg-base-100 rounded shadow p-3 flex flex-col gap-5">
                                <div className="flex flex-row justify-between">
                                    <span className="text-sm font-bold capitalize">{Req.GetHentai?.Type} Info</span>
                                    <a href="#" className="text-sm opacity-75 flex flex-row gap-2 items-center">
                                        Back
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
                                    </a>
                                </div>

                                <div className="flex flex-row gap-2">
                                    <img src={Req.GetHentai?.Image} className="flex-none rounded md:h-16 md:w-16 h-16 w-16" width="240" height="320" lazy='loading' alt={Req.GetHentai?.Title} />
                                    
                                    <div className="flex flex-col gap-2 w-full overflow-hidden">

                                        <h1 className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">{Req.GetHentai?.Title}</h1>
                                        
                                        <div className="flex flex-row gap-2 w-full">
                                            <button className="btn btn-sm btn-primary normal-case gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path></svg>
                                            </button>
                                        
                                            <div className="w-full">
                                                <button className="btn btn-sm btn-block btn-primary normal-case gap-2"> Download </button>
                                            </div>              
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <ul className="bg-base-100 rounded shadow p-2 mb-3">
                                <div className="text-sm font-bold capitalize mb-3">{Req.GetHentai?.Type} Info</div>

                                <li className="flex justify-between text-sm font-light mb-2">
                                    <span>Brand</span>
                                    <span className="opacity-75">{Req.GetHentai?.Brand}</span>
                                </li>
                                <li className="flex justify-between text-sm font-light mb-2">
                                    <span>Uploaded</span>
                                    <span className="opacity-75">{Req.GetHentai?.Uploaded}</span>
                                </li>
                                <li className="flex justify-between text-sm font-light mb-2">
                                    <span>Released</span>
                                    <span className="opacity-75">{Req.GetHentai?.Released}</span>
                                </li>
                            </ul>
                            
                            <div className="text-sm font-bold capitalize">Recommendation</div>

                            <div className="flex flex-col gap-2 max-h-48 overflow-y-scroll">
                                {DataSimilar?.map((doc, index) => 
                                    <a href={`/${Req.GetHentai?.Type}/${Req.GetHentai?.Slug}`} className="btn btn-ghost gap-2 justify-start" aria-label={Req.GetHentai?.Title}>
                                         <img src={`${doc?.Image}`} className="rounded-full w-8 h-8" width="80" height="120" lazy='loading' alt={Req.GetHentai?.Title} />
                                        <span className="opacity-75">{Req.GetHentai?.Title}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                 
                {/* Title */}
                <div className="flex flex-row gap-2 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                    
                    <strong>Hentai Post</strong>
                </div>

                {/* Hentai Post */}
                <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-10">
                    {Req.Hentai?.slice(0, Req.HentaiPage).map((doc, index) => 
                        <a key={index} href={`/${doc.Type}/${doc.Slug}`} className="relative btn btn-ghost bg-base-100 shadow justify-start items-start text-left flex flex-nowrap gap-2 p-2">
                            <img src={`${doc?.Image}`} className="rounded w-14" width="80" height="120" lazy='loading' alt={doc?.Title} />

                            <div className="overflow-hidden w-full">
                                <h1 className="text-left text-ellipsis whitespace-nowrap overflow-hidden mb-2">{doc.Title}</h1>
                                
                                <ul className="text-xs font-light opacity-50">
                                    <li>{doc.Brand}</li>
                                    <li>{doc.Uploaded}</li>
                                </ul>
                            </div>
                        </a>
                    )}
                </div>

                {/* Load More */}
                <center>
                    {Req.Hentai?.length >= Req.HentaiPage &&
                        <button className="btn btn-sm btn-ghost gap-2" aria-label='Load More' onClick={(event) => 
                            setReq((doc) => ({...doc, HentaiPage: Req.HentaiPage + 16 }))
                        }>
                            <strong>Load More</strong>
                        </button>
                    }
                </center>
            </div>

            {/* Modal Bookmark */}
            <div className="modal" id="ModalBookmark">
                <div className="modal-box">                    
                    <div className="flex flex-col items-center py-5 gap-5">
                        <div className="bg-primary rounded-full flex items-center justify-center w-20 h-20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path></svg>
                        </div>

                        <div className="flex flex-col">
                            <strong className="text-xl text-center">Successful</strong>
                            <small>you can see bookmark list in bookmark menu</small>
                        </div>

                        <a href={`/hentai/${query.slug}`} className="btn btn-ghost btn-sm">
                            <strong>Back</strong>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
