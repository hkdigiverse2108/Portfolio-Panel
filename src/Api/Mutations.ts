import { KEYS, URL_KEYS } from "../Constants";
import type { AddAwardsPayload, AddBlogPayload, AddClientLogoPayload, AddContactUsPayload, AddMyAchievementPayload, AddOurServicePayload, AddPortfolioPayload, AddServicePayload, AddSkillPayload, AddTestimonialPayload, AddWorkCountPayload, AddWorkExperiencePayload, EditAwardsPayload, EditBlogPayload, EditClientLogoPayload, EditContactUsPayload, EditHeroSectionPayload, EditMyAchievementPayload, EditOurServicePayload, EditPortfolioPayload, EditServicePayload, EditSkillPayload, EditTestimonialPayload, EditWorkCountPayload, EditWorkExperiencePayload, ForgotPasswordPayload, LoginPayload, LoginResponse, MessageStatus, ResendOtpPayload, ResetPasswordPayload, UpdatePasswordPayload, UpdatePrivacyPolicyPayload, UpdateSettingPayload, UpdateTermsConditionsPayload, UpdateTestimonialDescriptionPayload, UpdateUserPayload, UploadResponse, UserApiResponse, VerifyOtpPayload } from "../Types";
import { Delete, Post, Put } from "./Methods";
import { useMutations } from "./ReactQuery";

