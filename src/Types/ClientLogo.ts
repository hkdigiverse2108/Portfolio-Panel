import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface ClientLogoFormValues {
  name?: string;
  image?: string;
  link?: string;
  isActive?: boolean;
  _submitAction?: string;
}

export type AddClientLogoPayload = ClientLogoFormValues;

export type EditClientLogoPayload = AddClientLogoPayload & { clientLogoId?: string };

export type ClientLogoBase = ClientLogoFormValues & CommonDataType;

export interface ClientLogoDataResponse extends PageStatus {
  clientLogo_data: ClientLogoBase[];
}

export interface ClientLogoApiResponse extends MessageStatus {
  data: ClientLogoDataResponse;
}
