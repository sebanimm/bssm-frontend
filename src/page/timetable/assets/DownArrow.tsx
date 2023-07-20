import SVGAttribute from "@/global/types/SVGAttribute.type";
import React from "react";

const DownArrow = ({ width, height }: SVGAttribute) => {
  return (
    <svg
      width={width ?? 41}
      height={height ?? 25}
      viewBox="0 0 41 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.3422 1.86615C38.7783 1.30239 38.0135 0.985684 37.2161 0.985684C36.4187 0.985684 35.654 1.30239 35.09 1.86615L20.2045 16.7517L5.31896 1.86615C4.7518 1.31836 3.99218 1.01526 3.2037 1.02211C2.41523 1.02896 1.66099 1.34522 1.10344 1.90278C0.545881 2.46033 0.229623 3.21457 0.222771 4.00304C0.21592 4.79152 0.519026 5.55114 1.06681 6.1183L18.0784 23.1299C18.6424 23.6937 19.4071 24.0104 20.2045 24.0104C21.0019 24.0104 21.7666 23.6937 22.3306 23.1299L39.3422 6.1183C39.906 5.55437 40.2227 4.78962 40.2227 3.99222C40.2227 3.19482 39.906 2.43008 39.3422 1.86615Z"
        fill="#727272"
      />
    </svg>
  );
};

export default DownArrow;
