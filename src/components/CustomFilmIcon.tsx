
import React from "react";

interface CustomFilmIconProps {
  size?: number;
  className?: string;
}

/**
 * Ikon kamera film proporsional sesuai gambar/figma.
 */
const CustomFilmIcon: React.FC<CustomFilmIconProps> = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background circle */}
    <rect x="0" y="0" width="36" height="36" rx="8" fill="white" />
    {/* Kamera bodi */}
    <rect x="8" y="14" width="12" height="8" rx="2.5" fill="#111" />
    {/* Kamera lensa */}
    <rect x="22" y="17" width="5" height="4" rx="2" fill="#111" />
    {/* Lingkaran kecil */}
    <circle cx="12.5" cy="18" r="1.7" fill="white" />
  </svg>
);

export default CustomFilmIcon;
