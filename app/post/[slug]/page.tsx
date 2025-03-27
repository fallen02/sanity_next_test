import { sanityClient } from "@/app/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/app/sanity/utils";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  // const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
  const POST_QUERY = `*[_type == "post" && slug.current == $slug]{
  title,
  mainImage {"url": asset->url},
  "createdAt": _createdAt,
    shortDescription,
    content
    
}[0]`;

  const options = { next: { revalidate: 30 } };
  const post = await sanityClient.fetch(
    POST_QUERY,
    { slug },
    options
  );

  return (
    <main>
      <h1 className="text-2xl font-bold">{slug}</h1>
      <Image 
        src={post.mainImage.url}
        alt={post.title}
        className="aspect-video rounded-xl h-40 w-auto"
        width="550"
        height="310"
        priority
      />
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.shortDescription}</p>
      <p>{post.createdAt}</p>
      <div className="prose prose-blue dark:prose-invert prose-xl">
        <PortableText  value={post.content} components={myPortableTextComponents}/>
      </div>
      
      {/* <button onClick={() => console.log(post)}>Hello</button> */}
    </main>
  );
}

const myPortableTextComponents = {
  types: {
    image: ({value}: any) => <Image src={urlForImage(value).url()} alt="Image" height={300} width={300} className="h-100 w-auto"/>,
  },

}
