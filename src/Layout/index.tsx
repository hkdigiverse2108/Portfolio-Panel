import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setIsMobile } from "../Store/Slices/LayoutSlice";


import Header from "./Header/index";

const Layout = () => {
  const dispatch = useDispatch();

  // const { user } = useAppSelector((state) => state.auth);
  // const {  } = Queries.useGetPermissionChildDetails({ userId: user?._id }, Boolean(user?._id));
  // const isAppLoading = userLoading || permissionLoading || companyLoading || companyFetching || adminSettingLoading;



  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch(setIsMobile(isMobile));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-dark transition-colors duration-300">
        <Header />
        <div className="w-full h-full flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
