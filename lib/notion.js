import personalData from "../me.json";
import { NotionAPI } from "notion-client";
import { Client } from "@notionhq/client"

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const dbid = personalData["notion-blog-db-id"]

const recordMapParser = (recordMap) => {
    const blocks = Object.keys(recordMap.block)
        .map((item) => recordMap.block[item])
        .map((item) => item.value);
    return blocks;
};

const getPublishedArticles = async () => {
    const { results } = await notion.databases.query({
        database_id: dbid,
        filter: {
            property: "Published",
            checkbox: {
                equals: true,
            }
        }
    });
    return results;
}

const getPublishedArticlesWithBlocks = async () => {
    const client = new NotionAPI();
    const results = await getPublishedArticles();
    const pages = await Promise.all(
        results.map((item) => {
            return client.getPage(item.id).then((blocks) => {
                return {
                    ...item,
                    blocks: recordMapParser(blocks),
                };
            });
        })
    );

    console.log(pages)

    return pages;
}

const getPage = async (pageId) => {
    const client = new NotionAPI();
    const recordMap = await client.getPage(pageId);
    const page = await notion.pages.retrieve({ page_id: pageId });

    const blocks = await notion.blocks.children.list({ block_id: pageId }).then(blocks => {
        return blocks;
    })

    page.blocks = blocks;
    page.recordMap = recordMapParser(recordMap);

    return page;
}

export { getPublishedArticles, getPublishedArticlesWithBlocks, getPage };