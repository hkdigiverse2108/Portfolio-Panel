import { KEYS, URL_KEYS } from "../Constants";
import type { ForgotPasswordPayload, LoginPayload, LoginResponse, ResendOtpPayload, ResetPasswordPayload, UpdatePasswordPayload, VerifyOtpPayload } from "../Types";
import { Delete, Post, Put } from "./Methods";
import { useMutations } from "./ReactQuery";
import type { MessageStatus, UploadResponse } from "../Types/Common";
import type { UpdateUserPayload, UserApiResponse } from "../Types/User";

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
  useUpload: () => useMutations<FormData, UploadResponse>([KEYS.UPLOAD.ADD, KEYS.UPLOAD.ALL_IMAGE, KEYS.UPLOAD.ALL_PDF], (input) => Post(URL_KEYS.UPLOAD.ADD, input)),
  useDeleteUpload: () => useMutations<{ fileUrl: string }, void>([KEYS.UPLOAD.DELETE, KEYS.UPLOAD.ALL_IMAGE, KEYS.UPLOAD.ALL_PDF], (id) => Delete(`${URL_KEYS.UPLOAD.DELETE}`, id)),
};
