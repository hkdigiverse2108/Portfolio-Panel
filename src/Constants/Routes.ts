export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ACCESS_DENIED: "/access-denied",
  AUTH: {
    SIGNIN: "/auth/signin",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
  },
  FORGOT_PASSWORD: {
    BASE: "/auth/forgot-password",
  },
  SETTINGS: {
    BASE: "/settings",
    CHANGE_PASSWORD: "/settings/change-password",
    ADMIN: "/settings/admin",
  },
} as const;
