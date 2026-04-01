import { PAGE_TITLE, ROUTES } from "../Constants";
import type { NavItem } from "../Types";
import { BarChart, EditNote, GridViewRounded, Home, MiscellaneousServices, Person, Source } from "@mui/icons-material";

export const NavItems: NavItem[] = [
  { icon: <GridViewRounded />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.DASHBOARD },
  { icon: <Person />, name: PAGE_TITLE.PROFILE.BASE, path: ROUTES.PROFILE.BASE },
  { icon: <Home />, name: PAGE_TITLE.HERO_SECTION.BASE, path: ROUTES.HERO_SECTION.BASE },
  { icon: <BarChart />, name: PAGE_TITLE.WORK_COUNT.BASE, path: ROUTES.WORK_COUNT.BASE },
  { icon: <MiscellaneousServices />, name: PAGE_TITLE.SERVICE.BASE, path: ROUTES.SERVICE.BASE },
  { icon: <EditNote />, name: PAGE_TITLE.BLOG.BASE, path: ROUTES.BLOG.BASE },
  { icon: <Source />, name: PAGE_TITLE.PORTFOLIO.BASE, path: ROUTES.PORTFOLIO.BASE },
  { icon: <Home />, name: PAGE_TITLE.OUR_SERVICE.BASE, path: ROUTES.OUR_SERVICE.BASE },
  { icon: <Home />, name: PAGE_TITLE.CLIENT_LOGO.BASE, path: ROUTES.CLIENT_LOGO.BASE },
  { icon: <Home />, name: PAGE_TITLE.WORK_EXPERIENCE.BASE, path: ROUTES.WORK_EXPERIENCE.BASE },
  { icon: <Home />, name: PAGE_TITLE.SKILL.BASE, path: ROUTES.SKILL.BASE },
  { icon: <Home />, name: PAGE_TITLE.AWARDS.BASE, path: ROUTES.AWARDS.BASE },
];
