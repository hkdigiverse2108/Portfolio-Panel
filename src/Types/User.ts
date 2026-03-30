import type { CommonDataType, MessageStatus, PageStatus, PhoneNumberType } from "./Common";

export interface UserFormValues {
  firstName?: string;
  lastName?: string;
  phoneNo?: PhoneNumberType;
  profileImage?: string | null;
  email?: string;
  password?: string;
  offers?: string[];
  socialMediaLinks?: string[];
  isActive?: boolean;
  _submitAction?: string;
}

export type AddUserPayload = UserFormValues;

export type EditUserPayload = AddUserPayload & { userId: string };

export type UserBase = UserFormValues & CommonDataType;

export interface UserDataResponse extends PageStatus {
  user_data: UserBase[];
}

export interface UserApiResponse extends MessageStatus {
  data: UserDataResponse;
}

export interface SingleUserApiResponse extends MessageStatus {
  data: UserBase[];
}

