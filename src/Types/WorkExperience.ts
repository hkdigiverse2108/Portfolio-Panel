import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface WorkExperienceFormValues {
  year?: number;
  title?: string;
  subTitle?: string;
  isActive?: boolean;
}

export type AddWorkExperiencePayload = WorkExperienceFormValues;

export type EditWorkExperiencePayload = AddWorkExperiencePayload & { workExperienceId?: string };

export type WorkExperienceBase = WorkExperienceFormValues & CommonDataType;

export interface WorkExperienceDataResponse extends PageStatus {
  workExperience_data: WorkExperienceBase[];
}

export interface WorkExperienceApiResponse extends MessageStatus {
  data: WorkExperienceDataResponse;
}
