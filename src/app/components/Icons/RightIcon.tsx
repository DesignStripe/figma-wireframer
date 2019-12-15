import * as React from "react";

export default ({ color }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
  >
    <rect
      width="12"
      height="3"
      rx="1.5"
      transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 18 2)"
    />
    <rect
      width="16"
      height="3.2"
      rx="1.6"
      transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 18 8.39999)"
    />
    <rect
      width="6"
      height="3.2"
      rx="1.6"
      transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 18 14.8)"
    />
  </svg>
);
