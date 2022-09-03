import { getPublishedArticlesWithBlocks } from "../../lib/notion";
import BlogPosts from "../../components/Molecule/blogPosts";
import BreadCrumbNav from "../../components/Atom/breadcrumbNav";
import Panel from "../../components/Atom/panel";

export async function getStaticProps() {
    const posts = await getPublishedArticlesWithBlocks();

    return {
        props: {
            posts: posts,
        },
        revalidate: 10,
    };
}

export default function Blog({ posts }) {
    return (
        <>
            <BreadCrumbNav pages={[{ name: 'Blog', href: '/blog', current: true }]} />
            
            <Panel header={{ title: "Latest Blog Posts", description: "Browse some of my latest blog posts" }}>
                <BlogPosts posts={posts} header={true} />
            </Panel>
        </>
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