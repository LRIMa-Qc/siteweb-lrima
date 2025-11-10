'use client';

import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './index.scss';
export const JSONCell = ({
  cellData
}) => {
  const textToShow = cellData?.length > 100 ? `${cellData.substring(0, 100)}\u2026` : cellData;
  return /*#__PURE__*/_jsx("code", {
    className: "json-cell",
    children: /*#__PURE__*/_jsx("span", {
      children: JSON.stringify(textToShow)
    })
  });
};
//# sourceMappingURL=index.js.map