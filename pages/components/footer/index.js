import Link from 'next/link'

export default function Home() {
    return (
        <>
            <footer className="bg-neutral footer items-center p-5">
                <div className="container justify-center grid-flow-col">
                   <p>
                        Copyright © {new Date().getFullYear()} - All right reserved - 
                        <a href="/sitemap.xml" className="" aria-label="Sitemap"> <strong> Sitemap</strong></a>
                    </p>
                </div>
            </footer>
        </>
    )
}
