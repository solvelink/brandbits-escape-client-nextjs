import { Language } from "./enum";

export interface Escape {
  id: number;
  name: string;
  priceSingle: string;
  priceTeams: string;
  theme?: string;
  faviconUrl?: string;
  escapeContent: EscapeContent[];
}

export interface EscapeContent {
  id: number;
  escapeId: number;
  language: Language;
  websiteUrl: string;
  checkoutImageUrl: string;
  checkoutTitle: string;
  checkoutDescription: string;
  checkoutSuccessImageUrl: string;
  checkoutSuccessTitle: string;
  checkoutSuccessDescription: string;
  invitationImageUrl: string;
  invitationTitle: string;
  invitationDescription: string;
}
