export const BottomNavigation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="h-24"></div>
      <div className="h-24 p-4 fixed bottom-0 w-xl max-w-full bg-white border-t border-gray-100 z-20">
        <div className="flex gap-2 ">{children}</div>
      </div>
    </>
  );
};
