import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  margin: auto 10px;
  width: auto;
`;

interface RemoveIconProps {
  color?: string;
  size: string;
}

const DefaultMenuItemIcon: React.FC<RemoveIconProps> = ({ color, size }) => {
  return (
    <SVG viewBox="0 0 512 512" height={size}>
      <g fill={color || "#000"}>
        <rect x="181" y="36.747" width="30" height="85" />
        <rect x="301" y="36.747" width="30" height="85" />
        <rect x="241" y="0.096" width="30" height="90" />
        <path
          d="M409.129,289.902c-37.347-37.346-85.933-59.361-138.129-62.909v-35.519h-30v35.519
        c-52.196,3.548-100.783,25.563-138.13,62.91c-37.346,37.347-59.361,85.933-62.909,138.129h432.078
        C468.491,375.836,446.476,327.248,409.129,289.902z"
        />
        <rect y="458.037" width="512" height="53.866" />
      </g>
    </SVG>
  );
};

export default DefaultMenuItemIcon;
