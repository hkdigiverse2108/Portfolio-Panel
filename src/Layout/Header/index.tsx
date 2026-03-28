import HeaderBrand from "./HeaderBrand";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 max-w-7xl mx-auto">
        {/* Left: Brand */}
        <HeaderBrand />

        {/* Center: Search Bar */}
        <HeaderSearch />

        {/* Right: Actions */}
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
