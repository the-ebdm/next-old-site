import 'tailwindcss/tailwind.css'
import 'tippy.js/dist/tippy.css';
import '../assets/core.css'
import Head from "next/head";
import Script from "next/script";

function App({ Component, pageProps }) {
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
        data-website-id="9102799d-8243-4419-8e77-eaec872feaf8"
        src="https://analytics.ebdm.dev/umami.js" />
      <Component {...pageProps} />
    </>
  )
}

export default App
