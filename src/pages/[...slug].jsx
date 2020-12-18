import headings from "remark-autolink-headings";
import parse from "remark-parse";
import remark2react from "remark-react";
import slug from "remark-slug";
import unified from "unified";
import { Container } from "../component/Container";
import { getContent } from "../logic/content";

export default function Slug({ pathParts, data, content }) {
  const mdContent = unified()
    .use(parse)
    .use(slug)
    .use(headings, { behavior: "wrap" })
    .use(remark2react, {
      remarkReactComponents: {},
    })
    .processSync(content).result;

  return (
    <Container>
      {mdContent}
      <div>
        <p>{JSON.stringify(pathParts)}</p>
        <p>{JSON.stringify(data)}</p>
      </div>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  let { content } = await getContent();
  for (const part of params.slug) {
    content = content[part];
  }

  return {
    props: content.$page,
  };
}

export async function getStaticPaths() {
  const { pages } = await getContent();

  return {
    paths: pages,
    fallback: false,
  };
}
