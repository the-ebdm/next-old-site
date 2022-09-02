import { useRef, useState } from "react";
import { recordMapParser } from "../../lib/notion";
import Panel from "../Atom/panel";
import RenderNotionBlock from "../Atom/renderBlock";
import { useScript } from "../../lib/hooks";

export default function Post({ post, recordMap }) {
  const comment = useRef(null);
  const status = useScript({
    url: "https://utteranc.es/client.js",
    theme: "github-light",
    issueTerm: "pathname",
    repo: "ebdmuir/website",
    ref: comment
  });

  if (post) {
    return (
      <Panel padding="top" addClass="px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-teal-600 font-semibold tracking-wide uppercase">
              Introducing
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {post.properties.Name.title[0].plain_text}
            </span>
          </h1>
          {post.properties.hasOwnProperty('Description') ? (
            <p className="mt-8 text-xl text-gray-500 leading-8 text-center">
              {post.properties.Description.rich_text[0].plain_text}
            </p>
          ) : null}
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          {recordMapParser(recordMap).map((block) => (
            <RenderNotionBlock block={block} pageSlug={post.id} key={block.id} />
          ))}
          {
            <div ref={comment}></div>
          }
        </div>
      </Panel>
    );
  } else {
    return <div>Loading...</div>;
  }
}
