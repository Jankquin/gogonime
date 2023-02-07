import {useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'



export default function Home() {
    const [Req, setReq] = useState({
        Hentai      : [],
        Manhwa      : [],
        Cookies     : [],
        Carousel    : 0,
        HentaiPage  : 12,
        Filter      : {
            Brand   : [],
            Tags    : [],
            Sort    : 'Uploaded_DESC',
        }
    })

    useEffect(() => {
        fetch("/api/hentai")
            .then((doc) => doc.json())
            .then((doc) => setReq((dom) => ({...dom, Hentai: doc})))
        
        fetch("/api/manhwa")
            .then((doc) => doc.json())
            .then((doc) => setReq((dom) => ({...dom, Manhwa: doc})))

        const items = JSON.parse(localStorage.getItem('Bookmark'));
        if (items) {
            setReq((doc) => ({...doc, Cookies: items}))
        }

        setTimeout(() =>
            setReq((doc) => 
                ({...doc, Carousel: Req.Carousel !== 4 ? Req.Carousel + 1 : 0 })
            ), 10000
        );
    }, [Req.Carousel]);

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
            <div className="bg-neutral relative flex h-48 mt-16 mb-10">
                <div className="container mx-auto self-center px-3 z-10">
                    <div className="md:w-1/2 w-full flex flex-col gap-3">
                        {Req.Hentai[Req.Carousel]?.Title ?
                            <strong className='text-2xl whitespace-nowrap text-ellipsis overflow-hidden'>{Req.Hentai[Req.Carousel]?.Title}</strong>
                            :
                            <div className="animate-pulse w-full">
                                <div className="bg-slate-700 rounded h-8" />
                            </div>
                        }

                        {Req.Hentai[Req.Carousel]?.Tags ?
                            <div className="flex gap-2">
                                {Req.Hentai[Req.Carousel]?.Tags.slice(0, 5).map((doc, index) => 
                                    <small key={index} className='font-thin capitalize'>{doc}</small>    
                                )}
                            </div>
                            :
                            <div className="animate-pulse w-full">
                                <div className="grid grid-cols-6 gap-4">
                                    <div className="bg-slate-700 rounded h-4" />
                                    <div className="bg-slate-700 rounded h-4" />
                                    <div className="bg-slate-700 rounded h-4" />
                                    <div className="bg-slate-700 rounded h-4" />
                                    <div className="bg-slate-700 rounded h-4" />
                                    <div className="bg-slate-700 rounded h-4" />
                                </div>
                            </div>
                        }
                        
                        {Req.Hentai[Req.Carousel]?.Title ?
                            <div className="flex gap-3">
                                <a href={`/hentai/${Req.Hentai[Req.Carousel]?.Slug}`} className="btn btn-primary" aria-label={Req.Hentai[Req.Carousel]?.Title}>
                                    <strong>{Req.Hentai[Req.Carousel]?.Type}</strong>
                                </a>
                                <a href='#ModalBookmark' className='btn btn-primary' aria-label='UnBookmark' onClick={(event) => {
                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos.Slug != Req.Hentai[Req.Carousel]?.Slug});
                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                                </a> 
                            </div>
                            :
                            <div className="animate-pulse">
                                <div className="flex flex-row gap-3">
                                    <div className="bg-slate-700 rounded h-12 w-28" />
                                    <div className="bg-slate-700 rounded h-12 w-12" />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                
                {Req.Hentai[Req.Carousel]?.Image && 
                    <div className="absolute w-6/12 h-full top-0 right-0">
                        <div style={{backgroundImage: `url(https://res.cloudinary.com/dvdute5j8/image/upload/c_scale,h_480,q_50/Eronime/Hentai/${Req.Hentai[Req.Carousel]?.Image})`, backgroundPosition: 'center 20%'}} className="bg-cover bg-center absolute w-full h-full right-0"  />
                        <div className="absolute bg-gradient-to-r from-neutral via-neutral/80 to-neutral/40 w-full h-full right-0" />
                    </div>
                }
                
                <div className="absolute w-full bottom-5">
                    <div className="container flex gap-2 justify-end px-3">
                        {Req.Hentai?.slice(0, 5).map((doc, index) => {
                            return(
                                <div key={index} className={`${doc.Title == Req.Hentai[Req.Carousel]?.Title && 'bg-white'} border border-white rounded-full h-2 w-2`} />
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto mb-16 p-3">
                {/* Banner */}
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2 mb-10 hidden">
                    <a href='/hentai' className="btn relative normal-case h-auto lg:h-28 md:h-24 h-20 overflow-hidden">
                        <div className="flex flex-col gap-3 z-10">
                            <strong>Hentai</strong>
                            <small className='md:block hidden'>Stream or download Hentai Videos</small>
                        </div>
                        <div style={{backgroundImage: `url("/Hentai.webp")`, backgroundPosition: 'center 20%'}} className="bg-cover absolute w-full h-full right-0" />
                        <div className="absolute bg-gradient-to-r from-base-200 via-base-200/75 to-base-200/30 w-full h-full right-0" />
                    </a>
                    <a href='/nsfw' className="btn relative normal-case h-auto lg:h-28 md:h-24 h-20 overflow-hidden">
                        <div className="flex flex-col gap-3 z-10">
                            <strong>NSFW</strong>
                            <small className='md:block hidden'>Short 3D Animation</small>
                        </div>
                        <div style={{backgroundImage: `url("/Nsfw.webp")`, backgroundPosition: 'center 20%'}} className="bg-cover absolute w-full h-full right-0" />
                        <div className="absolute bg-gradient-to-r from-base-200 via-base-200/75 to-base-200/30 w-full h-full right-0" />
                    </a>
                    <a href='/image' className="btn relative normal-case h-auto lg:h-28 md:h-24 h-20 overflow-hidden">
                        <div className="flex flex-col gap-3 z-10">
                            <strong>Image</strong>
                            <small className='md:block hidden'>Cosplay nude</small>
                        </div>
                        <div style={{backgroundImage: `url("/Image.webp")`, backgroundPosition: 'center 20%'}} className="bg-cover absolute w-full h-full right-0" />
                        <div className="absolute bg-gradient-to-r from-base-200 via-base-200/75 to-base-200/30 w-full h-full right-0" />
                    </a>
                    <a href='/doujin' className="btn relative normal-case h-auto lg:h-28 md:h-24 h-20 overflow-hidden">
                        <div className="flex flex-col gap-3 z-10">
                            <strong>Doujin</strong>
                            <small className='md:block hidden'>(comming soon)</small>
                        </div>
                        <div style={{backgroundImage: `url("/Doujin.webp")`, backgroundPosition: 'center 20%'}} className="bg-cover absolute w-full h-full right-0" />
                        <div className="absolute bg-gradient-to-r from-base-200 via-base-200/75 to-base-200/30 w-full h-full right-0" />
                    </a>
                </div>

                {/* Hentai */}
                {Req.Hentai.length !== 0 ?
                    <div className="md:flex block items-center justify-between mb-5">
                        <div className="flex flex-row gap-3 md:mb-0 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                        
                            <div className="flex flex-col">
                                <strong>Hentai</strong>
                                <small>New Uploaded</small>
                            </div>
                        </div>

                        <Link href={'/hentai'} className="btn btn-ghost btn-sm">More</Link>
                    </div>   
                    :    
                    <div className="animate-pulse md:flex block items-center justify-between mb-5">
                        <div className="flex flex-row gap-2 mb-5">
                            <div className="bg-slate-700 rounded h-12 w-12" />
                            
                            <div className="flex flex-col gap-2">
                                <div className="bg-slate-700 rounded h-6 w-28" />
                                <div className="bg-slate-700 rounded h-4 w-28" />
                            </div>
                        </div>

                        <div className="bg-slate-700 rounded h-6 w-28" />
                    </div>
                }

                {/* Hentai */}
                {Req.Hentai.length !== 0 ?
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-2 mb-10">
                        {Req.Hentai?.slice(0, 12).map((doc, index) => 
                            <Link key={index} href={`/hentai/${doc.Slug}`} className="btn btn-ghost normal-case h-auto p-0" aria-label={doc.Title}>
                                <img src={`https://res.cloudinary.com/dvdute5j8/image/upload/c_scale,h_240,q_50/Eronime/Hentai/${doc?.Image}`} className="rounded" width="240" height="320" lazy='loading' alt={doc?.Title} />

                                <div className='text-ellipsis whitespace-nowrap overflow-hidden text-center w-full p-3'>{doc.Title}</div>
                            </Link>
                        )}
                    </div>
                    :
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-2 mb-10">
                        {Preload}
                    </div>
                }
                
                {/* Manhwa */}
                {Req.Manhwa.length !== 0 ?
                    <div className="md:flex block items-center justify-between mb-5">
                        <div className="flex flex-row gap-3 md:mb-0 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                        
                            <div className="flex flex-col">
                                <strong>Manhwa</strong>
                                <small>New Uploaded</small>
                            </div>
                        </div>

                        <Link href={'/manhwa'} className="btn btn-ghost btn-sm">More</Link>
                    </div>   
                    :    
                    <div className="animate-pulse md:flex block items-center justify-between mb-5">
                        <div className="flex flex-row gap-2 mb-5">
                            <div className="bg-slate-700 rounded h-12 w-12" />
                            
                            <div className="flex flex-col gap-2">
                                <div className="bg-slate-700 rounded h-6 w-28" />
                                <div className="bg-slate-700 rounded h-4 w-28" />
                            </div>
                        </div>

                        <div className="bg-slate-700 rounded h-6 w-28" />
                    </div>
                }

                {Req.Manhwa.length !== 0 ?
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-2 mb-10">
                        {Req.Manhwa.map((doc, index) => 
                            <Link key={index} href={`/manhwa/${doc.Slug}`} className="btn btn-ghost normal-case h-auto p-0" aria-label={doc.Title}>
                                <img src={`${doc?.Image}`} className="rounded" width="240" height="320" lazy='loading' alt={doc?.Title} />

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
        </>
    )
}
