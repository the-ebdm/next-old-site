import Link from "next/link";
import RenderNotionBlock from "../../components/Atom/renderBlock";
import Panel from "../Atom/panel";

export default function BlogPosts({ posts }) {
  return (
    <div className="mt-12 mx-auto max-w-md px-4 grid grid-cols-1 gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
      {posts.map((post) => {
        return (
          <Link href={`/blog/${post.id}`}>
            <a>
              <div
                key={post.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
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
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-cyan-600">
                      {/* <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a> */}
                    </p>
                    <a href={post.href} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {post.properties.Name.title[0].plain_text}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        <RenderNotionBlock
                          block={post.blocks.find((item) =>
                            [
                              "text",
                              "sub_heading",
                              "sub_sub_heading",
                            ].includes(item.type)
                          )}
                          truncate={true}
                        />
                      </p>
                    </a>
                  </div>
                  {/* <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            post.properties.Author.created_by.name ===
                              "Eric Muir"
                              ? "/profile.jpeg"
                              : post.properties.Author.created_by.avatar_url
                          }
                          alt={post.properties.Author.created_by.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {post.properties.Author.created_by.name}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={post.datetime}>{post.date}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{post.readingLength} read</span>
                        </div>
                      </div>
                    </div> */}
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
