import { useDroppable } from "@dnd-kit/react";

export const ImageDroppable = ({ id }: { id: string }) => {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      style={{ backgroundImage: `url(https://picsum.photos/200/300)` }}
      className="bg-cover bg-center w-full h-32 rounded-lg"
    >
      <div className="w-16 h-10 bg-white/20 rounded-full"></div>
    </div>
  );
};
