import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface WhyChoose {
  title?: string;
  description?: string;
}

export interface OurServiceFormValues {
  priority?: number;
  title?: string;
  shortDescription?: string;
  description?: string;
  thumbnailImage?: string;
  serviceIds?: string[];
  images?: string[];
  tagLine?: string;
  whyChoose?: WhyChoose;
  isActive?: boolean;
  _submitAction?: string;
}

export type AddOurServicePayload = OurServiceFormValues;

export type EditOurServicePayload = AddOurServicePayload & { ourServiceId?: string };

export type OurServiceBase = OurServiceFormValues & CommonDataType;

export interface OurServiceDataResponse extends PageStatus {
  ourService_data: OurServiceBase[];
}

export interface OurServiceApiResponse extends MessageStatus {
  data: OurServiceDataResponse;
}
