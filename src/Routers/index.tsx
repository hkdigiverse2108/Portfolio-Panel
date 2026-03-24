import { createBrowserRouter } from "react-router-dom";
import { PageRoutes } from "./PageRoutes";
import PublicRoutes from "./PublicRoutes";

export const Router = createBrowserRouter([
  {
    children: [
      {
        children: PageRoutes,
      },
    ],
  },
  {
    element: <PublicRoutes />,
    // children: AuthRoutes,
  },
]);
