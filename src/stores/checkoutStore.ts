import { ProductType } from "@/types/enum";
import { create } from "zustand";

export type CheckoutState = {
  type: ProductType;
  quantity: number;
  discountCode?: string;
  discountAmount?: number;
};

export type CheckoutActions = {
  setType: (type: ProductType) => void;
  setQuantity: (quantity: number) => void;
  setDiscountCode: (discount?: { code: string; amount: number }) => void;
  clear: () => void;
};

export type CheckoutStore = CheckoutState & CheckoutActions;

const CHECKOUT_TYPE_KEY = "escape_checkout_type";
const CHECKOUT_QUANTITY_KEY = "escape_checkout_quantity";
const CHECKOUT_DISCOUNT_CODE_KEY = "escape_checkout_discount_code";

const defaultState: CheckoutState = {
  type: ProductType.Single,
  quantity: 1,
  discountCode: undefined,
  discountAmount: undefined,
};

export const initCheckoutStore = (): CheckoutState => {
  if (typeof window === "undefined") {
    return { ...defaultState };
  }

  const storedType = localStorage.getItem(CHECKOUT_TYPE_KEY);
  const storedQuantity = localStorage.getItem(CHECKOUT_QUANTITY_KEY);
  const storedDiscountCode = localStorage.getItem(CHECKOUT_DISCOUNT_CODE_KEY);

  const type =
    storedType === ProductType.Single || storedType === ProductType.Team
      ? (storedType as ProductType)
      : defaultState.type;

  const quantity = storedQuantity
    ? parseInt(storedQuantity, 10)
    : defaultState.quantity;

  return {
    type,
    quantity,
    discountCode: storedDiscountCode || undefined,
    discountAmount: undefined,
  };
};

export const createCheckoutStore = (
  initState: CheckoutState = defaultState
) => {
  return create<CheckoutStore>((set) => ({
    ...initState,
    setType: (type: ProductType) => {
      localStorage.setItem(CHECKOUT_TYPE_KEY, type);
      set({ type });
    },
    setQuantity: (quantity: number) => {
      localStorage.setItem(CHECKOUT_QUANTITY_KEY, quantity.toString());
      set({ quantity });
    },
    setDiscountCode: (discount?: { code: string; amount: number }) => {
      if (discount) {
        localStorage.setItem(CHECKOUT_DISCOUNT_CODE_KEY, discount.code);
      } else {
        localStorage.removeItem(CHECKOUT_DISCOUNT_CODE_KEY);
      }
      set({ discountCode: discount?.code, discountAmount: discount?.amount });
    },
    clear: () => {
      localStorage.removeItem(CHECKOUT_TYPE_KEY);
      localStorage.removeItem(CHECKOUT_QUANTITY_KEY);
      localStorage.removeItem(CHECKOUT_DISCOUNT_CODE_KEY);
      set({
        type: ProductType.Single,
        quantity: 1,
        discountCode: undefined,
        discountAmount: undefined,
      });
    },
  }));
};
