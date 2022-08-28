import Link from "next/link";
import RenderNotionBlock from "../../components/Atom/renderBlock";

export default function BlogPosts({ posts, header = false }) {
  return (
    <div className="relative py-16 sm:py-24 lg:py-32 rounded-lg">
      <div className="relative">
        {header ? (
          <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
              Learn
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Latest Blog Posts
            </p>
            <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
              Browse some of my latest blog posts
            </p>
          </div>
        ) : null}
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
                      <div className="mt-6 flex items-center">
                        {/* <div className="flex-shrink-0">
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
                        </div> */}
                        <div className="ml-3">
                          {/* <p className="text-sm font-medium text-gray-900">
                            {post.properties.Author.created_by.name}
                          </p> */}
                          {/* <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={post.datetime}>{post.date}</time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{post.readingLength} read</span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
