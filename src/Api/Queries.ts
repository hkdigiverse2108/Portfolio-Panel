import type { Params } from "react-router-dom";
import { KEYS, URL_KEYS } from "../Constants";
import type { AppQueryOptions, UploadResponse, UserApiResponse } from "../Types";
import { Get } from "./Methods";
import { useQueries } from "./ReactQuery";
import type { HeroSectionApiResponse } from "../Types/HeroSection";

export const Queries = {
  // ************ Upload ***********
  useGetUploadImage: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.IMAGES], () => Get(URL_KEYS.UPLOAD.IMAGES), options),
  useGetUploadPdf: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.PDFS], () => Get(URL_KEYS.UPLOAD.PDFS), options),

  // ************ User ***********
  useGetUser: (params?: Params) => useQueries<UserApiResponse>([KEYS.USER.BASE, params], () => Get(URL_KEYS.USER.GET, params)),

  //*************** Hero Section *********
  useGetHeroSection: (params?: Params) => useQueries<HeroSectionApiResponse>([KEYS.HERO_SECTION.BASE, params], () => Get(URL_KEYS.HERO_SECTION.GET, params)),
};
