import type { CommonDataType, MessageStatus, PhoneNumberType } from "./Common";

export interface BookMeeting {
  link?: string;
  phoneNo?: PhoneNumberType;
  email?: string;
  address?: string;
}

export interface SettingFormValues {
  bookMeeting?: BookMeeting;
}

export type UpdateSettingPayload = SettingFormValues;

export type SettingBase = SettingFormValues & CommonDataType;

export interface SettingApiResponse extends MessageStatus {
  data: SettingBase;
}
