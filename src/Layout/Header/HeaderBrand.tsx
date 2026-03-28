import { Link } from "react-router-dom";
import { ThemeTitle } from "../../Constants";

const HeaderBrand = () => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          PA
        </div>
        <span className="hidden sm:block">{ThemeTitle}</span>
      </Link>
    </div>
  );
};

export default HeaderBrand;
