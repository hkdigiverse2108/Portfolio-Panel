import { PAGE_TITLE, ROUTES } from "../Constants";
import type { NavItem } from "../Types";
import { GridViewRounded, Person } from "@mui/icons-material";

export const NavItems: NavItem[] = [
  { icon: <GridViewRounded />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.DASHBOARD },
  { icon: <Person />, name: PAGE_TITLE.PROFILE.BASE, path: ROUTES.PROFILE.BASE },
];
