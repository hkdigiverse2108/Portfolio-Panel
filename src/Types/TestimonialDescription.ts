import type { CommonDataType, MessageStatus } from "./Common";

export interface TestimonialDescriptionFormValues {
  title?: string;
  subTitle?: string;
  rating?: number;
}

export type UpdateTestimonialDescriptionPayload = TestimonialDescriptionFormValues;

export type TestimonialDescriptionBase = TestimonialDescriptionFormValues & CommonDataType;

export interface TestimonialDescriptionApiResponse extends MessageStatus {
  data: TestimonialDescriptionBase;
}
