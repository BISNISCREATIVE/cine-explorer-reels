
import React from "react";

interface CustomSmileIconProps {
  size?: number;
  className?: string;
}

const CustomSmileIcon: React.FC<CustomSmileIconProps> = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="19"
      cy="19"
      r="16"
      stroke="white"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M25 21c-1.3 2-5.7 2-7 0"
      stroke="white"
      strokeWidth="2.3"
      strokeLinecap="round"
    />
    <circle cx="14" cy="16" r="1.6" fill="white" />
    <circle cx="24" cy="16" r="1.6" fill="white" />
  </svg>
);

export default CustomSmileIcon;
