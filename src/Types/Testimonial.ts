import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface TestimonialFormValues {
  name?: string;
  designation?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export type AddTestimonialPayload = TestimonialFormValues;

export type EditTestimonialPayload = AddTestimonialPayload & { testimonialId?: string };

export type TestimonialBase = TestimonialFormValues & CommonDataType;

export interface TestimonialDataResponse extends PageStatus {
  testimonial_data: TestimonialBase[];
}

export interface TestimonialApiResponse extends MessageStatus {
  data: TestimonialDataResponse;
}
