import hljs from "highlight.js";
import TweetEmbed from "react-tweet-embed";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-dark.css";
import Image from "next/image";
import { backgroundImage, backgroundPosition } from "tailwindcss/defaultTheme";
import { useState } from "react";

hljs.registerLanguage("javascript", javascript);

export default function RenderNotionBlock({
  block,
  style = true,
  className = "",
}) {
  if (block === undefined) {
    return <></>;
  }
  if (block.type === "text") {
    return (
      <p className="my-2">
        {block?.properties?.title.map((item) => {
          if (item.length > 1) {
            const style = item[1][0][0];
            switch (style) {
              case "s":
                return <span className="line-through">{item[0]}</span>;

              case "b":
                return <span className="font-bold">{item[0]}</span>;

              default:
                break;
            }
          }
          return item[0];
        })}
      </p>
    );
  }
  if (block.type === "sub_header" || block.type === "sub_sub_header") {
    return (
      <h2
        className={`mt-3 my-5 mx-10 block ${
          block.type === "sub_header" ? "text-2xl" : "text-xl"
        } leading-8 font-extrabold tracking-tight text-gray-900 sm:text-xl`}
      >
        {block?.properties?.title[0]}
      </h2>
    );
  }
  if (block.type === "image") {
    const [image, setImage] = useState({
			height: null,
			width: null,
			hasLoaded: false
		});
    console.log(block);
    return (
      <div
        className={style ? "max-h-screen h-80" : null}
        style={{
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${block.properties.source[0][0]})`,
          backgroundPosition: "center",
        }}
      >
        <img
					onLoad={() => {
						setImage({
							...image,
							hasLoaded: true
						})
					}}
          src={block.properties.source[0][0]}
          className={style ? "hidden" : className}
        />
      </div>
    );
  }
  if (block.type === "code") {
    const highlight = hljs.highlight(block.properties.title[0][0], {
      language: block.properties.language[0][0],
    });
    return (
      <div className="bg-gray-700 text-white p-4 rounded-xl my-4">
        <pre>
          <code
            style={{
              fontFamily: "monospace",
              letterSpacing: "-0.05em",
              wordBreak: "normal",
            }}
            dangerouslySetInnerHTML={{ __html: highlight.value }}
          ></code>
        </pre>
      </div>
    );
  }
  if (block.type === "to_do") {
    return (
      <div className="my-4">
        <div className="flex items-start">
          <div className="h-5 flex items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="focus:ring-transparent h-4 w-4 text-teal-600 border-gray-300 rounded"
              checked={
                block?.properties?.checked !== undefined
                  ? block?.properties?.checked[0][0] === "Yes"
                    ? true
                    : false
                  : false
              }
              readOnly
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              {block?.properties?.title[0]}
            </label>
          </div>
        </div>
      </div>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote
        className="pl-5 py-4 my-4"
        style={{
          borderLeftColor: "#e5e7eb",
          borderLeftWidth: ".25rem",
          fontStyle: "italic",
        }}
      >
        {block?.properties?.title[0]}
      </blockquote>
    );
  }
  if (block.type === "tweet") {
    const tweet = block?.properties?.source[0][0];
    const tweetSegments = tweet.split("/");
    return (
      <div className="w-1/2 mx-auto">
        <TweetEmbed id={tweetSegments[tweetSegments.length - 1]} />
      </div>
    );
  }
  if (block.type === "page" || block.type === "collection_view_page") {
    return <></>;
  }
  return (
    <p>
      {block.type} - {block.id}
    </p>
  );
}
