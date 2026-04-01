import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setIsMobile } from "../Store/Slices/LayoutSlice";
import { useAppSelector } from "../Store/hooks";
import Header from "./Header/index";
import Sidebar from "./Sidebar/index";
import { CommonUpload } from "../Components/Common";

const Layout = () => {
  const dispatch = useDispatch();
  const { isExpanded, isHovered } = useAppSelector((state) => state.layout);

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-dark transition-colors duration-300">
      {/* Header occupies full-width sticky-top */}
      <Header />

      <div className="flex flex-grow relative overflow-hidden">
        {/* Sidebar is fixed, so we need content padding if shown */}
        <Sidebar />

        {/* Main Content Area */}
        <main className={`flex-grow transition-all duration-300 relative w-full ${isExpanded || isHovered ? "lg:pl-[290px]" : "lg:pl-[90px]"}`}>
          <Outlet />
        </main>
      </div>
      <CommonUpload />
    </div>
  );
};

export default Layout;
