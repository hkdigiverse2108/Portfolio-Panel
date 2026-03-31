import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface ServiceFormValues {
  name?: string;
  isActive?: boolean;
}

export type AddServicePayload = ServiceFormValues;

export type EditServicePayload = AddServicePayload & { serviceId?: string };

export type ServiceBase = ServiceFormValues & CommonDataType;

export interface ServiceDataResponse extends PageStatus {
  service_data: ServiceBase[];
}

export interface ServiceApiResponse extends MessageStatus {
  data: ServiceDataResponse;
}
