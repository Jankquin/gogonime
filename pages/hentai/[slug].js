import {useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'



export default function Slug() {
    const { query } = useRouter()

    const [Req, setReq] = useState({
        Hentai      : [],
        Cookies     : [],
        GetHentai   : [],
        HentaiPage  : 18,
    })

    useEffect(() => {
        fetch("/api/hentai")
        .then((doc) => doc.json())
        .then((doc) => setReq((dom) => ({
                ...dom, 
                Hentai: doc,
                GetHentai: doc.find((doc) => doc.Slug  == query.slug)
            }))
        )

        const items = JSON.parse(localStorage.getItem('Bookmark'));
        if (items) {
            setReq((doc) => ({...doc, Cookies: items}))
        }

    }, [query.slug]);
    
    if(Req.GetHentai?.length !== 0){
        if(Req.GetHentai?.Title.split(' ').length > 3){
            var DataSplit   = Req.GetHentai?.Title.split(' ', 3).join(" ").toString().toLowerCase()
            var DataSimilar = Req.Hentai.filter(doc => doc.Title.toLowerCase().includes(DataSplit));
        }else{
            var DataSplit   = Req.GetHentai?.Title.split(' ', 1).join(" ").toString().toLowerCase()
            var DataSimilar = Req.Hentai.filter(doc => doc.Title.toLowerCase().includes(DataSplit));
        }
    }

    const Preload = [];
    const PreloadPost = () => {
        for (var i = 0; i < Req.HentaiPage; i++) {
            Preload.push(
                <div key={i+1} className="animate-pulse w-full space-y-2">
                    <div className="bg-slate-700 rounded aspect-image w-full" />
                    <div className="bg-slate-700 rounded aspect-image h-4 w-full" />
                </div>    
            );
        }
    };
    PreloadPost()


    return (
        <>
            {/* Header */}
            <div className="bg-base-300 relative flex min-h-48 mt-16 mb-10">
                <div className="container mx-auto p-3 z-10">
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="lg:w-8/12">
                            <div className="rounded overflow-hidden">
                                <iframe src={Req.GetHentai?.Embed} className='aspect-video bg-base-100 bg-center rounded w-full' scrolling="no" frameBorder="0" allowFullScreen={true} />
                            </div>
                        </div>

                        <div className="lg:w-4/12">
                            <div className="flex flex-col gap-3">
                                <div className="flex lg:flex-row gap-3">
                                    {Req.GetHentai?.Image ?
                                        <div className="flex-none rounded overflow-hidden w-20 h-20">
                                            <img src={Req.GetHentai?.Image ? `https://res.cloudinary.com/dvdute5j8/image/upload/c_scale,h_240,q_50/Eronime/Hentai/${Req.GetHentai?.Image}` : '/Logo.svg'} className="rounded" width="240" height="320" lazy='loading' alt={Req.GetHentai?.Title} />
                                        </div>
                                        :
                                        <div className="animate-pulse">
                                            <div className="bg-slate-700 rounded aspect-image w-20 h-20" />
                                        </div>  
                                    }

                                    <div className="flex flex-col gap-3 justify-start overflow-hidden">
                                        {Req.GetHentai?.Title ?
                                            <strong className='text-ellipsis whitespace-nowrap overflow-hidden'>{Req.GetHentai?.Title}</strong>
                                            :
                                            <div className="animate-pulse">
                                                <div className="bg-slate-700 rounded h-5" />
                                            </div>  
                                        }

                                        <div className="flex flex-row gap-3">
                                            {Req.GetHentai?.length !== 0 ?
                                                Req.Cookies?.find((doc) => doc.Slug == Req.GetHentai?.Slug) ?
                                                    <a href='#ModalBookmark' className='btn btn-ghost bg-base-100' aria-label='UnBookmark' onClick={(event) => {
                                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos.Slug != Req.GetHentai.Slug});
                                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                                    </a> 
                                                    :
                                                    <a href='#ModalBookmark' className="btn btn-primary" aria-label='Bookmark' onClick={(event) => {
                                                        const Bookmark = JSON.parse(localStorage.getItem("Bookmark")) ?? [];
                                                        Bookmark.push({
                                                            Type       : Req.GetHentai.Type,
                                                            Title      : Req.GetHentai.Title,
                                                            Slug       : Req.GetHentai.Slug,
                                                            Image      : Req.GetHentai.Image,
                                                            Embed      : Req.GetHentai.Embed,
                                                            Brand      : Req.GetHentai.Brand,
                                                            Tags       : Req.GetHentai.Tags,
                                                            Released   : Req.GetHentai.Released,
                                                            Uploaded   : Req.GetHentai.Uploaded,
                                                        });
                                                        localStorage.setItem("Bookmark", JSON.stringify(Bookmark));
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                                    </a>
                                                :
                                                <div className="animate-pulse">
                                                    <div className="bg-slate-700 rounded col-span-2 h-12 w-12" />
                                                </div>  
                                            }

                                            {Req.GetHentai?.length !== 0 ?
                                                <a href={Req.GetHentai?.Shortlink && `${Req.GetHentai.Shortlink}`} className="btn btn-primary gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/></svg>
                                                    <strong>Download</strong>
                                                </a>
                                                :
                                                <div className="animate-pulse">
                                                    <div className="bg-slate-700 rounded col-span-2 h-12 w-32" />
                                                </div>  
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 bg-base-100 flex w-full rounded">
                                    <div className="stat p-3">
                                        <strong>Brand</strong>
                                        <small>{Req.GetHentai?.Brand}</small>
                                    </div>
                                    <div className="stat p-3">
                                        <strong>Source</strong>
                                        <small>{Req.GetHentai?.Released}</small>
                                    </div>
                                    <div className="stat p-3">
                                        <strong>Uploaded</strong>
                                        <small>{Req.GetHentai?.Uploaded}</small>
                                    </div>
                                    <div className="stat p-3">
                                        <strong>Released</strong>
                                        <small>{Req.GetHentai?.Released}</small>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {Req.GetHentai?.Tags?.map((doc, index) => 
                                        <button key={index} className="btn btn-xs normal-case bg-base-100 font-light">{doc}</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto mb-16 p-3">
                {/* Similar */}
                <div className="md:flex block items-center justify-between mb-5">
                    <div className="flex gap-3 md:mb-0 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                        </svg>
                       
                        <div className="flex flex-col">
                            <strong>Similar</strong>
                            <small>Similar Post</small>
                        </div>
                    </div>
                </div>

                {/* Similar Post */}
                {DataSimilar?.length !== 0 ?
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-2 mb-10">
                        {DataSimilar?.slice(0, Req.HentaiPage).map((doc, index) => 
                            <Link href={`/hentai/${doc.Slug}`} key={index} className="btn btn-ghost normal-case h-auto p-0" aria-label={doc.Title}>
                                <img src={doc?.Image ? `https://res.cloudinary.com/dvdute5j8/image/upload/c_scale,h_240,q_50/Eronime/Hentai/${doc?.Image}` : '/Logo.svg'} className="rounded" width="240" height="320" lazy='loading' alt={doc?.Title} />

                                <div className='text-ellipsis whitespace-nowrap overflow-hidden text-center w-full p-3'>{doc.Title}</div>
                            </Link>
                        )}
                    </div>
                    :
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-2 mb-10">
                        {Preload}
                    </div>
                }
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
