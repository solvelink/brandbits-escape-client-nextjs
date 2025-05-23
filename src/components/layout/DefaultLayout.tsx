import { Outlet } from "react-router";

export const DefaultLayout = () => {
  return (
    <div className="max-w-xl mx-auto shadow-md min-h-screen relative bg-white">
      <Outlet />
    </div>
  );
};
