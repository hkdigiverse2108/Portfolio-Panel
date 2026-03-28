import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setIsMobile } from "../Store/Slices/LayoutSlice";



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
      <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-dark transition-colors duration-300">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
