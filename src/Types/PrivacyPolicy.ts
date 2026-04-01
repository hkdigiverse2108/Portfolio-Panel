import type { CommonDataType, MessageStatus } from "./Common";

export interface PrivacyPolicyFormValues {
  description?: string;
}

export type UpdatePrivacyPolicyPayload = PrivacyPolicyFormValues;

export type PrivacyPolicyBase = PrivacyPolicyFormValues & CommonDataType;

export interface PrivacyPolicyApiResponse extends MessageStatus {
  data: PrivacyPolicyBase;
}
