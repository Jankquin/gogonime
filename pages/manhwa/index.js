import {useState } from "react";
import Manhwa from '../api/manhwa'

export default function Home() {
    const [Req, setReq] = useState({
        Manhwa       : Manhwa.doc,
        ManhwaPage   : 16,
        Filter       : {
            Type     : "manhwa",
            Brand    : [],
            Status   : [],
            Tags     : [],
            Sort     : 'Uploaded_Up',
        }
    })

    const FilterManhwa =  Req.Manhwa?.sort((a, b) => {
        if(Req.Filter.Sort === 'Asc'){
            if (a.Title < b.Title)
                return -1;
            if (a.Title > b.Title)
                return 1;
            return 0;
        }else if(Req.Filter.Sort === 'Desc'){
            if (a.Title < b.Title)
                return 1;
            if (a.Title > b.Title)
                return -1;
            return 0;
        }else if(Req.Filter.Sort === 'Uploaded_Up'){
            return (b.Chapters[0].Uploaded.replaceAll('-', '') - a.Chapters[0].Uploaded.replaceAll('-', ''))
        }else if(Req.Filter.Sort === 'Uploaded_Down'){
            return (a.Chapters[0].Uploaded.replaceAll('-', '') - b.Chapters[0].Uploaded.replaceAll('-', ''))
        }else if(Req.Filter.Sort === 'Score_Up'){
            return (b.Score - a.Score)
        }else if(Req.Filter.Sort === 'Score_Down'){
            return (a.Score - b.Score)
        }else if(Req.Filter.Sort === 'Released_Up'){
            return (Date.parse(b.Released) - Date.parse(a.Released))
        }else if(Req.Filter.Sort === 'Released_Down'){
            return (Date.parse(a.Released) - Date.parse(b.Released))
        }
    })
    .filter(dos => Req.Filter.Status.every(i => dos.Status.includes(i)))
    .filter(dom => Req.Filter.Tags.every(i => dom.Tags.includes(i)))
    .slice(0, Req.ManhwaPage)



    return (
        <>
            {/* Content */}
            <div className="container mb-16 mt-14 p-3">
                {/* Filter */}
                <div className="flex flex-row justify-center gap-2 my-5">
                    <a href='#ModalType' className='btn btn-ghost btn-sm text-xs gap-2'>
                        Type
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                    </a>
                    <a href='#ModalStatus' className='btn btn-ghost btn-sm text-xs gap-2'>
                        Status
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                    </a>
                    <a href='#ModalTags' className='btn btn-ghost btn-sm text-xs gap-2'>
                        Tags
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                    </a>
                    <a href='#ModalShort' className='btn btn-ghost btn-sm text-xs gap-2'>
                        Short
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                    </a>
                    <button className='btn btn-ghost btn-sm text-xs gap-2' onClick={(event) => {
                        setReq((doc) => ({...doc, Filter: ({
                            ...doc.Filter, 
                            Brand    : [],
                            Status   : [],
                            Tags     : [],
                            Sort     : 'Uploaded_Up',
                        })}))
                    }}>
                        Reset
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>
                    </button>
                </div>

                {/* Title */}
                <div className="flex flex-row gap-2 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                    <strong>New Uploaded</strong>
                </div>

                {/* List Post */}
                <div className="grid md:grid-cols-4 grid-cols-1 gap-2 mb-10">
                    {FilterManhwa?.map((doc, index) => 
                            <a key={index} href={`/${doc.Type}/${doc.Slug}`} className="relative btn btn-ghost bg-base-100 shadow h-auto normal-case justify-start items-start text-left flex flex-nowrap gap-2 p-2">
                                <img src={doc?.Image} className="rounded w-14" alt={doc.Title} width="80" height="120" lazy='loading' />

                                <div className="overflow-hidden w-full">
                                    <h1 className="text-left text-ellipsis whitespace-nowrap overflow-hidden mb-2">{doc.Title}</h1>

                                    <ul className="text-xs font-light opacity-50">
                                        <li>{doc.Artist}</li>
                                        <li>{doc.Released}</li>
                                    </ul>

                                    <strong className="text-2xl opacity-25 absolute right-2 bottom-2">{doc.Score}</strong>
                                </div>
                            </a>
                        )
                    }
                </div>

                {/* Load More */}
                <center>
                    {FilterManhwa?.length == Req.ManhwaPage &&
                        <button className="btn btn-sm btn-ghost gap-2" aria-label='Load More' onClick={(event) => 
                            setReq((doc) => ({...doc, ManhwaPage: Req.ManhwaPage + 16 }))
                        }>
                            <strong>Load More</strong>
                        </button>
                    }
                </center>
            </div>



            {/* Modal Type */}
            <div className="modal" id="ModalType">
                <div className="modal-box p-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold">Type</div>
                        <a href="#" className="btn btn-sm btn-circle bg-transparent hover:bg-transparent" aria-label='Close'>          
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">    
                        <a href="./manhwa" className="btn btn-ghost btn-active btn-xs gap-2 justify-start font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>   
                            <span className="opacity-75">Manhwa</span>
                        </a>          
                        <a href="./hentai" className="btn btn-ghost btn-xs gap-2 justify-start font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                            <span className="opacity-75">Hentai</span>
                        </a>          
                        <a href="./nsfw" className="btn btn-ghost btn-xs gap-2 justify-start font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/></svg> 
                            <span className="opacity-75">NSFW</span>
                        </a>          
                        <a href="./cosplay" className="btn btn-ghost btn-xs gap-2 justify-start font-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/></svg>
                            <span className="opacity-75">Cosplay</span>
                        </a>          
                    </div>
                </div>
            </div>

            {/* Modal Status */}
            <div className="modal" id="ModalStatus">
                <div className="modal-box p-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold">Status</div>
                        <a href="#" className="btn btn-sm btn-circle bg-transparent hover:bg-transparent" aria-label='Close'>          
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-4 gap-1">
                        <button className={`${Req.Filter.Status.length == 0 && 'btn-active' } btn btn-xs btn-ghost normal-case font-light`} aria-label='All' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Status: []})}))
                            )}>
                            <span>All</span>
                        </button>
                        <button className={`${Req.Filter.Status == 'Completed' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light`} aria-label='Completed' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Status: ['Completed']})}))
                            )}>
                            <span>Completed</span>
                        </button>
                        <button className={`${Req.Filter.Status == 'Ongoing' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light`} aria-label='Ongoing' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Status: ['Ongoing']})}))
                            )}>
                            <span>Ongoing</span>
                        </button>
                        <button className={`${Req.Filter.Status == 'Hiatus' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light`} aria-label='Hiatus' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Status: ['Hiatus']})}))
                            )}>
                            <span>Hiatus</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Tags */}
            <div className="modal" id="ModalTags">
                <div className="modal-box p-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold">Tags</div>
                        <a href="#" className="btn btn-sm btn-circle bg-transparent hover:bg-transparent" aria-label='Close'>          
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                        </a>
                    </div>

                    {Req.Filter.Type == "manhwa" && Req.Manhwa.map((doc, index) => {
                        const ArrayTags = [];
                        for (var x in Req.Manhwa.map(doc => doc.Tags)) {
                            ArrayTags.push(... Req.Manhwa[x].Tags)
                        }
                        const DataTags = [...new Set(ArrayTags)].sort();

                        if(index + 1 == Req.Manhwa.length){
                            return(
                                <div key={index} className="grid grid-cols-4 gap-1">
                                    {DataTags.map((doc, index) => 
                                        <button key={index} className={`${ Req.Filter.Tags.find(dom => dom == doc) && 'btn-active' } btn btn-xs btn-ghost normal-case font-light`} aria-label='Tags' onClick={(event) => ( doc == Req.Filter.Tags.find(dom => dom == doc) ?
                                                setReq((dom) => ({...dom, Filter: ({...dom.Filter, Tags: dom.Filter.Tags.filter(dos => dos !== doc) }) })) :
                                                setReq((dom) => ({...dom, Filter: ({...dom.Filter, Tags: [...dom.Filter.Tags, doc]})}))
                                            )
                                        }>
                                            <span>{doc}</span>
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
                <div className="modal-box p-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold">Modal</div>
                        <a href="#" className="btn btn-sm btn-circle bg-transparent hover:bg-transparent" aria-label='Close'>          
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-4 gap-1">
                        <button className={`${Req.Filter.Sort == 'Asc' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light gap-1`} aria-label='Uploaded' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Asc'})}))
                            )}>
                            <span>A - Z</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Desc' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light gap-1`} aria-label='Uploaded' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Desc'})}))
                            )}>
                            <span>Z - A</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Uploaded_Up' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light gap-1`} aria-label='Uploaded' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Uploaded_Up'})}))
                            )}>
                            <span>Uploaded</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Uploaded_Down' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light gap-1`} aria-label='Uploaded' onClick={(event) => (
                                setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Uploaded_Down'})}))
                            )}>
                            <span>Uploaded</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Released_Up' && 'btn-active' } btn btn-xs btn-ghost normal-case font-light gap-1`} aria-label='Released' onClick={(event) => (
                            setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Released_Up'})}))
                            )}>
                            <span>Released</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg>
                        </button>
                        <button className={`${Req.Filter.Sort == 'Released_Down' && 'btn-active'} btn btn-xs btn-ghost normal-case font-light gap-1`} aria-label='Released' onClick={(event) => (
                            setReq((doc) => ({...doc, Filter: ({...doc.Filter, Sort: 'Released_Down'})}))
                            )}>
                            <span>Released</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}