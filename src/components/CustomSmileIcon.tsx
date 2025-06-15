
import React from "react";

interface CustomSmileIconProps {
  size?: number;
  className?: string;
}

/**
 * Ikon wajah sesuai gambar terlampir.
 */
const CustomSmileIcon: React.FC<CustomSmileIconProps> = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wajah kotak putih */}
    <rect x="4" y="4" width="24" height="24" rx="7" fill="white" />
    {/* Mulut */}
    <rect x="13" y="19" width="6" height="2" rx="1" fill="#111" />
    {/* Mata */}
    <rect x="11" y="12" width="2" height="2" rx="1" fill="#111" />
    <rect x="19" y="12" width="2" height="2" rx="1" fill="#111" />
  </svg>
);

export default CustomSmileIcon;
