import 'tippy.js/dist/tippy.css';
import '../assets/core.css'
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EBDM.DEV</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow&display=swap" rel="stylesheet" />
      </Head>
      <Script
        async
        defer
        data-website-id={process.env.UMAMI_TOKEN}
        src="https://analytics.ebdm.dev/umami.js" />
      <Component {...pageProps} />
    </>
  )
}