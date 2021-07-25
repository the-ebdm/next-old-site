import Post from "../../components/Molecule/post";
import axios from "axios";
import { NotionAPI } from "notion-client";
import { useRouter } from "next/router";
import { Client } from "@notionhq/client"
import { recordMapParser } from "../../lib/notion";
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const dbid = "3a58bc30-8715-46d4-814f-ed9f777b2a72"

export async function getStaticPaths() {
  const client = new NotionAPI();
  const { results } = await notion.databases.query({
    database_id: dbid,
  });
  console.log(results.map(item => item.id))
  return {
    paths: results.map(item => item.id),
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const client = new NotionAPI();
	const recordMap = await client.getPage(context.params.post);
  const { results } = await notion.databases.query({
		database_id: dbid,
	})
	const posts = await Promise.all(results.map(item => {
		return notion.blocks.children.list({block_id: item.id}).then(blocks => {
			const { results } = blocks;
			item.blocks = results
			return item;
		})
	}));

  return {
    props: {
      post: posts.find(item => item.id === context.query.post),
      recordMap: recordMap,
    },
  };
};

export default function PostSlug({ recordMap, post }) {
	const router = useRouter();
  console.log(router);
  return (
    <div>
      <Post post={post} recordMap={recordMap}/>
    </div>
  );
}
