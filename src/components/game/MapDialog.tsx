import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import CrossIcon from "@/assets/icons/cross.svg";
import { Map } from "@/components/game/Map";

export const MapDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
}) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-30 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="duration-300 w-lg ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-light flex flex-col"
          >
            <button
              className="w-14 h-14 rounded-full flex items-center justify-center bg-white ml-auto"
              onClick={() => onClose(false)}
            >
              <CrossIcon className="fill-current w-6" />
            </button>
            <div
              className="bg-gray-50 rounded-md overflow-hidden mt-3"
              style={{ height: "85vh" }}
            >
              <Map className="h-full" />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
