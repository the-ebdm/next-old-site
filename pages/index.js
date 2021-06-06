import Head from "next/head";
import RemoteText from "../components/Atom/remoteText";
import FeaturedBlogPosts from "../components/Molecule/blogPosts";
import CurriculumVitae from "../components/Organism/cv";
import firebase from "../lib/firebase";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client";
import { recordMapParser } from "../lib/notion";
import { useEffect, useState } from "react";
import Link from "next/link";
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const database = {
  blog: "3a58bc30-8715-46d4-814f-ed9f777b2a72",
};
const db = firebase.firestore();
const quoteRef = db.collection("Quotes");

export async function getServerSideProps() {
  const client = new NotionAPI();
  const { results } = await notion.databases.query({
    database_id: database.blog,
  });
  const posts = await Promise.all(
    results.filter(item => item.properties.Published.checkbox === true).map((item) => {
      return client.getPage(item.id).then((blocks) => {
        return {
          ...item,
          blocks: recordMapParser(blocks),
        };
      });
    })
  );

  return {
    props: {
      posts: posts,
      quote: null,
    },
  };
}

export default function Home({ remoteConfig, user, posts, quotes }) {
  const [quote] = useDocumentDataOnce(
    db.collection("Quotes").doc("yourworstenemycannot")
  );
  const [cvintro, setCVIntro] = useState(null);
  useEffect(() => {
    if (remoteConfig !== null) {
      setCVIntro(JSON.parse(remoteConfig.getValue("cvintro")._value));
    }
  }, [remoteConfig]);
  useEffect(() => {
    console.log(quote);
  }, [quote]);
  return (
    <>
      <Head>
        <title>EBDM.DEV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  {/* <a
                      href="#"
                      className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    >
                      <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">
                        We're hiring
                      </span>
                      <span className="ml-4 text-sm">Visit our careers page</span>
                      <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                    </a> */}
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">
                      <RemoteText
                        store={"homepagepretext"}
                        remoteConfig={remoteConfig}
                      />
                    </span>
                    <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5">
                      <RemoteText
                        store="homepagetitle"
                        remoteConfig={remoteConfig}
                      />
                    </span>
                  </h1>
                  <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                    <RemoteText
                      store="homepagesubtext"
                      remoteConfig={remoteConfig}
                    />
                  </p>
                  <MailingList />
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                  <img
                    className="hidden lg:block w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section with screenshot */}
        {cvintro ? (
          <div className="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32">
            <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
              <div>
                <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
                  {cvintro.Intro}
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  {cvintro.Title}
                </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                  {cvintro.Text}
                </p>
              </div>
              <div className="mt-12 -mb-10 sm:-mb-24 lg:-mb-40">
                <Link href="/cv" passHref>
                  <a className="">
                    <div className="rounded-xl bg-transparent border-2 border-solid border-transparent hover:border-teal-600" style={{
                      zIndex: '1000 !important;'
                    }}>
                      <CurriculumVitae size="sm" remoteConfig={remoteConfig} imgClass="rounded-t-lg"/>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {/* Testimonial section */}
        {quote ? (
          <div className="pb-16 bg-gradient-to-r from-teal-500 to-cyan-600 lg:pb-0 lg:z-10 lg:relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="relative lg:-my-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"
                />
                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                  <div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                    <img
                      className="object-cover lg:h-full lg:w-full"
                      src="/woman.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                  <blockquote>
                    <div>
                      <svg
                        className="h-12 w-12 text-white opacity-25"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="mt-6 text-2xl font-medium text-white">
                        {quote.Quote}
                      </p>
                    </div>
                    <footer className="mt-6">
                      <p className="text-base font-medium text-white">
                        {quote.Attribution}
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Blog section */}
        <FeaturedBlogPosts header={true} posts={posts.slice(0, 3)} />
      </main>
    </>
  );
}

function MailingList() {
  return <div className="mt-10 sm:mt-12">
    <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
      <div className="sm:flex">
        <div className="min-w-0 flex-1">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900" />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <button
            type="submit"
            className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
          >
            Join Mail List
          </button>
        </div>
      </div>
    </form>
  </div>;
}

