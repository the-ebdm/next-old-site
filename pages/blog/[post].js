import Post from "../../components/Molecule/post";
import useSWR from "swr";
import axios from "axios";
import { NotionAPI } from "notion-client";
import { useRouter } from "next/router";
import { Client } from "@notionhq/client"
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const database = {
	blog: "3a58bc30-8715-46d4-814f-ed9f777b2a72"
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const getServerSideProps = async (context) => {
  const client = new NotionAPI();
	const recordMap = await client.getPage(context.params.post);
  const { results } = await notion.databases.query({
		database_id: database.blog,
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
