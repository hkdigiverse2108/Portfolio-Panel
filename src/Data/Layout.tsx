import { PAGE_TITLE, ROUTES } from "../Constants";
import type { NavItem } from "../Types";
import { BarChart, DesignServices, EditNote, GridViewRounded, Group, Home, MiscellaneousServices, Person, Psychology, Source, Work, WorkspacePremium } from "@mui/icons-material";

export const NavItems: NavItem[] = [
  { icon: <GridViewRounded />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.DASHBOARD },
  { icon: <Person />, name: PAGE_TITLE.PROFILE.BASE, path: ROUTES.PROFILE.BASE },
  { icon: <Home />, name: PAGE_TITLE.HERO_SECTION.BASE, path: ROUTES.HERO_SECTION.BASE },
  { icon: <BarChart />, name: PAGE_TITLE.WORK_COUNT.BASE, path: ROUTES.WORK_COUNT.BASE },
  { icon: <DesignServices />, name: PAGE_TITLE.SERVICE.BASE, path: ROUTES.SERVICE.BASE },
  { icon: <EditNote />, name: PAGE_TITLE.BLOG.BASE, path: ROUTES.BLOG.BASE },
  { icon: <Source />, name: PAGE_TITLE.PORTFOLIO.BASE, path: ROUTES.PORTFOLIO.BASE },
  { icon: <MiscellaneousServices />, name: PAGE_TITLE.OUR_SERVICE.BASE, path: ROUTES.OUR_SERVICE.BASE },
  { icon: <Group />, name: PAGE_TITLE.CLIENT_LOGO.BASE, path: ROUTES.CLIENT_LOGO.BASE },
  { icon: <Work />, name: PAGE_TITLE.WORK_EXPERIENCE.BASE, path: ROUTES.WORK_EXPERIENCE.BASE },
  { icon: <Psychology />, name: PAGE_TITLE.SKILL.BASE, path: ROUTES.SKILL.BASE },
  { icon: <WorkspacePremium />, name: PAGE_TITLE.AWARDS.BASE, path: ROUTES.AWARDS.BASE },
  { icon: <Home />, name: PAGE_TITLE.TESTIMONIAL.BASE, path: ROUTES.TESTIMONIAL.BASE },
  { icon: <Home />, name: PAGE_TITLE.TESTIMONIAL_DESCRIPTION.BASE, path: ROUTES.TESTIMONIAL_DESCRIPTION.BASE },
  { icon: <Home />, name: PAGE_TITLE.CONTACT_US.BASE, path: ROUTES.CONTACT_US.BASE },
  { icon: <Home />, name: PAGE_TITLE.MY_ACHIEVEMENT.BASE, path: ROUTES.MY_ACHIEVEMENT.BASE },
];
