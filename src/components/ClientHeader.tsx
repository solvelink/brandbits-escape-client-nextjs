"use client";

import { useEffect } from "react";

export const ClientHeader = () => {
  useEffect(() => {
    // This effect runs on the client side only
    console.log("ClientHeader mounted");
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-gray-900">Game Header</h1>
          {/* Add any additional header content here */}
        </div>
      </div>
    </header>
  );
};
