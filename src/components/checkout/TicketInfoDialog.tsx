import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CrossIcon from "@/assets/icons/cross.svg?react";

export const TicketInfoDialog = ({
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
      className="relative z-10 focus:outline-none"
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
            className="bg-white p-6 duration-300 max-w-lg rounded-md ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-light"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <DialogTitle as="h3" className="font-medium">
                Welk ticket heb ik nodig?
              </DialogTitle>
              <button onClick={() => onClose(false)}>
                <CrossIcon className="fill-current w-6" />
              </button>
            </div>
            <p className="mt-6">
              <b>Ik wil met 1 telefoon spelen</b> tempor nisi enim officia
              proident sit eiusmod sint proident non duis anim officia.
              Consequat proident occaecat consequat reprehenderit ipsum aute.
              Incididunt elit qui commodo adipisicing labore sint nulla anim
            </p>
            <p className="mt-6">
              <b>Wij gaan tegen elkaar strijden</b> nisi enim officia proident
              sit eiusmod sint proident non duis anim officia. Consequat
              proident occaecat consequat reprehenderit ipsum aute. Incididunt
              elit qui commodo adipisicing labore sint nulla anim .
            </p>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
