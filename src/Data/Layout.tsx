import { PAGE_TITLE, ROUTES } from "../Constants";
import type { NavItem } from "../Types";
import {GridViewRounded } from "@mui/icons-material";

export const NavItems: NavItem[] = [
  { icon: <GridViewRounded />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.DASHBOARD },
];
