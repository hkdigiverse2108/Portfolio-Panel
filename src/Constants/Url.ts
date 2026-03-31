export const URL_KEYS = {
  AUTH: {
    SIGNIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    UPDATE_PASSWORD: "/auth/update-password",
    RESEND_OTP: "/auth/resend-otp",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USER: {
    UPDATE_PROFILE: "/user/profile",
    UPDATE: "/user/update",
    BASE: "/user",
    GET: "/user/get",
  },
  DASHBOARD: {
    BASE: "/dashboard",
  },

  UPLOAD: {
    ADD: "/upload",
    DELETE: "/upload/delete",
    IMAGES: "/upload/images",
    PDFS: "/upload/pdfs",
  },
} as const;
