import Link from "next/link";
import RenderNotionBlock from "../../components/Atom/renderBlock";

export default function BlogPosts({ posts }) {
  return (
    <div className="mt-12 mx-auto max-w-md px-4 grid grid-cols-1 gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
      {posts.map((post) => {
        return (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <a className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
              <div className="flex-shrink-0">
                <RenderNotionBlock
                  block={post.blocks.find(
                    (item) => item.type === "image"
                  )}
                  imgCaption={false}
                  style={false}
                  className="h-48 w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {post.properties.Name.title[0].plain_text}
                </h3>
                <p className="mt-3 text-base text-gray-500">
                  {post.properties.Description.rich_text[0].plain_text}
                </p>
              </div>
              <div className="m-6 flex items-center">
                <div className="flex-shrink-0">
                  <span className="sr-only">Eric Muir</span>
                  <img className="h-10 w-10 rounded-full" src="https://avatars.githubusercontent.com/u/8759717?v=4?v=3&s=88" alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="hover:underline">
                      Eric Muir
                    </span>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500 mb-2">
                    <time dateTime={post.created_time}>{(new Date(post.created_time)).toLocaleString('en-GB')}</time>
                    {/* <span aria-hidden="true">&middot;</span> */}
                    {/* <span>{post.readingTime} read</span> */}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}