export const Mutations = {
  // ************ Auth ***********
  useSignin: () => useMutations<LoginPayload, LoginResponse>([KEYS.AUTH.SIGNIN], (input) => Post(URL_KEYS.AUTH.SIGNIN, input, false)),

  useForgotPassword: () => useMutations<ForgotPasswordPayload, MessageStatus>([KEYS.AUTH.FORGOT_PASSWORD], (input) => Post(URL_KEYS.AUTH.FORGOT_PASSWORD, input, false)),

  useVerifyOtp: () => useMutations<VerifyOtpPayload, MessageStatus>([KEYS.AUTH.VERIFY_OTP], (input) => Post(URL_KEYS.AUTH.VERIFY_OTP, input, false)),

  useUpdatePassword: () => useMutations<UpdatePasswordPayload, MessageStatus>([KEYS.AUTH.RESET_PASSWORD], (input) => Post(URL_KEYS.AUTH.UPDATE_PASSWORD, input, false)),

  useResetPassword: () => useMutations<ResetPasswordPayload, MessageStatus>([KEYS.AUTH.RESET_PASSWORD], (input) => Post(URL_KEYS.AUTH.RESET_PASSWORD, input)),

  useResendOtp: () => useMutations<ResendOtpPayload, MessageStatus>([KEYS.AUTH.RESEND_OTP], (input) => Post(URL_KEYS.AUTH.RESEND_OTP, input, false)),

  // ************ User ***********
  // useUpdateUser: () => useMutations<UpdateUserPayload, UserApiResponse>([KEYS.USER.UPDATE, KEYS.USER.BASE], (input) => Put(URL_KEYS.USER.UPDATE, input)),
  useUpdateUser: () => useMutations<UpdateUserPayload, UserApiResponse>([KEYS.USER.UPDATE, KEYS.USER.BASE], (input) => Put(URL_KEYS.USER.UPDATE, input)),
  // ************ User ***********
  useUpdateProfile: () => useMutations<{ profileImage?: string }, MessageStatus>([KEYS.USER.UPDATE_PROFILE], (input) => Put(URL_KEYS.USER.UPDATE_PROFILE, input)),

  // ************ Upload ***********
  useUpload: () => useMutations<FormData, UploadResponse>([KEYS.UPLOAD.ADD, KEYS.UPLOAD.IMAGES, KEYS.UPLOAD.PDFS], (input) => Post(URL_KEYS.UPLOAD.ADD, input)),
  useDeleteUpload: () => useMutations<{ fileUrl: string }, void>([KEYS.UPLOAD.DELETE, KEYS.UPLOAD.IMAGES, KEYS.UPLOAD.PDFS], (id) => Delete(`${URL_KEYS.UPLOAD.DELETE}`, id)),

  //*************** Hero Section *********
  useEditHeroSection: () => useMutations<EditHeroSectionPayload, void>([KEYS.HERO_SECTION.UPDATE, KEYS.HERO_SECTION.BASE], (input) => Put(URL_KEYS.HERO_SECTION.UPDATE, input)),
  useDeleteHeroSection: () => useMutations<string, void>([KEYS.HERO_SECTION.DELETE, KEYS.HERO_SECTION.BASE], (id) => Delete(`${URL_KEYS.HERO_SECTION.BASE}/${id}`)),

  //*************** Work Count *********
  useAddWorkCount: () => useMutations<AddWorkCountPayload, void>([KEYS.WORK_COUNT.ADD, KEYS.WORK_COUNT.BASE], (input) => Post(URL_KEYS.WORK_COUNT.ADD, input)),
  useEditWorkCount: () => useMutations<EditWorkCountPayload, void>([KEYS.WORK_COUNT.EDIT, KEYS.WORK_COUNT.BASE], (input) => Put(URL_KEYS.WORK_COUNT.EDIT, input)),
  useDeleteWorkCount: () => useMutations<string, void>([KEYS.WORK_COUNT.DELETE, KEYS.WORK_COUNT.BASE], (id) => Delete(`${URL_KEYS.WORK_COUNT.BASE}/${id}`)),

  //*************** Blog *********
  useAddBlog: () => useMutations<AddBlogPayload, void>([KEYS.BLOG.ADD, KEYS.BLOG.BASE], (input) => Post(URL_KEYS.BLOG.ADD, input)),
  useEditBlog: () => useMutations<EditBlogPayload, void>([KEYS.BLOG.EDIT, KEYS.BLOG.BASE], (input) => Put(URL_KEYS.BLOG.EDIT, input)),
  useDeleteBlog: () => useMutations<string, void>([KEYS.BLOG.DELETE, KEYS.BLOG.BASE], (id) => Delete(`${URL_KEYS.BLOG.BASE}/${id}`)),

  //*************** Service *********
  useAddService: () => useMutations<AddServicePayload, void>([KEYS.SERVICE.ADD, KEYS.SERVICE.BASE], (input) => Post(URL_KEYS.SERVICE.ADD, input)),
  useEditService: () => useMutations<EditServicePayload, void>([KEYS.SERVICE.EDIT, KEYS.SERVICE.BASE], (input) => Put(URL_KEYS.SERVICE.EDIT, input)),
  useDeleteService: () => useMutations<string, void>([KEYS.SERVICE.DELETE, KEYS.SERVICE.BASE], (id) => Delete(`${URL_KEYS.SERVICE.BASE}/${id}`)),

  //*************** Portfolio *********
  useAddPortfolio: () => useMutations<AddPortfolioPayload, void>([KEYS.PORTFOLIO.ADD, KEYS.PORTFOLIO.BASE], (input) => Post(URL_KEYS.PORTFOLIO.ADD, input)),
  useEditPortfolio: () => useMutations<EditPortfolioPayload, void>([KEYS.PORTFOLIO.EDIT, KEYS.PORTFOLIO.BASE], (input) => Put(URL_KEYS.PORTFOLIO.EDIT, input)),
  useDeletePortfolio: () => useMutations<string, void>([KEYS.PORTFOLIO.DELETE, KEYS.PORTFOLIO.BASE], (id) => Delete(`${URL_KEYS.PORTFOLIO.BASE}/${id}`)),

  //*************** Our Service *********
  useAddOurService: () => useMutations<AddOurServicePayload, void>([KEYS.OUR_SERVICE.ADD, KEYS.OUR_SERVICE.BASE], (input) => Post(URL_KEYS.OUR_SERVICE.ADD, input)),
  useEditOurService: () => useMutations<EditOurServicePayload, void>([KEYS.OUR_SERVICE.EDIT, KEYS.OUR_SERVICE.BASE], (input) => Put(URL_KEYS.OUR_SERVICE.EDIT, input)),
  useDeleteOurService: () => useMutations<string, void>([KEYS.OUR_SERVICE.DELETE, KEYS.OUR_SERVICE.BASE], (id) => Delete(`${URL_KEYS.OUR_SERVICE.BASE}/${id}`)),

  //*************** Client Logo *********
  useAddClientLogo: () => useMutations<AddClientLogoPayload, void>([KEYS.CLIENT_LOGO.ADD, KEYS.CLIENT_LOGO.BASE], (input) => Post(URL_KEYS.CLIENT_LOGO.ADD, input)),
  useEditClientLogo: () => useMutations<EditClientLogoPayload, void>([KEYS.CLIENT_LOGO.EDIT, KEYS.CLIENT_LOGO.BASE], (input) => Put(URL_KEYS.CLIENT_LOGO.EDIT, input)),
  useDeleteClientLogo: () => useMutations<string, void>([KEYS.CLIENT_LOGO.DELETE, KEYS.CLIENT_LOGO.BASE], (id) => Delete(`${URL_KEYS.CLIENT_LOGO.BASE}/${id}`)),

  //*************** Work Experience *********
  useAddWorkExperience: () => useMutations<AddWorkExperiencePayload, void>([KEYS.WORK_EXPERIENCE.ADD, KEYS.WORK_EXPERIENCE.BASE], (input) => Post(URL_KEYS.WORK_EXPERIENCE.ADD, input)),
  useEditWorkExperience: () => useMutations<EditWorkExperiencePayload, void>([KEYS.WORK_EXPERIENCE.EDIT, KEYS.WORK_EXPERIENCE.BASE], (input) => Put(URL_KEYS.WORK_EXPERIENCE.EDIT, input)),
  useDeleteWorkExperience: () => useMutations<string, void>([KEYS.WORK_EXPERIENCE.DELETE, KEYS.WORK_EXPERIENCE.BASE], (id) => Delete(`${URL_KEYS.WORK_EXPERIENCE.BASE}/${id}`)),

  //*************** Skill *********
  useAddSkill: () => useMutations<AddSkillPayload, void>([KEYS.SKILL.ADD, KEYS.SKILL.BASE], (input) => Post(URL_KEYS.SKILL.ADD, input)),
  useEditSkill: () => useMutations<EditSkillPayload, void>([KEYS.SKILL.EDIT, KEYS.SKILL.BASE], (input) => Put(URL_KEYS.SKILL.EDIT, input)),
  useDeleteSkill: () => useMutations<string, void>([KEYS.SKILL.DELETE, KEYS.SKILL.BASE], (id) => Delete(`${URL_KEYS.SKILL.BASE}/${id}`)),

  //*************** Awards *********
  useAddAwards: () => useMutations<AddAwardsPayload, void>([KEYS.AWARDS.ADD, KEYS.AWARDS.BASE], (input) => Post(URL_KEYS.AWARDS.ADD, input)),
  useEditAwards: () => useMutations<EditAwardsPayload, void>([KEYS.AWARDS.EDIT, KEYS.AWARDS.BASE], (input) => Put(URL_KEYS.AWARDS.EDIT, input)),
  useDeleteAwards: () => useMutations<string, void>([KEYS.AWARDS.DELETE, KEYS.AWARDS.BASE], (id) => Delete(`${URL_KEYS.AWARDS.BASE}/${id}`)),

  //*************** Testimonial *********
  useAddTestimonial: () => useMutations<AddTestimonialPayload, void>([KEYS.TESTIMONIAL.ADD, KEYS.TESTIMONIAL.BASE], (input) => Post(URL_KEYS.TESTIMONIAL.ADD, input)),
  useEditTestimonial: () => useMutations<EditTestimonialPayload, void>([KEYS.TESTIMONIAL.EDIT, KEYS.TESTIMONIAL.BASE], (input) => Put(URL_KEYS.TESTIMONIAL.EDIT, input)),
  useDeleteTestimonial: () => useMutations<string, void>([KEYS.TESTIMONIAL.DELETE, KEYS.TESTIMONIAL.BASE], (id) => Delete(`${URL_KEYS.TESTIMONIAL.BASE}/${id}`)),

  //*************** Contact Us *********
  useAddContactUs: () => useMutations<AddContactUsPayload, void>([KEYS.CONTACT_US.ADD, KEYS.CONTACT_US.BASE], (input) => Post(URL_KEYS.CONTACT_US.ADD, input)),
  useEditContactUs: () => useMutations<EditContactUsPayload, void>([KEYS.CONTACT_US.EDIT, KEYS.CONTACT_US.BASE], (input) => Put(URL_KEYS.CONTACT_US.EDIT, input)),
  useDeleteContactUs: () => useMutations<string, void>([KEYS.CONTACT_US.DELETE, KEYS.CONTACT_US.BASE], (id) => Delete(`${URL_KEYS.CONTACT_US.BASE}/${id}`)),

  //*************** My Achievement *********
  useAddMyAchievement: () => useMutations<AddMyAchievementPayload, void>([KEYS.MY_ACHIEVEMENT.ADD, KEYS.MY_ACHIEVEMENT.BASE], (input) => Post(URL_KEYS.MY_ACHIEVEMENT.ADD, input)),
  useEditMyAchievement: () => useMutations<EditMyAchievementPayload, void>([KEYS.MY_ACHIEVEMENT.EDIT, KEYS.MY_ACHIEVEMENT.BASE], (input) => Put(URL_KEYS.MY_ACHIEVEMENT.EDIT, input)),
  useDeleteMyAchievement: () => useMutations<string, void>([KEYS.MY_ACHIEVEMENT.DELETE, KEYS.MY_ACHIEVEMENT.BASE], (id) => Delete(`${URL_KEYS.MY_ACHIEVEMENT.BASE}/${id}`)),

  //*************** Testimonial Description *********
  useUpdateTestimonialDescription: () => useMutations<UpdateTestimonialDescriptionPayload, void>([KEYS.TESTIMONIAL_DESCRIPTION.UPDATE, KEYS.TESTIMONIAL_DESCRIPTION.BASE], (input) => Put(URL_KEYS.TESTIMONIAL_DESCRIPTION.UPDATE, input)),

  //*************** Privacy Policy *********
  useUpdatePrivacyPolicy: () => useMutations<UpdatePrivacyPolicyPayload, void>([KEYS.PRIVACY_POLICY.UPDATE, KEYS.PRIVACY_POLICY.BASE], (input) => Put(URL_KEYS.PRIVACY_POLICY.UPDATE, input)),

  //*************** Terms & Conditions *********
  useUpdateTermsConditions: () => useMutations<UpdateTermsConditionsPayload, void>([KEYS.TERMS_CONDITIONS.UPDATE, KEYS.TERMS_CONDITIONS.BASE], (input) => Put(URL_KEYS.TERMS_CONDITIONS.UPDATE, input)),

  //*************** Setting *********
  useUpdateSetting: () => useMutations<UpdateSettingPayload, void>([KEYS.SETTING.UPDATE, KEYS.SETTING.BASE], (input) => Put(URL_KEYS.SETTING.UPDATE, input)),
};
