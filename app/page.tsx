import { type SanityDocument } from "next-sanity";
import { sanityClient } from "./sanity/client";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 30;

interface PostData {
  title: string;
  shortDescription: string;
  slug: string;
  publishedAt: string;
  mainImage: any;
}
export default async function Home() {
  const POSTS_QUERY = `*[_type == "post"]{
    title,
    shortDescription,
    "slug": slug.current,
      publishedAt,
      mainImage {"url": asset->url}
} | order(_createdAt desc)`;
  const options = { next: { revalidate: 30 } };
  const posts: PostData[] = await sanityClient.fetch(POSTS_QUERY, {}, options);
  return (
    <main>
      {posts.map((post, idx) => (
        <Link href={`/post/${post.slug}`} key={idx}>
          <Image 
            src={post.mainImage.url}
            alt={post.title}
            className="aspect-video rounded-xl h-40 w-auto"
            width="550"
            height="310"
            priority
            
          /> 
          <p>{post.publishedAt}</p>
          <h1 className="text-2xl text-gray-200 font-bold">{post.title}</h1>
          <p>{post.shortDescription}</p>
          {/* <div className="p-4 border-b">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div> */}
        </Link>
      ))}
    </main>
  );
}
