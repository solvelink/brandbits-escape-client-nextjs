import { Header, HeaderBar } from "@/components/layout/Header";
import { Map } from "@/components/game/Map";
import MapPinIcon from "@/assets/icons/map-pin.svg?react";
import { Collapsable } from "@/components/Collapsable";
import { Markdown } from "@/components/Markdown";
import { isAppleDevice } from "@/utils/isApple";
import { NavigationPreferenceDialog } from "@/components/game/NavigationPreferenceDialog";
import { useState } from "react";

const DefaultPageHeader = ({ type, data }: any) => {
  let height = "";
  switch (data.headerSize) {
    case "large":
      height = "h-80 w-full";
      break;
    case "medium":
      height = "h-64 w-full";
      break;
    case "small":
      height = "h-48 w-full";
      break;
    default:
      height = "h-64 w-full";
  }

  if (type === "image")
    return (
      <img src={data.headerImageUrl} className={height + " object-cover"} />
    );
  if (type === "map") return <Map className={height} />;
  // if (type === "video")
  return null;
};

export default function DefaultPage({ page }: { page: any }) {
  const [showPreferenceDialog, setShowPreferenceDialog] = useState(false);

  const openNavigation = () => {
    if (isAppleDevice()) {
      const preference = localStorage.getItem("navigation_preference");
      if (preference === "apple") {
        window.open(page.appleMapsUrl, "_blank");
      } else if (preference === "google") {
        window.open(page.googleMapsUrl, "_blank");
      } else {
        setShowPreferenceDialog(true);
      }
    } else {
      window.open(page.googleMapsUrl, "_blank");
    }
  };

  return (
    <div className={page.showProgressHeader ? "" : "pt-4"}>
      {page.showProgressHeader ? <Header /> : <HeaderBar />}
      <DefaultPageHeader type={page.headerType} data={page} />
      <div className="px-4 py-6 flex flex-col gap-4 font-light">
        {page.title && <h1 className="text-2xl font-bold">{page.title}</h1>}
        {page.textField1 && <Markdown>{page.textField1}</Markdown>}
        {page.appleMapsUrl && page.googleMapsUrl && (
          <button
            onClick={openNavigation}
            className="flex items-center text-turquoise underline"
          >
            <MapPinIcon className="fill-current w-4 mr-1" />
            Gebruik deze link om te navigeren
          </button>
        )}
        {page.textField2 && <Markdown>{page.textField2}</Markdown>}
        {page.accordionTitle && page.accordionText && (
          <Collapsable title={page.accordionTitle}>
            <Markdown>{page.accordionText}</Markdown>
          </Collapsable>
        )}
        {page.questionType !== "none" && `Question type: ${page.questionType}`}
        {page.textField3 && <Markdown>{page.textField3}</Markdown>}
        {page.hints && page.hints.length > 0 && (
          <div className="flex flex-col gap-2">
            {page.hints.map((hint: any, index: number) => (
              <div className="bg-gray-75 rounded-md p-5" key={hint.id}>
                <h1 className="font-bold">Hint {index + 1}</h1>
                <p>{hint.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const { source, target } = event.operation;
          console.log(source?.id);
          console.log(target?.id);

          if (source?.id && target?.id) {
            setTargets((prev) => ({
              ...prev,
              [source.id]: target.id,
            }));
          }
        }}
      >
        {JSON.stringify(targets)}
        <div className="bg-gray-100/50">
          <div className="grid grid-cols-2 gap-4 p-4">
            <ImageDroppable id="1" />
            <ImageDroppable id="2" />
            <ImageDroppable id="3" />
            <ImageDroppable id="4" />
          </div>
        </div>

        <Markdown>
          Voluptate dolor ex tempor eu excepteur aute. Nisi commodo quis irure
          sunt ex veniam Lorem tempor enim. Veniam id eu duis. Sit ex ea
          incididunt velit tempor velit esse minim esse aliquip magna nulla
          excepteur. Fugiat incididunt dolore adipisicing ad.
        </Markdown>

        <div className="Flex">
          {!targets["1"] && <DraggableItem id="1" />}
          <DraggableItem id="2" />
          <DraggableItem id="3" />
          <DraggableItem id="4" />
        </div>
      </DragDropProvider> */}
      <NavigationPreferenceDialog
        open={showPreferenceDialog}
        onClose={setShowPreferenceDialog}
        appleUrl={page.appleMapsUrl}
        googleUrl={page.googleMapsUrl}
      />
    </div>
  );
}
