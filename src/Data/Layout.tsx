import { PAGE_TITLE, ROUTES } from "../Constants";
import type { NavItem } from "../Types";
import { GridViewRounded, Home, Person } from "@mui/icons-material";

export const NavItems: NavItem[] = [
  { icon: <GridViewRounded />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.DASHBOARD },
  { icon: <Person />, name: PAGE_TITLE.PROFILE.BASE, path: ROUTES.PROFILE.BASE },
  { icon: <Home />, name: PAGE_TITLE.HERO_SECTION.BASE, path: ROUTES.HERO_SECTION.BASE },
  { icon: <Home />, name: PAGE_TITLE.WORK_COUNT.BASE, path: ROUTES.WORK_COUNT.BASE },
];
