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
  HERO_SECTION: {
    BASE: "/hero-section",
    GET: "/hero-section/get",
    UPDATE: "/hero-section/update",
  },
  WORK_COUNT: {
    BASE: "/work-count",
    ALL: "/work-count/all",
    ADD: "/work-count/add",
    EDIT: "/work-count/edit",
    DELETE: "/work-count/delete",
  },
  BLOG: {
    BASE: "/blog",
    ALL: "/blog/all",
    ADD: "/blog/add",
    EDIT: "/blog/edit",
    DELETE: "/blog/delete",
  },
  SERVICE: {
    BASE: "/service",
    ALL: "/service/all",
    ADD: "/service/add",
    EDIT: "/service/edit",
    DELETE: "/service/delete",
  },
  PORTFOLIO: {
    BASE: "/portfolio",
    ALL: "/portfolio/all",
    ADD: "/portfolio/add",
    EDIT: "/portfolio/edit",
    DELETE: "/portfolio/delete",
  },
  OUR_SERVICE: {
    BASE: "/our-service",
    ALL: "/our-service/all",
    ADD: "/our-service/add",
    EDIT: "/our-service/edit",
    DELETE: "/our-service/delete",
  },
  CLIENT_LOGO: {
    BASE: "/client-logo",
    ALL: "/client-logo/all",
    ADD: "/client-logo/add",
    EDIT: "/client-logo/edit",
    DELETE: "/client-logo/delete",
  },
} as const;
