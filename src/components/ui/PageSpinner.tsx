
import React from "react";

const PageSpinner: React.FC = () => (
  <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-70">
    <svg
      className="animate-spin"
      width="70"
      height="70"
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

export default PageSpinner;
