import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface BusinessCategoryFormValues {
  name?: string;
  isActive?: boolean;
}

export type AddBusinessCategoryPayload = BusinessCategoryFormValues;

export type EditBusinessCategoryPayload = AddBusinessCategoryPayload & { businessCategoryId?: string };

export type BusinessCategoryBase = BusinessCategoryFormValues & CommonDataType;

export interface BusinessCategoryDataResponse extends PageStatus {
  businessCategory_data: BusinessCategoryBase[];
}

export interface BusinessCategoryApiResponse extends MessageStatus {
  data: BusinessCategoryDataResponse;
}
