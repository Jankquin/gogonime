import {useState, useEffect } from "react";
import Hentai from '../api/hentai'
import Manhwa from '../api/manhwa'
import Nsfw from '../api/nsfw'
import Cosplay from '../api/cosplay'



export default function Broken() {
    const [Req, setReq] = useState({
        Hentai      : Hentai.doc,
        Manhwa      : Manhwa.doc,
        Nsfw        : Nsfw.doc,
        Cosplay     : Cosplay.doc,
        Cookies     : [],
        HentaiPage  : 18,
    })

    useEffect(() => {        
        const items = JSON.parse(localStorage.getItem('Bookmark'));
        if (items) {
            setReq((doc) => ({...doc, Cookies: items}))
        }
    }, []);
    


    return (
        <>
           <div className="container mx-auto mb-16 mt-20 p-2">
           {Req.Cookies.length !== 0 ?
                <div className="flex md:flex-row flex-col gap-2 mb-5">
                    <div className="md:w-3/12">
                        <div className="flex flex-col gap-2">
                            <div className="bg-base-100 rounded shadow p-3 flex flex-col gap-5">
                                <div className="flex flex-row justify-between">
                                    <span className="text-sm font-bold capitalize">Last Bookmark</span>

                                    <a href="#" className="text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
                                    </a>
                                </div>
                          
                                <div className="flex flex-col gap-3 w-full overflow-hidden text-center">
                                    <img src={Req.Manhwa.concat(Req.Hentai, Req.Nsfw, Req.Cosplay).find(doc => doc.Slug == Req.Cookies.slice(-1))?.Image} className="flex-none rounded-full w-20 h-20 m-auto" width="240" height="320" lazy='loading' alt={Req.Manhwa.concat(Req.Hentai, Req.Nsfw, Req.Cosplay).find(doc => doc.Slug == Req.Cookies.slice(-1))?.Title} />
                                    
                                    <h1 className="text-sm font-bold">
                                        {Req.Manhwa.concat(Req.Hentai, Req.Nsfw, Req.Cosplay).find(doc => doc.Slug == Req.Cookies.slice(-1))?.Title}
                                    </h1>
                                    
                                    <div className="flex flex-row gap-2 w-full">
                                        <a href='/bookmark' className='btn btn-sm btn-primary normal-case' aria-label='UnBookmark' onClick={(event) => {
                                                const RemoveBookmark = Req.Cookies.filter((dos) => {return dos != Req.Manhwa.concat(Req.Hentai, Req.Nsfw, Req.Cosplay).find(doc => doc.Slug == Req.Cookies.slice(-1))?.Slug});
                                                localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                                        </a>
                                        
                                        <div className="w-full">
                                            <a href={`${Req.Manhwa.concat(Req.Hentai, Req.Nsfw, Req.Cosplay).find(doc => doc.Slug == Req.Cookies.slice(-1))?.Type}/${Req.Manhwa.concat(Req.Hentai, Req.Nsfw, Req.Cosplay).find(doc => doc.Slug == Req.Cookies.slice(-1))?.Slug}`} className="btn btn-sm btn-block btn-primary"> More Information </a>
                                        </div>              
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-9/12 flex flex-col gap-2">  
                        {/* Manhwa Bookmark*/}
                        <div className="bg-base-100 flex flex-col gap-2 rounded p-3">
                            <div className="flex flex-row gap-2 text-sm font-bold capitalize"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                                Manhwa
                            </div>
                       
                            <table className="table w-full">
                                <tbody>
                                    {Req.Manhwa.filter((item) => {
                                        for (var key in Req.Cookies) {
                                            if (item.Slug == Req.Cookies[key])
                                            return true;
                                        }
                                    }).map((doc, index) =>
                                        <tr key={index}>
                                            <td className="flex flex-row justify-between p-2 items-center">
                                                <a href={`${doc.Type}/${doc.Slug}`} className="text-sm">{doc.Title}</a>
                                                
                                                <a href='/bookmark' className='btn btn-ghost btn-xs hover:bg-transparent shadow' aria-label='UnBookmark' onClick={(event) => {
                                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos != doc.Slug});
                                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                                                </a>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Hentai Bookmark*/}
                        <div className="bg-base-100 flex flex-col gap-2 rounded p-3">
                            <div className="flex flex-row gap-2 text-sm font-bold capitalize"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                                Hentai
                            </div>
                       
                            <table className="table w-full">
                                <tbody>
                                    {Req.Hentai.filter((item) => {
                                        for (var key in Req.Cookies) {
                                            if (item.Slug == Req.Cookies[key])
                                            return true;
                                        }
                                    }).map((doc, index) => 
                                        <tr key={index}>
                                            <td className="flex flex-row justify-between p-2 items-center">
                                                <a href={`${doc.Type}/${doc.Slug}`} className="text-sm">{doc.Title}</a>
                                                
                                                <a href='/bookmark' className='btn btn-ghost btn-xs hover:bg-transparent shadow' aria-label='UnBookmark' onClick={(event) => {
                                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos != doc.Slug});
                                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                                                </a>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Nsfw Bookmark*/}
                        <div className="bg-base-100 flex flex-col gap-2 rounded p-3">
                            <div className="flex flex-row gap-2 text-sm font-bold capitalize"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                                Nsfw
                            </div>
                       
                            <table className="table w-full">
                                <tbody>
                                    {Req.Nsfw.filter((item) => {
                                        for (var key in Req.Cookies) {
                                            if (item.Slug == Req.Cookies[key])
                                            return true;
                                        }
                                    }).map((doc, index) => 
                                        <tr key={index}>
                                            <td className="flex flex-row justify-between p-2 items-center">
                                                <a href={`${doc.Type}/${doc.Slug}`} className="text-sm">{doc.Title}</a>
                                                
                                                <a href='/bookmark' className='btn btn-ghost btn-xs hover:bg-transparent shadow' aria-label='UnBookmark' onClick={(event) => {
                                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos != doc.Slug});
                                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                                                </a>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Cosplay Bookmark*/}
                        <div className="bg-base-100 flex flex-col gap-2 rounded p-3">
                            <div className="flex flex-row gap-2 text-sm font-bold capitalize"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film self-center" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>
                                Cosplay
                            </div>
                       
                            <table className="table w-full">
                                <tbody>
                                    {Req.Cosplay.filter((item) => {
                                        for (var key in Req.Cookies) {
                                            if (item.Slug == Req.Cookies[key])
                                            return true;
                                        }
                                    }).map((doc, index) => 
                                        <tr key={index}>
                                            <td className="flex flex-row justify-between p-2 items-center">
                                                <a href={`${doc.Type}/${doc.Slug}`} className="text-sm">{doc.Title}</a>
                                                
                                                <a href='/bookmark' className='btn btn-ghost btn-xs hover:bg-transparent shadow' aria-label='UnBookmark' onClick={(event) => {
                                                        const RemoveBookmark = Req.Cookies.filter((dos) => {return dos != doc.Slug});
                                                        localStorage.setItem('Bookmark', JSON.stringify(RemoveBookmark))
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                                                </a>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            :
                <div className="bg-base-100 md:w-5/12 rounded mx-auto text-center mt-20 py-10">
                    <h1 className="font-bold text-xl">Bookmark 0</h1>
                </div>
            }
           </div>
        </>
    )
}
