import { KEYS, URL_KEYS } from "../Constants";
import type { AppQueryOptions, AwardsApiResponse, BlogApiResponse, ClientLogoApiResponse, HeroSectionApiResponse, OurServiceApiResponse, Params, PortfolioApiResponse, ServiceApiResponse, SkillApiResponse, UploadResponse, UserApiResponse, WorkCountApiResponse, WorkExperienceApiResponse } from "../Types";
import { Get } from "./Methods";
import { useQueries } from "./ReactQuery";

export const Queries = {
  // ************ Upload ***********
  useGetUploadImage: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.IMAGES], () => Get(URL_KEYS.UPLOAD.IMAGES), options),
  useGetUploadPdf: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.PDFS], () => Get(URL_KEYS.UPLOAD.PDFS), options),

  // ************ User ***********
  useGetUser: (params?: Params) => useQueries<UserApiResponse>([KEYS.USER.BASE, params], () => Get(URL_KEYS.USER.GET, params)),

  //*************** Hero Section *********
  useGetHeroSection: (params?: Params) => useQueries<HeroSectionApiResponse>([KEYS.HERO_SECTION.BASE, params], () => Get(URL_KEYS.HERO_SECTION.GET, params)),

  //*************** Work Count *********
  useGetWorkCount: (params?: Params) => useQueries<WorkCountApiResponse>([KEYS.WORK_COUNT.BASE, params], () => Get(URL_KEYS.WORK_COUNT.ALL, params)),

  //*************** Blog *********
  useGetBlog: (params?: Params) => useQueries<BlogApiResponse>([KEYS.BLOG.BASE, params], () => Get(URL_KEYS.BLOG.ALL, params)),

  //*************** Service *********
  useGetService: (params?: Params) => useQueries<ServiceApiResponse>([KEYS.SERVICE.BASE, params], () => Get(URL_KEYS.SERVICE.ALL, params)),

  //*************** Portfolio *********
  useGetPortfolio: (params?: Params) => useQueries<PortfolioApiResponse>([KEYS.PORTFOLIO.BASE, params], () => Get(URL_KEYS.PORTFOLIO.ALL, params)),

  //*************** Our Service *********
  useGetOurService: (params?: Params) => useQueries<OurServiceApiResponse>([KEYS.OUR_SERVICE.BASE, params], () => Get(URL_KEYS.OUR_SERVICE.ALL, params)),

  //*************** Client Logo *********
  useGetClientLogo: (params?: Params) => useQueries<ClientLogoApiResponse>([KEYS.CLIENT_LOGO.BASE, params], () => Get(URL_KEYS.CLIENT_LOGO.ALL, params)),

  //*************** Work Experience *********
  useGetWorkExperience: (params?: Params) => useQueries<WorkExperienceApiResponse>([KEYS.WORK_EXPERIENCE.BASE, params], () => Get(URL_KEYS.WORK_EXPERIENCE.ALL, params)),

  //*************** Skill *********
  useGetSkill: (params?: Params) => useQueries<SkillApiResponse>([KEYS.SKILL.BASE, params], () => Get(URL_KEYS.SKILL.ALL, params)),

  //*************** Awards *********
  useGetAwards: (params?: Params) => useQueries<AwardsApiResponse>([KEYS.AWARDS.BASE, params], () => Get(URL_KEYS.AWARDS.ALL, params)),
};
