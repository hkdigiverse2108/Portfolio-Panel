import type { Params } from "react-router-dom";
import { KEYS, URL_KEYS } from "../Constants";
import type { AppQueryOptions, UploadResponse, UserApiResponse } from "../Types";
import { Get } from "./Methods";
import { useQueries } from "./ReactQuery";

export const Queries = {
  // ************ Upload ***********
  useGetUploadImage: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.IMAGES], () => Get(URL_KEYS.UPLOAD.IMAGES), options),
  useGetUploadPdf: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.PDFS], () => Get(URL_KEYS.UPLOAD.PDFS), options),

  // ************ User ***********
  useGetUser: (params?: Params) => useQueries<UserApiResponse>([KEYS.USER.BASE, params], () => Get(URL_KEYS.USER.GET, params)),
};
