import {
  DefaultHeaderType,
  Language,
  PageType,
  QuestionType,
  StartHeaderType,
} from "./enum";

export interface Game {
  id: number;
  teamName?: string;
  points: number;
  teamImageUrl?: string;
  escape: {
    id: number;
    name: string;
    domain: string;
    priceSingle: string;
    priceTeams: string;
    mapboxStyleUrl: string;
    mapStartLat: number;
    mapStartLng: number;
    mapGeojson: string;
    theme: string;
    emailDomain: string;
    createdAt: string;
    updatedAt: string;
    escapeContent: {
      progressImageUrl?: string;
    };
  };
  pages: GamePage[];
}

export type GamePage = {
  id: number;
  escapeId: number;
  order: number;
} & (
  | {
      type: PageType.DefaultPage;
      data: GameDefaultPage[];
    }
  | {
      type: PageType.StartPage;
      data: GameStartPage[];
    }
  | {
      type: PageType.PhotoPage;
      data: GamePhotoPage[];
    }
);

export interface GameStartPage {
  id: number;
  language: Language;
  pageId: number;
  headerType: StartHeaderType;
  headerVideoUrl?: string;
  title: string;
  subtitle: string;
  description: string;
  listLabel: string;
  images: {
    id: number;
    startPageId: number;
    imageUrl: string;
    text: string;
    order: number;
  }[];
  listItems: {
    id: number;
    startPageId: number;
    text: string;
    svgPath: string;
  }[];
}

export interface GameDefaultPage {
  id: number;
  language: Language;
  pageId: number;
  showProgressHeader: boolean;
  headerType: DefaultHeaderType;
  headerImageUrl?: string;
  headerVideoUrl?: string;
  headerSize: string;
  mapType: string;
  mapRangeStart?: number;
  mapRangeEnd?: number;
  isTextCentered: boolean;
  title?: string;
  textField1?: string;
  textField2?: string;
  textField3?: string;
  appleMapsUrl?: string;
  googleMapsUrl?: string;
  audioUrl?: string;
  audioLabel?: string;
  accordionTitle?: string;
  accordionText?: string;
  questionLabel?: string;
  questionType: QuestionType;
  buttonLabel?: string;
  hints: {
    id: number;
    defaultPageId: number;
    text: string;
    order: number;
  }[];
  multipleChoiceAnswers?: MultipleChoiceAnswer[];
  openQuestionAnswers?: OpenQuestionAnswer[];
  numberAssociationAnswers?: NumberAssociationAnswer[];
  audioAssociationAnswers?: AudioAssociationAnswer[];
}

export interface MultipleChoiceAnswer {
  id: number;
  defaultPageId: number;
  label: string;
  isAnswer: boolean;
  order: number;
}

export interface OpenQuestionAnswer {
  id: number;
  defaultPageId: number;
  answer: string;
}

export interface NumberAssociationAnswer {
  id: number;
  defaultPageId: number;
  number: number;
  imageUrl: string;
  order: number;
}

export interface AudioAssociationAnswer {
  id: number;
  defaultPageId: number;
  number: number;
  imageUrl: string;
  audioUrl: string;
  order: number;
}

export interface GamePhotoPage {
  id: number;
  language: Language;
  pageId: number;
  overlayImageUrl: string;
  firstTitle: string;
  firstTextField: string;
  secondTitle: string;
  secondTextField: string;
}

export interface GameAnswer {
  answer: string;
  hintCount: number;
}

export interface SetGameAnswerResponse {
  answer: GameAnswerResponse;
  pointsEarned: number;
  totalPoints: number;
}

export interface GameAnswerResponse {
  id: number;
  gameId: number;
  pageId: number;
  pointsEarned: number;
  answer: string;
  answeredAt: string;
}
