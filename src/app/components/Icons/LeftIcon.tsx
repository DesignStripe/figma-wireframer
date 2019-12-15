import * as React from "react";

export default ({ color }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
  >
    <rect x="2" y="2" width="12" height="3" rx="1.5" />
    <rect x="2" y="8.39999" width="16" height="3.2" rx="1.6" />
    <rect x="2" y="14.8" width="6" height="3.2" rx="1.6" />
  </svg>
);
