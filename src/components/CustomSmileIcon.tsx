
import React from "react";

interface CustomSmileIconProps {
  size?: number;
  className?: string;
}

/**
 * Ikon smile kotak proporsional sesuai gambar/figma.
 */
const CustomSmileIcon: React.FC<CustomSmileIconProps> = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background kotak */}
    <rect x="0" y="0" width="36" height="36" rx="8" fill="white" />
    {/* Mulut */}
    <rect x="15" y="23" width="6" height="2" rx="1" fill="#111" />
    {/* Mata */}
    <rect x="13" y="15" width="2" height="2" rx="1" fill="#111" />
    <rect x="21" y="15" width="2" height="2" rx="1" fill="#111" />
  </svg>
);

export default CustomSmileIcon;
