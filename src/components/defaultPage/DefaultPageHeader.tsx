import { GameDefaultPage } from "@/types/game";
import { Map } from "@/components/game/Map";
import clsx from "clsx";
import { VimeoPlayer } from "../VimeoPlayer";

export const DefaultPageHeader = ({ page }: { page: GameDefaultPage }) => {
  let heightClassName = "";
  switch (page.headerSize) {
    case "large":
      heightClassName = "h-80 w-full";
      break;
    case "medium":
      heightClassName = "h-64 w-full";
      break;
    case "small":
      heightClassName = "h-48 w-full";
      break;
    default:
      heightClassName = "h-64 w-full";
  }

  if (page.headerType === "image")
    return (
      <img
        src={page.headerImageUrl}
        className={clsx("bg-gray-100 object-cover", heightClassName)}
      />
    );
  if (page.headerType === "map") return <Map className={heightClassName} />;
  if (page.headerType === "video") {
    return (
      <div className="bg-gray-100 overflow-hidden aspect-video w-full">
        {page.headerVideoUrl && <VimeoPlayer videoUrl={page.headerVideoUrl} />}
      </div>
    );
  }
  return null;
};
