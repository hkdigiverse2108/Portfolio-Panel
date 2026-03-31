import { KEYS, URL_KEYS } from "../Constants";
import type { AddWorkCountPayload, EditWorkCountPayload, ForgotPasswordPayload, LoginPayload, LoginResponse, MessageStatus, ResendOtpPayload, ResetPasswordPayload, UpdatePasswordPayload, UploadResponse, VerifyOtpPayload } from "../Types";
import type { AddHeroSectionPayload, EditHeroSectionPayload } from "../Types/HeroSection";
import type { UpdateUserPayload, UserApiResponse } from "../Types/User";
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
  useAddHeroSection: () => useMutations<AddHeroSectionPayload, void>([KEYS.HERO_SECTION.ADD, KEYS.HERO_SECTION.BASE], (input) => Post(URL_KEYS.HERO_SECTION.UPDATE, input)),
  useEditHeroSection: () => useMutations<EditHeroSectionPayload, void>([KEYS.HERO_SECTION.UPDATE, KEYS.HERO_SECTION.BASE], (input) => Put(URL_KEYS.HERO_SECTION.UPDATE, input)),
  useDeleteHeroSection: () => useMutations<string, void>([KEYS.HERO_SECTION.DELETE, KEYS.HERO_SECTION.BASE], (id) => Delete(`${URL_KEYS.HERO_SECTION.BASE}/${id}`)),

  //*************** Work Count *********
  useAddWorkCount: () => useMutations<AddWorkCountPayload, void>([KEYS.WORK_COUNT.ADD, KEYS.WORK_COUNT.BASE], (input) => Post(URL_KEYS.WORK_COUNT.ADD, input)),
  useEditWorkCount: () => useMutations<EditWorkCountPayload, void>([KEYS.WORK_COUNT.EDIT, KEYS.WORK_COUNT.BASE], (input) => Put(URL_KEYS.WORK_COUNT.EDIT, input)),
  useDeleteWorkCount: () => useMutations<string, void>([KEYS.WORK_COUNT.DELETE, KEYS.WORK_COUNT.BASE], (id) => Delete(`${URL_KEYS.WORK_COUNT.BASE}/${id}`)),
};
