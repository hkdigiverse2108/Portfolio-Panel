import { KEYS, URL_KEYS } from "../Constants";
import type { AppQueryOptions, AwardsApiResponse, BlogApiResponse, BusinessCategoryApiResponse, ClientLogoApiResponse, ContactUsApiResponse, HeroSectionApiResponse, MyAchievementApiResponse, OurServiceApiResponse, Params, PortfolioApiResponse, PrivacyPolicyApiResponse, ServiceApiResponse, SettingApiResponse, SkillApiResponse, TermsConditionsApiResponse, TestimonialApiResponse, TestimonialDescriptionApiResponse, UploadResponse, UserApiResponse, WorkCountApiResponse, WorkExperienceApiResponse } from "../Types";
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

  //*************** Business Category *********
  useGetBusinessCategory: (params?: Params) => useQueries<BusinessCategoryApiResponse>([KEYS.BUSINESS_CATEGORY.BASE, params], () => Get(URL_KEYS.BUSINESS_CATEGORY.ALL, params)),

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

  //*************** Testimonial *********
  useGetTestimonial: (params?: Params) => useQueries<TestimonialApiResponse>([KEYS.TESTIMONIAL.BASE, params], () => Get(URL_KEYS.TESTIMONIAL.ALL, params)),

  //*************** Contact Us *********
  useGetContactUs: (params?: Params) => useQueries<ContactUsApiResponse>([KEYS.CONTACT_US.BASE, params], () => Get(URL_KEYS.CONTACT_US.ALL, params)),

  //*************** My Achievement *********
  useGetMyAchievement: (params?: Params) => useQueries<MyAchievementApiResponse>([KEYS.MY_ACHIEVEMENT.BASE, params], () => Get(URL_KEYS.MY_ACHIEVEMENT.ALL, params)),

  //*************** Testimonial Description *********
  useGetTestimonialDescription: (params?: Params) => useQueries<TestimonialDescriptionApiResponse>([KEYS.TESTIMONIAL_DESCRIPTION.BASE, params], () => Get(URL_KEYS.TESTIMONIAL_DESCRIPTION.GET, params)),

  //*************** Privacy Policy *********
  useGetPrivacyPolicy: (params?: Params) => useQueries<PrivacyPolicyApiResponse>([KEYS.PRIVACY_POLICY.BASE, params], () => Get(URL_KEYS.PRIVACY_POLICY.GET, params)),

  //*************** Terms & Conditions *********
  useGetTermsConditions: (params?: Params) => useQueries<TermsConditionsApiResponse>([KEYS.TERMS_CONDITIONS.BASE, params], () => Get(URL_KEYS.TERMS_CONDITIONS.GET, params)),

  //*************** Setting *********
  useGetSetting: (params?: Params) => useQueries<SettingApiResponse>([KEYS.SETTING.BASE, params], () => Get(URL_KEYS.SETTING.GET, params)),
};
