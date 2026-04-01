import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface SkillFormValues {
  image?: string;
  title?: string;
  percentage?: number;
  isActive?: boolean;
}

export type AddSkillPayload = SkillFormValues;

export type EditSkillPayload = AddSkillPayload & { skillId?: string };

export type SkillBase = SkillFormValues & CommonDataType;

export interface SkillDataResponse extends PageStatus {
  skill_data: SkillBase[];
}

export interface SkillApiResponse extends MessageStatus {
  data: SkillDataResponse;
}
