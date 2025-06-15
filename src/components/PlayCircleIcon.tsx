
import React from "react";

interface PlayCircleIconProps {
  size?: number;
}

/**
 * Ikon lingkaran putih dengan segitiga (play) hitam di tengah,
 * didesain mirip dengan referensi yang diberikan user.
 */
const PlayCircleIcon: React.FC<PlayCircleIconProps> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="24" cy="24" r="24" fill="#fff" />
    <polygon
      points="19,15.5 19,32.5 33.5,24"
      fill="#191919"
    />
  </svg>
);

export default PlayCircleIcon;
