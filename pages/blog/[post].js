import Post from "../../components/Molecule/post";
import BreadCrumbNav from "../../components/Atom/breadcrumbNav";
import { getPage, getPublishedArticles } from "../../lib/notion";

const dbid = "3a58bc30-8715-46d4-814f-ed9f777b2a72"

export async function getStaticPaths() {
    const results = await getPublishedArticles();
    const ids = results.map(item => ({ "params": { "post": item.id } }))

    return {
        paths: ids,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const page = await getPage(context.params.post);

    return {
        props: {
            post: page,
        },
        revalidate: 10,
    };
};

export default function PostSlug({ post }) {
    const postName = post.properties.Name.title[0].plain_text
    return (
        <>
            <BreadCrumbNav pages={[{ name: 'Blog', href: '/blog', current: false }, { name: postName, href: '#', current: true }]} />
            <Post post={post} recordMap={post.recordMap} />
        </>
    );
}