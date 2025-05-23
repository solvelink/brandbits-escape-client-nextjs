import { useDraggable } from "@dnd-kit/react";

export const DraggableItem = ({ id }: { id: string }) => {
  const { ref } = useDraggable({
    id: id,
  });
  return (
    <button ref={ref} className="bg-red">
      Draggable: {id}
    </button>
  );
};
