import { DownloadImageButton } from "@/components/DownloadImageButton";
import { Button } from "@/components/ui/button";
import { getShareData } from "@/repository/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const parseSlug = (slug: string) => {
  const parts = slug.split("-");
  const lastPart = parts[parts.length - 1];
  const id = Number(lastPart);
  return isNaN(id) ? null : id;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = parseSlug(slug);
  if (!id) return {};
  const data = await getShareData(id);
  if (!data) return {};

  return {
    title: `${data.teamName} | ${data.escapeName} Escape`,
    openGraph: {
      images: [
        {
          url: data.teamImageUrl,
          alt: data.teamName,
        },
      ],
    },
    twitter: {
      images: [data.teamImageUrl],
    },
  };
}

export default async function Share({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const id = parseSlug(slug);
  if (!id) {
    return notFound();
  }
  const data = await getShareData(id);
  if (!data) {
    return notFound();
  }

  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center p-4 ">
      <img src={data.teamImageUrl} className="rounded-md w-64" />
      <h1 className="font-bold text-2xl my-6">{t("share.title")}</h1>
      <DownloadImageButton id={id} />
    </div>
  );
}
