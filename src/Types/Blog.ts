import type { CommonDataType, MessageStatus, PageStatus } from "./Common";

export interface BlogFormValues {
  thumbnailImage?: string;
  serviceId?: string;
  date?: string;
  title?: string;
  description?: string;
  images?: string[];
  tagLine?: string;
  tags?: string[];
  isActive?: boolean;
  _submitAction?: string;
}

export type AddBlogPayload = BlogFormValues;

export type EditBlogPayload = AddBlogPayload & { blogId?: string };

export type BlogBase = BlogFormValues & CommonDataType;

export interface BlogDataResponse extends PageStatus {
  blog_data: BlogBase[];
}

export interface BlogApiResponse extends MessageStatus {
  data: BlogDataResponse;
}
