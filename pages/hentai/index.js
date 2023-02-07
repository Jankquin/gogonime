import {useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'



export default function Home() {
    const [Req, setReq] = useState({
        Hentai      : [],
        Cookies     : [],
        Carousel    : 0,
        HentaiPage  : 18,
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

    const Filter =  Req.Hentai?.sort((a, b) => 
        Req.Filter.Sort == 'Released_ASC' ? 
        new Date(a.Released) - new Date(b.Released) :
        Req.Filter.Sort == 'Released_DESC' ?
        new Date(b.Released) - new Date(a.Released) :
        Req.Filter.Sort == 'Uploaded_ASC' ?  
        new Date(a.Uploaded) - new Date(b.Uploaded) :
        Req.Filter.Sort == 'Uploaded_DESC' &&  
        new Date(b.Uploaded) - new Date(a.Uploaded))
    .filter(({ Brand }) => Req.Filter.Brand.length == 0 ? Brand : Req.Filter.Brand.includes(Brand))
    .filter(dom => Req.Filter.Tags.every(i => dom.Tags.includes(i)))
    .slice(0, Req.HentaiPage)

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
                                    <strong>Play Now</strong>
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

                {/* Filter */}
                <div className="md:flex block items-center justify-between mb-5">
                    {Filter.length !== 0 ?
                        <div className="flex flex-row gap-3 md:mb-0 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                        
                            <div className="flex flex-col">
                                <strong>Hentai</strong>
                                <small>New Uploaded</small>
                            </div>
                        </div>
                        :    
                        <div className="animate-pulse md:mb-0 mb-5">
                            <div className="flex flex-row gap-2">
                                <div className="bg-slate-700 rounded h-12 w-12" />
                                
                                <div className="flex flex-col gap-2">
                                    <div className="bg-slate-700 rounded h-6 w-28" />
                                    <div className="bg-slate-700 rounded h-4 w-28" />
                                </div>
                            </div>
                        </div>
                    }

                    {Filter.length !== 0 ?
                        <div className="flex flex-row md:justify-end justify-between md:gap-2">
                            <a href='#ModalBrand' className='btn btn-ghost btn-sm capitalize gap-2'>
                                <small>Brand</small>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                            </a>
                            <a href='#ModalTags' className='btn btn-ghost btn-sm capitalize gap-2'>
                                <small>Tags</small>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                            </a>
                            <a href='#ModalShort' className='btn btn-ghost btn-sm capitalize gap-2'>
                                <small>Short</small>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                            </a>
                            <button className='btn btn-ghost btn-sm capitalize bg-base-100 gap-2' aria-label='Reset Button' onClick={(event) => {
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Brand: [] })}))
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Tags: [] })}))
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Released_DESC' })}))
                            }}>
                                <strong>Reset</strong>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>
                            </button>
                        </div>
                        :
                        <div className="animate-pulse">
                            <div className="flex md:justify-end justify-between md:gap-2">
                                <div className="bg-slate-700 rounded aspect-image h-7 w-[5rem]" />
                                <div className="bg-slate-700 rounded aspect-image h-7 w-[5rem]" />
                                <div className="bg-slate-700 rounded aspect-image h-7 w-[5rem]" />
                                <div className="bg-slate-700 rounded aspect-image h-7 w-[5rem]" />
                            </div>
                        </div>
                    }
                </div>

                {/* Post */}
                {Filter.length !== 0 ?
                    <div className="grid md:grid-cols-6 grid-cols-3 gap-2 mb-10">
                        {Filter?.map((doc, index) => 
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

                {Filter.length !== 0 ?
                    Filter?.length == Req.HentaiPage &&
                    <center>
                        <button className="btn btn-ghost" aria-label='Load More' onClick={(event) => 
                            setReq((doc) => ({...doc, HentaiPage: Req.HentaiPage + 18 }))
                        }>
                            <strong>Load More</strong>
                        </button>
                    </center>
                    :
                    <center>
                        <div className="animate-pulse">
                            <div className="bg-slate-700 rounded aspect-image h-12 w-[8rem]" />
                        </div>
                    </center>
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

                        <a href='/' className="btn btn-ghost btn-sm">
                            <strong>Back</strong>
                        </a>
                    </div>
                </div>
            </div>

            {/* Modal Brand */}
            <div className="modal" id="ModalBrand">
                <div className="modal-box">
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>

                            <strong>Brand</strong>
                        </div>
                        
                        <a href="#" className="btn btn-ghost btn-sm">
                            <small>Back</small>
                        </a>
                    </div>
                    
                    {Req.Hentai.map((doc, index) => {
                        const ArrayBrand = [];
                        for (var y in Req.Hentai) { 
                            ArrayBrand.push(Req.Hentai[y].Brand)
                        }
                        const DataBrand = [...new Set(ArrayBrand)].sort();
                        
                        if(index + 1 == Req.Hentai.length){
                            return(
                                <div key={index} className="flex flex-wrap gap-1">
                                    {DataBrand.map((doc, index) => 
                                        <button key={index} className={`${Req.Filter.Brand.find(dom => dom == doc) && 'bg-base-300'} btn btn-xs btn-ghost font-thin capitalize`} aria-label='Brand' onClick={(event) => (
                                            doc == Req.Filter.Brand.find(dom => dom == doc) ?
                                                setReq((dom) => ({...dom, Filter: ({...dom.Filter, Brand: dom.Filter.Brand.filter(dos => dos !== doc) }) })) :
                                                setReq((dom) => ({...dom, Filter: ({...dom.Filter, Brand: [...dom.Filter.Brand, doc]})}))
                                            )
                                        }>
                                            <small>{doc}</small>
                                        </button>
                                    )}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            
            {/* Modal Tags */}
            <div className="modal" id="ModalTags">
                <div className="modal-box">
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>

                            <strong>Tags</strong>
                        </div>
                        
                        <a href="#" className="btn btn-ghost btn-sm">
                            <small>Back</small>
                        </a>
                    </div>
                    
                    {Req.Hentai.map((doc, index) => {
                        const ArrayTags = [];
                        for (var x in Req.Hentai.map(doc => doc.Tags)) {
                            ArrayTags.push(... Req.Hentai[x].Tags)
                        }
                        const DataTags = [...new Set(ArrayTags)].sort();
                        
                        if(index + 1 == Req.Hentai.length){
                            return(
                                <div key={index} className="flex flex-wrap gap-1">
                                    {DataTags.map((doc, index) => 
                                        <button key={index} className={`${ Req.Filter.Tags.find(dom => dom == doc) && 'bg-base-300' } btn btn-xs btn-ghost font-thin capitalize`} aria-label='Tags' onClick={(event) => ( doc == Req.Filter.Tags.find(dom => dom == doc) ?
                                                setReq((dom) => ({...dom, Filter: ({...dom.Filter, Tags: dom.Filter.Tags.filter(dos => dos !== doc) }) })) :
                                                setReq((dom) => ({...dom, Filter: ({...dom.Filter, Tags: [...dom.Filter.Tags, doc]})}))
                                            )
                                        }>
                                            <small>{doc}</small>
                                        </button>
                                    )}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

            {/* Modal Short */}
            <div className="modal" id="ModalShort">
                <div className="modal-box">
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16"><path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/></svg>

                            <strong>Short</strong>
                        </div>
                        
                        <a href="#" className="btn btn-ghost btn-sm">
                            <small>Back</small>
                        </a>
                    </div>
                    
                    <div className="grid gap-1">
                        <button className={`${Req.Filter.Sort == 'Uploaded_DESC' && 'bg-base-300' } btn btn-ghost gap-3`} aria-label='Uploaded' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Uploaded_DESC'})}))
                            )}>
                            <small>Uploaded</small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Uploaded_ASC' && 'bg-base-300' } btn btn-ghost gap-3`} aria-label='Uploaded' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Uploaded_ASC'})}))
                            )}>
                            <small>Uploaded</small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Released_DESC' && 'bg-base-300'} btn btn-ghost gap-3`} aria-label='Released' onClick={(event) => (
                            setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Released_DESC'})}))
                            )}>
                            <small>Released</small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Released_ASC' && 'bg-base-300' } btn btn-ghost gap-3`} aria-label='Released' onClick={(event) => (
                            setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Released_ASC'})}))
                            )}>
                            <small>Released</small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
