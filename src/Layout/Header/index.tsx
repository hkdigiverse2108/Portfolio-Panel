import HeaderBrand from "./HeaderBrand";
import HeaderActions from "./HeaderActions";

import { useAppSelector } from "../../Store/hooks";

const Header = () => {
  const { isExpanded, isHovered } = useAppSelector((state) => state.layout);
  return (
    <header className={`sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 ${isExpanded || isHovered ? "lg:ml-72.5 lg:w-[calc(100%-290px)]" : "lg:ml-22.5 lg:w-[calc(100%-90px)]"}`}>
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 w-full">
        {/* Left: Brand */}
        <HeaderBrand />

        {/* Right: Actions */}
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
