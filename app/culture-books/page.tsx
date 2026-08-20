import type { Metadata } from "next";
import { BookMasterPage } from "@/components/book-master-page";
import { getBookMaster } from "@/lib/book-masters";
import { pageMetadata } from "@/lib/seo";

const master = getBookMaster("culture-books")!;

export const metadata: Metadata = pageMetadata({
  title: master.title,
  description: master.description,
  path: "/culture-books",
  image: master.image,
});

export default function CultureBooksPage() {
  return <BookMasterPage master={master} />;
}
