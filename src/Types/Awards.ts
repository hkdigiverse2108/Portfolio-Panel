import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface AwardsFormValues {
  image?: string;
  iconImage?: string;
  title?: string;
  date?: string;
  isActive?: boolean;
}

export type AddAwardsPayload = AwardsFormValues;

export type EditAwardsPayload = AddAwardsPayload & { awardsId?: string };

export type AwardsBase = AwardsFormValues & CommonDataType;

export interface AwardsDataResponse extends PageStatus {
  awards_data: AwardsBase[];
}

export interface AwardsApiResponse extends MessageStatus {
  data: AwardsDataResponse;
}
