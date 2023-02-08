import {useState, useEffect } from "react";
import Link from 'next/link'
import Manhwa, { doc } from './api/manhwa'
import Hentai from './api/hentai'
import Nsfw from './api/nsfw'
import Cosplay from './api/cosplay'

export default function Home() {
    const [Req, setReq] = useState({
        Manhwa       : Manhwa.doc,
        Hentai       : Hentai.doc,
        Nsfw         : Nsfw.doc,
        Cosplay      : Cosplay.doc,
        Cookies      : [],
        Carousel     : 0,
        ManhwaPage   : 16,
        HentaiPage   : 16,
        Filter       : {
            Type     : "manhwa",
            Brand    : [],
            Status   : [],
            Tags     : [],
            Sort     : 'Uploaded_Up',
        }
    })

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('Bookmark'));
        
        if (items) {
            setReq((doc) => ({...doc, Cookies: items}))
        }

        setTimeout(() =>
            setReq((doc) => 
                ({...doc, Carousel: Req.Carousel !== 4 ? Req.Carousel + 1 : 0 })
            ), 3000
        );
    }, [Req.Carousel]);

    const FilterManhwa  = [] 
    
    Req.Manhwa.sort(doc => {
        FilterManhwa.push({
            Type     : doc.Type,
            Title    : doc.Title,
            Slug     : doc.Slug,
            Tags     : doc.Tags.map(doc => doc),
            Uploaded : doc.Chapters[0].Uploaded,
        })
    })
    
    const CarouselList  = FilterManhwa.concat(Req.Hentai, Req.Nsfw, Req.Cosplay).sort((a, b) => { 
        return(
            b.Uploaded.replaceAll('-', '') - a.Uploaded.replaceAll('-', '')
        )
    }).slice('0', '5')






    return (
        <>
            {/* Header */}
            <div className="bg-base-300 relative flex h-48 mt-14">
                <div className="container mx-auto self-center px-3 z-10">
                    <div className="md:w-1/2 w-full flex flex-col gap-2">
                        <h1 className='text-2xl font-black whitespace-nowrap text-ellipsis overflow-hidden'>
                            <a href={`/manhwa/${CarouselList[Req.Carousel]?.Slug}`} aria-label={CarouselList[Req.Carousel]?.Title}> {CarouselList[Req.Carousel]?.Title} </a>
                        </h1>
                        
                        <div className="flex gap-2">
                            {CarouselList[Req.Carousel]?.Tags.slice(0, 5).map((doc, index) => 
                                <span key={index} className='font-thin md:text-md text-xs'>{doc}</span>    
                            )}
                        </div>

                        <div className="flex gap-2">
                            {/* Type */}
                            <a href={`/${CarouselList[Req.Carousel]?.Type}/${CarouselList[Req.Carousel]?.Slug}`} className="btn btn-primary md:btn-md btn-sm shadow capitalize" aria-label={CarouselList[Req.Carousel]?.Title}>
                                {CarouselList[Req.Carousel]?.Type}
                            </a>

                            {/* Bookmark */}
                            {Req.Filter.Type == "manhwa" && (Req.Cookies.find(doc => doc == Req.Manhwa[Req.Carousel].Slug) ?
                                <a href='#ModalBookmark' className='btn btn-warning md:btn-md btn-sm shadow' aria-label='UnBookmark' onClick={(event) => {
                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos != Req.Manhwa[Req.Carousel]?.Slug});
                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                </a> 
                                :
                                <a href='#ModalBookmark' className='btn btn-primary md:btn-md btn-sm shadow' aria-label='UnBookmark' onClick={(event) => {
                                    const Bookmark = JSON.parse(localStorage.getItem("Bookmark")) ?? [];
                                    Bookmark.push(Req.Manhwa[Req.Carousel].Slug);
                                    localStorage.setItem("Bookmark", JSON.stringify(Bookmark));
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                </a> 
                            )}
                           
                            {Req.Filter.Type == "hentai" && (Req.Cookies.find(doc => doc == Req.Hentai[Req.Carousel].Slug) ?
                                <a href='#ModalBookmark' className='btn btn-warning md:btn-md btn-sm shadow' aria-label='UnBookmark' onClick={(event) => {
                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos != Req.Hentai[Req.Carousel]?.Slug});
                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                </a> 
                                :
                                <a href='#ModalBookmark' className='btn btn-primary md:btn-md btn-sm shadow' aria-label='Bookmark' onClick={(event) => {
                                    const Bookmark = JSON.parse(localStorage.getItem("Bookmark")) ?? [];
                                    Bookmark.push(Req.Hentai[Req.Carousel].Slug);
                                    localStorage.setItem("Bookmark", JSON.stringify(Bookmark));
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                </a> 
                            )}
                            
                            {/* Score */}
                            {Req.Filter.Type == "manhwa" &&
                                <a href={`/manhwa/${Req.Manhwa[Req.Carousel]?.Slug}`} className="btn btn-primary md:btn-md btn-sm shadow" aria-label={Req.Manhwa[Req.Carousel]?.Title}>
                                    <strong>{Req.Manhwa[Req.Carousel]?.Score}</strong>
                                </a>
                            }
                        </div>
                    </div>
                </div>

                {CarouselList[Req.Carousel]?.Image && 
                    <div className="absolute w-6/12 h-full top-0 right-0">
                        <div style={{backgroundImage: `url(${CarouselList[Req.Carousel]?.Image})`, backgroundPosition: 'center 20%'}} className="bg-cover bg-center absolute w-full h-full right-0"  />
                        <div className="absolute bg-gradient-to-r from-base-300 via-base-300/80 to-base-300/40 w-full h-full right-0" />
                    </div>
                }

                {/* {Req.Filter.Type == "manhwa" && Req.Manhwa[Req.Carousel]?.Image && 
                    <div className="absolute w-6/12 h-full top-0 right-0">
                        <div style={{backgroundImage: `url(${Req.Manhwa[Req.Carousel]?.Image})`, backgroundPosition: 'center 20%'}} className="bg-cover bg-center absolute w-full h-full right-0"  />
                        <div className="absolute bg-gradient-to-r from-base-300 via-base-300/80 to-base-300/40 w-full h-full right-0" />
                    </div>
                }

                {Req.Filter.Type == "hentai" && Req.Hentai[Req.Carousel]?.Image && 
                    <div className="absolute w-6/12 h-full top-0 right-0">
                        <div style={{backgroundImage: `url(${Req.Hentai[Req.Carousel]?.Image})`, backgroundPosition: 'center 20%'}} className="bg-cover bg-center absolute w-full h-full right-0"  />
                        <div className="absolute bg-gradient-to-r from-base-300 via-base-300/80 to-base-300/40 w-full h-full right-0" />
                    </div>
                }

                {Req.Filter.Type == "nsfw" && Req.Nsfw[Req.Carousel]?.Image && 
                    <div className="absolute w-6/12 h-full top-0 right-0">
                        <div style={{backgroundImage: `url(${Req.Nsfw[Req.Carousel]?.Image})`, backgroundPosition: 'center 20%'}} className="bg-cover bg-center absolute w-full h-full right-0"  />
                        <div className="absolute bg-gradient-to-r from-base-300 via-base-300/80 to-base-300/40 w-full h-full right-0" />
                    </div>
                }

                {Req.Filter.Type == "cosplay" && Req.Cosplay[Req.Carousel]?.Image && 
                    <div className="absolute w-6/12 h-full top-0 right-0">
                        <div style={{backgroundImage: `url(${Req.Cosplay[Req.Carousel]?.Image})`, backgroundPosition: 'center 20%'}} className="bg-cover bg-center absolute w-full h-full right-0"  />
                        <div className="absolute bg-gradient-to-r from-base-300 via-base-300/80 to-base-300/40 w-full h-full right-0" />
                    </div>
                } */}
                
                <div className="absolute w-full bottom-5">
                    <div className="container flex gap-2 justify-end px-3">
                        {Req.Manhwa?.slice(0, 5).map((doc, index) => {
                            return(
                                <div key={index} className={`${doc.Title == Req.Manhwa[Req.Carousel]?.Title && 'bg-white'} border border-white rounded-full h-2 w-2`} />
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto mb-16 p-3">        
                {/* Manhwa */}
                <div className="flex flex-col gap-2 mb-5">
                    {/* Title */}
                    <div className="flex flex-row justify-between">
                        <Link href={`/manhwa`} className="flex flex-row gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg> 
                            <strong>Manhwa Post</strong>
                        </Link>

                        <Link href={`/manhwa`} className="btn btn-ghost btn-sm" aria-label={doc.Title}>More Post</Link>
                    </div>

                    {/* New Aploaded */}
                    <div className="grid md:grid-cols-8 grid-cols-4 gap-1 md:gap-2">
                        {Req.Manhwa?.slice('0', '4').map((doc, index) => 
                            <Link key={index} href={`/manhwa/${doc.Slug}`} className="btn btn-ghost normal-case h-auto p-0" aria-label={doc.Title}>
                                <img src={doc?.Image} className="rounded" width="240" height="320" lazy='loading' alt={doc?.Title} />

                                <div className='text-ellipsis text-xs whitespace-nowrap overflow-hidden text-center w-full p-3'>{doc.Title}</div>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Hentai */}
                <div className="flex flex-col gap-2 mb-5">
                    {/* Title */}
                    <div className="flex flex-row justify-between">
                        <Link href={`/hentai`} className="flex flex-row gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg> 
                            <strong>Hentai Post</strong>
                        </Link>

                        <Link href={`/hentai`} className="btn btn-ghost btn-sm" aria-label={doc.Title}>More Post</Link>
                    </div>

                    {/* New Aploaded */}
                    <div className="grid md:grid-cols-8 grid-cols-4 gap-1 md:gap-2">
                        {Req.Hentai?.slice('0', '8').map((doc, index) => 
                            <Link key={index} href={`/hentai/${doc.Slug}`} className="btn btn-ghost normal-case h-auto p-0" aria-label={doc.Title}>
                                <img src={`${doc?.Image}`} className="rounded" width="240" height="320" lazy='loading' alt={doc?.Title} />
                        
                                <div className='text-ellipsis text-xs whitespace-nowrap overflow-hidden text-center w-full p-3'>{doc.Title}</div>
                            </Link>
                        )}
                    </div>
                </div>
                
                {/* Hentai */}
                <div className="flex flex-col gap-2 mb-5">
                    {/* Title */}
                    <div className="flex flex-row justify-between">
                        <Link href={`/nsfw`} className="flex flex-row gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg> 
                            <strong>Nsfw Post</strong>
                        </Link>

                        <Link href={`/nsfw`} className="btn btn-ghost btn-sm" aria-label={doc.Title}>More Post</Link>
                    </div>

                    {/* New Aploaded */}
                    <div className="grid md:grid-cols-8 grid-cols-4 gap-1 md:gap-2">
                        {Req.Nsfw?.slice('0', '8').map((doc, index) => 
                            <Link key={index} href={`/nsfw/${doc.Slug}`} className="btn btn-ghost normal-case h-auto p-0" aria-label={doc.Title}>
                                <img src={`${doc?.Image}`} className="rounded" width="240" height="320" lazy='loading' alt={doc?.Title} />
                        
                                <div className='text-ellipsis text-xs whitespace-nowrap overflow-hidden text-center w-full p-3'>{doc.Title}</div>
                            </Link>
                        )}
                    </div>
                </div>
                
                {/* Hentai */}
                <div className="flex flex-col gap-2 mb-5">
                    {/* Title */}
                    <div className="flex flex-row justify-between">
                        <Link href={`/cosplay`} className="flex flex-row gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg> 
                            <strong>Cosplay Post</strong>
                        </Link>

                        <Link href={`/cosplay`} className="btn btn-ghost btn-sm" aria-label={doc.Title}>More Post</Link>
                    </div>

                    {/* New Aploaded */}
                    <div className="grid md:grid-cols-8 grid-cols-4 gap-1 md:gap-2">
                        {Req.Cosplay?.slice('0', '8').map((doc, index) => 
                            <Link key={index} href={`/cosplay/${doc.Slug}`} className="btn btn-ghost normal-case h-auto p-0" aria-label={doc.Title}>
                                <img src={`${doc?.Image}`} className="rounded" width="240" height="320" lazy='loading' alt={doc?.Title} />
                        
                                <div className='text-ellipsis text-xs whitespace-nowrap overflow-hidden text-center w-full p-3'>{doc.Title}</div>
                            </Link>
                        )}
                    </div>
                </div>
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

                        <a href='/' className="btn btn-ghost btn-sm">
                            <strong>Back</strong>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
