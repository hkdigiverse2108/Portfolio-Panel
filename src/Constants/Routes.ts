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
  PROFILE: {
    BASE: "/profile",
  },
  HERO_SECTION: {
    BASE: "/hero-section",
  },
  WORK_COUNT: {
    BASE: "/work-count",
    ADD_EDIT: "/work-count/add-edit",
  },
  BLOG: {
    BASE: "/blog",
    ADD_EDIT: "/blog/add-edit",
  },
  SERVICE: {
    BASE: "/service",
    ADD_EDIT: "/service/add-edit",
  },
} as const;
