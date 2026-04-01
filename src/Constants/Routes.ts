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
  PORTFOLIO: {
    BASE: "/portfolio",
    ADD_EDIT: "/portfolio/add-edit",
  },
  OUR_SERVICE: {
    BASE: "/our-service",
    ADD_EDIT: "/our-service/add-edit",
  },
  CLIENT_LOGO: {
    BASE: "/client-logo",
    ADD_EDIT: "/client-logo/add-edit",
  },
  WORK_EXPERIENCE: {
    BASE: "/work-experience",
    ADD_EDIT: "/work-experience/add-edit",
  },
  SKILL: {
    BASE: "/skill",
    ADD_EDIT: "/skill/add-edit",
  },
  AWARDS: {
    BASE: "/awards",
    ADD_EDIT: "/awards/add-edit",
  },
} as const;
