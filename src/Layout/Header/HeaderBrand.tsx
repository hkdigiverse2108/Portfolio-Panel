import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setToggleMobileSidebar, setToggleSidebar } from "../../Store/Slices/LayoutSlice";
import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const HeaderBrand = () => {
  const dispatch = useAppDispatch();
  const { isExpanded } = useAppSelector((state) => state.layout);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      dispatch(setToggleSidebar());
    } else {
      dispatch(setToggleMobileSidebar());
    }
  };

  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <IconButton 
        onClick={handleToggle} 
        size="medium"
        className="text-gray-600! dark:text-gray-300! hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <MenuIcon className={`transition-transform duration-300 ${!isExpanded ? "rotate-180" : ""}`} />
      </IconButton>

      
      {/* <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 ml-1">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          PA
        </div>
        <span className="hidden sm:block">{ThemeTitle}</span>
      </Link> */}
    </div>
  );
};

export default HeaderBrand;

