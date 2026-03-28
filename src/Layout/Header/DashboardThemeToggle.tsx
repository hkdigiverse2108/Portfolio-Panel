import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setToggleTheme } from "../../Store/Slices/LayoutSlice";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const DashboardThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { isToggleTheme } = useAppSelector((state) => state.layout);

  const toggleTheme = () => dispatch(setToggleTheme(isToggleTheme === "light" ? "dark" : "light"));

  return (
    <IconButton onClick={toggleTheme} className="text-gray-500! dark:text-gray-400! hover:bg-gray-100! dark:hover:bg-gray-800!">
      {isToggleTheme === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
    </IconButton>
  );
};

export default DashboardThemeToggle;
