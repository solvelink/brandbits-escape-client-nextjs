import useEscapeStore from "@/stores/escapeStore";
import { useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const GameLayout = ({ children }: { children: React.ReactNode }) => {
  const escapeStore = useEscapeStore();

  useEffect(() => {
    escapeStore.fetchEscapeAndPages();
  }, []);

  if (escapeStore.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return <div>{children}</div>;
};
