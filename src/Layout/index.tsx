import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";
import { setIsMobile } from "../Store/Slices/LayoutSlice";
import { Queries } from "../Api";
import Loader from "./Loader";


const Layout = () => {
  const { isExpanded, isMobileOpen, isApplicationMenuOpen } = useAppSelector((state) => state.layout);
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const {  } = Queries.useGetPermissionChildDetails({ userId: user?._id }, Boolean(user?._id));
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
      <Loader loading={true} />
      <div className="min-h-screen xl:flex overflow-hidden">
        <div className={`flex-1 transition-all duration-300 ease-linear ${isApplicationMenuOpen ? "pt-30 xsm:pt-35" : "pt-16"} lg:pt-[78px] ${isExpanded ? "lg:ml-[290px]" : "lg:ml-[90px]"} ${isMobileOpen ? "ml-0" : ""}`}>
          <div className="mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
