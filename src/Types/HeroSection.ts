import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface HeroSectionFormValues {
  title?: string;
  subTitles?: string[];
  linkTitle?: string;
  link?: string;
  description?: string;
  isActive?: boolean;
  _submitAction?: string;
}

export type AddHeroSectionPayload = HeroSectionFormValues;

export type EditHeroSectionPayload = HeroSectionFormValues;

export type HeroSectionBase = HeroSectionFormValues & CommonDataType;

export interface HeroSectionDataResponse extends PageStatus {
  heroSection_data: HeroSectionBase[];
}

export interface HeroSectionApiResponse extends MessageStatus {
  data: HeroSectionBase;
}
