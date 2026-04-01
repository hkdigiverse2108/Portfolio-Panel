import { PAGE_TITLE, ROUTES } from "../Constants";

export const BREADCRUMBS = {
  CHANGE_PASSWORD: {
    BASE: [{ label: PAGE_TITLE.SETTINGS.CHANGE_PASSWORD }],
  },
  PROFILE: {
    BASE: [{ label: PAGE_TITLE.PROFILE.BASE }],
  },
  HERO_SECTION: {
    BASE: [{ label: PAGE_TITLE.HERO_SECTION.BASE }],
  },
  WORK_COUNT: {
    BASE: [{ label: PAGE_TITLE.WORK_COUNT.BASE }],
  },
  BLOG: {
    BASE: [{ label: PAGE_TITLE.BLOG.BASE }],
    ADD: [{ label: PAGE_TITLE.BLOG.BASE, href: ROUTES.BLOG.BASE }, { label: PAGE_TITLE.BLOG.ADD }],
    EDIT: [{ label: PAGE_TITLE.BLOG.BASE, href: ROUTES.BLOG.BASE }, { label: PAGE_TITLE.BLOG.EDIT }],
  },
  SERVICE: {
    BASE: [{ label: PAGE_TITLE.SERVICE.BASE }],
    ADD: [{ label: PAGE_TITLE.SERVICE.BASE, href: ROUTES.SERVICE.BASE }, { label: PAGE_TITLE.SERVICE.ADD }],
    EDIT: [{ label: PAGE_TITLE.SERVICE.BASE, href: ROUTES.SERVICE.BASE }, { label: PAGE_TITLE.SERVICE.EDIT }],
  },
};
