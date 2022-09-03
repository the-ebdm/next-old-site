import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg">
        <Main />
        <NextScript />
        {/* <div className="absolute top-0 right-0 h-12 w-18 p-4">
          <button className="js-change-theme focus:outline-none">🌙</button>
        </div> */}
      </body>
      <script
        async
        defer
        data-website-id={process.env.UMAMI_TOKEN}
        src="https://analytics.ebdm.dev/umami.js" />
    </Html>
  )
}