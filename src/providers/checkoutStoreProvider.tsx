"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type CheckoutStore,
  createCheckoutStore,
  initCheckoutStore,
} from "@/stores/checkoutStore";

export type CheckoutStoreApi = ReturnType<typeof createCheckoutStore>;

export const CheckoutStoreContext = createContext<CheckoutStoreApi | undefined>(
  undefined
);

export interface CheckoutStoreProviderProps {
  children: ReactNode;
}

export const CheckoutStoreProvider = ({
  children,
}: CheckoutStoreProviderProps) => {
  const storeRef = useRef<CheckoutStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCheckoutStore(initCheckoutStore());
  }

  return (
    <CheckoutStoreContext.Provider value={storeRef.current}>
      {children}
    </CheckoutStoreContext.Provider>
  );
};

export const useCheckoutStore = <T,>(
  selector: (store: CheckoutStore) => T
): T => {
  const checkoutStoreContext = useContext(CheckoutStoreContext);

  if (!checkoutStoreContext) {
    throw new Error(
      `useCheckoutStore must be used within CheckoutStoreProvider`
    );
  }

  return useStore(checkoutStoreContext, selector);
};
