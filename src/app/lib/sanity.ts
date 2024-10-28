import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
export const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_VERSION || "2023-10-04",
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID || "7yqhz4gp",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
