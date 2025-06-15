
import React from "react";

const InlineSpinner: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <div className="flex items-center justify-center" data-testid="inline-spinner">
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 70 70"
      fill="none"
    >
      <circle
        cx="35"
        cy="35"
        r="30"
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M65 35a30 30 0 1 1-60 0"
        stroke="#e53535"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

export default InlineSpinner;
