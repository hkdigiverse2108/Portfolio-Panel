import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface WorkCountFormValues {
  number?: string;
  title?: string;
  isActive?: boolean;
}

export type AddWorkCountPayload = WorkCountFormValues;

export type EditWorkCountPayload = AddWorkCountPayload & { workCountId?: string };

export type WorkCountBase = WorkCountFormValues & CommonDataType;

export interface WorkCountDataResponse extends PageStatus {
  workCount_data: WorkCountBase[];
}

export interface WorkCountApiResponse extends MessageStatus {
  data: WorkCountDataResponse;
}
