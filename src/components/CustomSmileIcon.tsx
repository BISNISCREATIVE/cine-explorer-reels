
import React from "react";

interface CustomSmileIconProps {
  size?: number;
  className?: string;
}

/**
 * Ikon smile age limit persis sesuai gambar PNG referensi.
 */
const CustomSmileIcon: React.FC<CustomSmileIconProps> = ({ size = 36, className = "" }) => (
  <img
    src="/lovable-uploads/1318ec9e-8f2b-411b-b6bc-c9bd85e88a17.png"
    alt="Smile"
    style={{
      width: size,
      height: size,
      display: 'block',
      objectFit: 'contain'
    }}
    className={className}
    draggable={false}
  />
);

export default CustomSmileIcon;

