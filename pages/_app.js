import Head from 'next/head'
import Layout from './components'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {

    // useEffect(() => {
    //     document.addEventListener('contextmenu', (e) => e.preventDefault());

    //     function ctrlShiftKey(e, keyCode) {
    //         return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    //     }

    //     document.onkeydown = (e) => {
    //     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    //     if (
    //         event.keyCode === 123 ||
    //         ctrlShiftKey(e, 'I') ||
    //         ctrlShiftKey(e, 'J') ||
    //         ctrlShiftKey(e, 'C') ||
    //         (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    //     )
    //         return false;
    //     };
    // }, []);

    return (
        <Layout>
            <Head>
                <title>Watch Free Hentai, Manga, Doujin, NSFW, Cosplay, Video Streams Online | Eronime</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Watch hentai online, read doujin, NSFW free download HD on mobile phone tablet laptop desktop" />
                <link rel="canonical" href="https://eronime.com"/>
                <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>

            <Component {...pageProps} />
        </Layout>
    )
}