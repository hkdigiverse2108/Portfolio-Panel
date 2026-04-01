import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../Constants";
import type { UserBase } from "../../Types";
import { Storage } from "../../Utils";

type LayoutState = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  isHovered: boolean;
  isApplicationMenuOpen: boolean;
  openSubmenu: string | null;
  isToggleTheme: string;
  user: UserBase | null;
};

const storedTheme = Storage.getItem(STORAGE_KEYS.THEME) || "light";

// Apply the initial theme class immediately
if (storedTheme === "dark") document.documentElement.classList.add("dark");
else document.documentElement.classList.remove("dark");

const initialState: LayoutState = {
  isExpanded: true,
  isMobileOpen: false,
  isMobile: false,
  isHovered: false,
  isApplicationMenuOpen: false,
  openSubmenu: null,
  isToggleTheme: storedTheme,
  user: null,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
      if (!action.payload) {
        state.isMobileOpen = false;
      }
    },
    setToggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    setSidebarOpen: (state, action) => {
      state.isExpanded = action.payload;
    },
    setToggleMobileSidebar: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },

    setIsHovered: (state, action) => {
      state.isHovered = action.payload;
    },

    setApplicationMenuOpen: (state) => {
      state.isApplicationMenuOpen = !state.isApplicationMenuOpen;
    },

    setToggleSubmenu: (state, action) => {
      state.openSubmenu = state.openSubmenu === action.payload ? null : action.payload;
    },
    setToggleTheme: (state, action) => {
      state.isToggleTheme = action.payload;
      Storage.setItem(STORAGE_KEYS.THEME, action.payload);
      if (action.payload === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    },
  },
});

export const { setUser, setIsMobile, setToggleSidebar, setToggleMobileSidebar, setIsHovered, setApplicationMenuOpen, setToggleSubmenu, setToggleTheme, setSidebarOpen } = layoutSlice.actions;

export default layoutSlice.reducer;
