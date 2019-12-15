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
      x="18"
      y="18"
      width="16"
      height="3"
      rx="1.5"
      transform="rotate(180 18 18)"
    />
    <rect
      x="18"
      y="11.6"
      width="16"
      height="3.2"
      rx="1.6"
      transform="rotate(180 18 11.6)"
    />
    <rect
      x="18"
      y="5"
      width="16"
      height="3"
      rx="1.5"
      transform="rotate(180 18 5)"
    />
  </svg>
);
