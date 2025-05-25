import { Header } from "@/components/layout/Header";
import { Markdown } from "@/components/Markdown";

export default function PhotoPage({ page }: { page: any }) {
  return (
    <div>
      <Header />
      <div
        className="h-96 bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${page.overlayImageUrl})` }}
      ></div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold">{page.firstTitle}</h1>
        <Markdown className="mt-4">{page.firstTextField}</Markdown>
      </div>
    </div>
  );
}
