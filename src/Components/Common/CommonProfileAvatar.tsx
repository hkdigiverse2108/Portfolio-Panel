import { type FC } from "react";
import { useTheme } from "@mui/material/styles";
import type { CommonProfileAvatarProps } from "../../Types";

const CommonProfileAvatar: FC<CommonProfileAvatarProps> = ({ fullName, profileImage, className }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const nameWords = fullName?.trim()?.split(/\s+/) || [];

  const firstInitial = nameWords?.[0]?.charAt(0) || "";
  const lastInitial = nameWords?.length > 1 ? nameWords[nameWords.length - 1]?.charAt(0) : "";

  const profileInitials = (firstInitial + lastInitial).toUpperCase();

  const bgClass = isLight ? "bg-black" : "bg-brand-500";
  const textClass = isLight ? "text-white" : "text-black";

  return <div className={`flex items-center justify-center rounded-full ${bgClass} ${textClass} overflow-hidden ${className}`}>{profileImage ? <img src={profileImage} alt="profile" className="w-full h-full object-cover" /> : <span className="font-semibold">{profileInitials}</span>}</div>;
};

export default CommonProfileAvatar;
