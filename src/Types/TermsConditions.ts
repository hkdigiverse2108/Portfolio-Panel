import type { CommonDataType, MessageStatus } from "./Common";

export interface TermsConditionsFormValues {
  description?: string;
}

export type UpdateTermsConditionsPayload = TermsConditionsFormValues;

export type TermsConditionsBase = TermsConditionsFormValues & CommonDataType;

export interface TermsConditionsApiResponse extends MessageStatus {
  data: TermsConditionsBase;
}
