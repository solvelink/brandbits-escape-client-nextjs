import { getShareData } from "@/repository/server";
import { slugify } from "@/utils/slugify";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const data = await getShareData(id);

  try {
    const res = await fetch(data.teamImageUrl);
    if (!res.ok) {
      return new Response("Image fetch failed", { status: 500 });
    }

    const filename = `${slugify(data.teamName)}-${slugify(
      data.escapeName
    )}.jpg`;

    const contentType =
      res.headers.get("content-type") || "application/octet-stream";
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return new Response("Server error while fetching image.", { status: 500 });
  }
}
