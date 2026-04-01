import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface MyAchievementFormValues {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  btnTitle?: string;
  btnLink?: string;
  isActive?: boolean;
}

export type AddMyAchievementPayload = MyAchievementFormValues;

export type EditMyAchievementPayload = AddMyAchievementPayload & { myAchievementId?: string };

export type MyAchievementBase = MyAchievementFormValues & CommonDataType;

export interface MyAchievementDataResponse extends PageStatus {
  myAchievement_data: MyAchievementBase[];
}

export interface MyAchievementApiResponse extends MessageStatus {
  data: MyAchievementDataResponse;
}
