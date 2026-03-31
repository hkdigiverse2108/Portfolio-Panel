import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { AuthRoutes, PageRoutes } from "./PageRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import NotFound from "../Pages/NotFound";

export const Router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: PageRoutes,
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: AuthRoutes,
  },
  { path: "*", element: <NotFound /> },
]);
