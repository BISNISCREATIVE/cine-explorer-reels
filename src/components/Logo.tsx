
import React from "react";

const Logo = ({ size = 40 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    aria-label="Movie Explorer logo"
  >
    <path
      d="M33.3334 9.99999H24.0234L27.845 6.17832L25.4884 3.82166L20 9.30999L14.5117 3.82166L12.155 6.17832L15.9767 9.99999H6.66671C4.82837 9.99999 3.33337 11.495 3.33337 13.3333V31.6667C3.33337 33.505 4.82837 35 6.66671 35H33.3334C35.1717 35 36.6667 33.505 36.6667 31.6667V13.3333C36.6667 11.495 35.1717 9.99999 33.3334 9.99999Z"
      fill="#FDFDFD"
    />
  </svg>
);

export default Logo;
