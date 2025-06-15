
import React from "react";

interface CustomFilmIconProps {
  size?: number;
  className?: string;
}

const CustomFilmIcon: React.FC<CustomFilmIconProps> = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="8"
      width="32"
      height="22"
      rx="5"
      stroke="white"
      strokeWidth="2.5"
      fill="none"
    />
    <rect x="10" y="15" width="18" height="8" rx="2" fill="white" />
    <circle cx="6.5" cy="11.5" r="1.5" fill="white" />
    <circle cx="6.5" cy="26.5" r="1.5" fill="white" />
    <circle cx="31.5" cy="11.5" r="1.5" fill="white" />
    <circle cx="31.5" cy="26.5" r="1.5" fill="white" />
  </svg>
);

export default CustomFilmIcon;
