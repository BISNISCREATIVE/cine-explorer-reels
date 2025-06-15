
import React from "react";

interface CustomFilmIconProps {
  size?: number;
  className?: string;
}

/**
 * Ikon kamera film sesuai gambar terlampir.
 */
const CustomFilmIcon: React.FC<CustomFilmIconProps> = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Kamera film putih sesuai referensi */}
    <rect x="3" y="11" width="18" height="10" rx="3" fill="white" />
    <rect x="21" y="14" width="5" height="4" rx="2" fill="white" />
    <circle cx="7" cy="16" r="2" fill="#111" />
  </svg>
);

export default CustomFilmIcon;
