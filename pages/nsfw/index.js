import {useState, useEffect } from "react";
import Link from 'next/link'



export default function Broken() {


    return (
        <>
            {/* Content */}
            <div className="container mb-16 mt-14 p-3">
                {/* Title */}
                <div className="flex flex-row gap-2 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill self-center" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/></svg> 
                    <strong>New Uploaded</strong>
                </div>
            </div>
        </>
    )
}
