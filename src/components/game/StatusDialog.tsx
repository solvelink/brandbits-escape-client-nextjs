import { StatsItem } from "@/pages/game/Stats";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Button } from "../ui/button";

export const StatusDialog = ({
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
            className="duration-300 w-lg ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-light bg-white rounded-md p-4"
          >
            <div className="bg-gray-100 rounded-sm h-54" />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold">Jullie staan voor!</h3>
              <p className="mt-2">
                Het andere team weet nu dat jullie op kop liggen. Blijf scherp
                en houd die voorsprong vast!
              </p>
              <div className="py-6">
                <div className="grid grid-cols-2 gap-3">
                  <StatsItem name="Punten" value={(200).toString()} />
                  <StatsItem name="Laatse vraag" value={"Vraag 9"} />
                </div>
              </div>
              <Button onClick={() => onClose(false)} className="w-full">
                Op naar de winst!
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
