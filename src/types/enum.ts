export enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

export enum Language {
  EN = "en",
  DE = "de",
  NL = "nl",
}

export enum ProductType {
  Single = "single",
  Team = "team",
}

export enum PageType {
  DefaultPage = "default_page",
  StartPage = "start_page",
  PhotoPage = "photo_page",
}

export enum DefaultHeaderType {
  None = "none",
  Image = "image",
  Video = "video",
  Map = "map",
}

export enum StartHeaderType {
  Carousel = "carousel",
  VideoScrubber = "video_scrubber",
}

export enum QuestionType {
  None = "none",
  Open = "open",
  MultipleChoice = "multiple_choice",
  NumberAssociation = "number_association",
  AudioAssociation = "audio_association",
}
