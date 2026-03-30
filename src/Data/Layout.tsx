import { PAGE_TITLE, ROUTES } from "../Constants";
import type { NavItem } from "../Types";
import { GridViewRounded, Settings } from "@mui/icons-material";

export const NavItems: NavItem[] = [
  { icon: <GridViewRounded />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.DASHBOARD },
  {
    name: PAGE_TITLE.SETTINGS.BASE,
    icon: <Settings />,
    children: [{ name: PAGE_TITLE.SETTINGS.ADMIN, path: ROUTES.SETTINGS.ADMIN, pro: false }],
  },
];
