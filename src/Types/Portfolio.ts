import type { CommonDataType, MessageStatus, PageStatus } from "./Common";
import type { ServiceBase } from "./Service";

export interface PortfolioSocialLink {
  title?: string;
  link?: string;
  icon?: string;
  isActive?: boolean;
}

export interface PortfolioFormValues {
  thumbnailImage?: string;
  title?: string;
  subTitle?: string;
  serviceIds?: string[];
  isFeatured?: boolean;
  link?: string;
  description?: string;
  images?: string[];
  projectName?: string;
  client?: string;
  technology?: string;
  date?: Date;
  socialLinks?: PortfolioSocialLink[];
  isActive?: boolean;
  _submitAction?: string;
}

export type AddPortfolioPayload = PortfolioFormValues;

export type EditPortfolioPayload = AddPortfolioPayload & { portfolioId?: string };

export interface PortfolioBase extends Omit<PortfolioFormValues, "serviceIds">, CommonDataType {
  serviceIds: ServiceBase;
  isFeatured: boolean;
}

export interface PortfolioDataResponse extends PageStatus {
  portfolio_data: PortfolioBase[];
}

export interface PortfolioApiResponse extends MessageStatus {
  data: PortfolioDataResponse;
}
