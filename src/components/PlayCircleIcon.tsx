
import React from "react";

interface PlayCircleIconProps {
  size?: number;
}

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
    <polygon points="19,16 19,32 33,24" fill="#191919" />
  </svg>
);

export default PlayCircleIcon;
