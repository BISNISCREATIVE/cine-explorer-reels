
import React from "react";

interface CustomFilmIconProps {
  size?: number;
  className?: string;
}

/**
 * Ikon kamera film persis sesuai gambar PNG referensi.
 */
const CustomFilmIcon: React.FC<CustomFilmIconProps> = ({ size = 36, className = "" }) => (
  <img
    src="/lovable-uploads/85b40f05-f7d3-4d33-9737-f49154139f4d.png"
    alt="Film"
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

export default CustomFilmIcon;

