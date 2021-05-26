import axios from "axios";
import Link from "next/link";

import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client";
import { recordMapParser } from "../../lib/notion";
import RenderNotionBlock from "../../components/Atom/renderBlock";
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const database = {
  blog: "3a58bc30-8715-46d4-814f-ed9f777b2a72",
};

export async function getServerSideProps() {
  const client = new NotionAPI();
  const { results } = await notion.databases.query({
    database_id: database.blog,
  });
  const posts = await Promise.all(
    results.map((item) => {
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
    },
  };
}

export default function Blog({ posts }) {
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 w-3/4 mx-auto">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 truncate">Blog</h2>
          {/* {MailingList()} */}
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {posts &&
            posts.map((post) => {
              return (
                <div key={post.properties.Name.title[0].plain_text}>
                  <p className="text-sm text-gray-500">
                    <time dateTime={post.created_time}>
                      {post.created_time}
                    </time>
                  </p>
                  <a href="#" className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.properties.Name.title[0].plain_text}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      <RenderNotionBlock block={post.blocks.find(item => item.type === "text")} />
                    </p>
                  </a>
                  <div className="mt-3">
                    <Link href={`/blog/${post.id}`} passHref>
                      <a className="text-base font-semibold text-teal-600 hover:text-teal-500">
                        Read full story
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function MailingList() {
  return (
    <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
      <p className="text-xl text-gray-500">
        Join the mailing list to post comments!{" "}
      </p>
      <form className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email-address"
            type="email"
            autoComplete="email"
            required
            className="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 lg:max-w-xs"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
          <button
            type="button"
            className="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
          >
            Notify me
          </button>
        </div>
      </form>
    </div>
  );
}
