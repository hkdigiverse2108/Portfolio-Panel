import { useState } from "react";
import { Badge, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { NotificationsNoneOutlined, Search, PersonOutline, SettingsOutlined, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Store/hooks";
import { setSignOut } from "../../Store/Slices/AuthSlice";
import DashboardThemeToggle from "./DashboardThemeToggle";
import { ROUTES } from "../../Constants";

const HeaderActions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate(ROUTES.AUTH.SIGNIN, { replace: true });
    dispatch(setSignOut());
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* Mobile Search Icon */}
      <IconButton className="md:hidden text-gray-500! dark:text-gray-400!">
        <Search />
      </IconButton>

      <DashboardThemeToggle />

      <IconButton className="text-gray-500! dark:text-gray-400! hover:bg-gray-100! dark:hover:bg-gray-800!">
        <Badge badgeContent={3} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 16, height: 16 } }}>
          <NotificationsNoneOutlined />
        </Badge>
      </IconButton>

      {/* Profile Dropdown */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1"
      >
        <Avatar 
          alt="Admin User" 
          src="https://avatars.githubusercontent.com/u/1?v=4" 
          sx={{ width: 36, height: 36 }}
          className="border-2 border-white! dark:border-gray-700! shadow-sm"
        />
      </button>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          className: "mt-1.5 w-56 !rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg dark:shadow-none bg-white dark:bg-[#1a1a1a]",
        }}
      >
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Admin User</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">admin@portfolio.com</p>
        </div>
        
        <Divider className="dark:border-gray-800 my-1" />
        
        <MenuItem onClick={handleClose} className="!py-2.5 !text-sm dark:text-gray-200 dark:hover:bg-gray-800/50">
          <ListItemIcon>
            <PersonOutline fontSize="small" className="text-gray-500! dark:text-gray-400!" />
          </ListItemIcon>
          View Profile
        </MenuItem>
        
        <MenuItem onClick={handleClose} className="!py-2.5 !text-sm dark:text-gray-200 dark:hover:bg-gray-800/50">
          <ListItemIcon>
            <SettingsOutlined fontSize="small" className="text-gray-500! dark:text-gray-400!" />
          </ListItemIcon>
          Settings
        </MenuItem>
        
        <Divider className="dark:border-gray-800 my-1" />
        
        <MenuItem onClick={handleLogout} className="!py-2.5 !text-sm text-red-600! dark:text-red-400! dark:hover:bg-gray-800/50">
          <ListItemIcon>
            <Logout fontSize="small" className="text-red-600! dark:text-red-400!" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderActions;
