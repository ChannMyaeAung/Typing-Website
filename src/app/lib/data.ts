import { client } from "./sanity";

export const revalidate = 30;

export async function getWords() {
  const query = `*[_type == 'word']{
    title,
    text_short,
    text_medium,
    text_long,
    content
  }`;
  const data = await client.fetch(query);
  return data;
}
