import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "ncvhcg1q",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
