import 'tailwindcss/tailwind.css'
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EBDM.DEV</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
