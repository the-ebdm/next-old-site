import Post from "../../components/Molecule/post";
import axios from "axios";
import { NotionAPI } from "notion-client";
import { useRouter } from "next/router";
import { Client } from "@notionhq/client"
import { recordMapParser } from "../../lib/notion";
import BreadCrumbNav from "../../components/Atom/breadcrumbNav";
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})
const dbid = "3a58bc30-8715-46d4-814f-ed9f777b2a72"

export async function getStaticPaths() {
    const client = new NotionAPI();
    const { results } = await notion.databases.query({
        database_id: dbid,
        filter: {
            property: "Published",
            checkbox: {
                equals: true,
            }
        }
    });

    const ids = results.map(item => ({"params": {"post": item.id}}))

    console.log(ids)

    return {
        paths: ids,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    console.log(context)
    const client = new NotionAPI();
    const recordMap = await client.getPage(context.params.post);
    const page = await notion.pages.retrieve({ page_id: context.params.post });

    const blocks = await notion.blocks.children.list({ block_id: context.params.post }).then(blocks => {
        const { results } = blocks;
        return blocks;
    })

    page.blocks = blocks;

    console.log(page)

    return {
        props: {
            post: page,
            recordMap: recordMap,
        },
    };
};

export default function PostSlug({ recordMap, post }) {
    const postName = post.properties.Name.title[0].plain_text
    return (
        <>
            <BreadCrumbNav pages={[{ name: 'Blog', href: '/blog', current: false }, { name: postName, href: '#', current: true }]} />
            <Post post={post} recordMap={recordMap} />
        </>
    );
}