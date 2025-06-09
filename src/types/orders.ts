import { Language, ProductType } from "./enum";

export interface CreateOrderData {
  productType: ProductType;
  quantity: number;
  contactData: {
    name: string;
    email: string;
    address: string;
    zipcode: string;
    city: string;
  };
  language: string;
  discountCode?: string;
}

export type CreateOrderResponse =
  | {
      message: string;
      status: "success";
    }
  | {
      message: string;
      status: "redirect";
      redirectUrl: string;
    };
