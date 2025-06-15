
import React from 'react';

interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const PlayIcon = ({ size = 24, className, ...props }: PlayIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10 8V16L16 12L10 8Z"
    />
  </svg>
);

export default PlayIcon;
