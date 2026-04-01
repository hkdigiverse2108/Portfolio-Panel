import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface ContactUsFormValues {
  name?: string;
  phoneNo?: number;
  email?: string;
  message?: string;
  isActive?: boolean;
}

export type AddContactUsPayload = ContactUsFormValues;

export type EditContactUsPayload = AddContactUsPayload & { contactUsId?: string };

export type ContactUsBase = ContactUsFormValues & CommonDataType;

export interface ContactUsDataResponse extends PageStatus {
  contactUs_data: ContactUsBase[];
}

export interface ContactUsApiResponse extends MessageStatus {
  data: ContactUsDataResponse;
}
