'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './index.scss';
const baseClass = 'popup-button';
export const PopupTrigger = props => {
  const $ = _c(24);
  const {
    active,
    button,
    buttonType,
    className,
    disabled,
    noBackground,
    setActive,
    size
  } = props;
  const t0 = `${baseClass}--${buttonType}`;
  const t1 = !noBackground && `${baseClass}--background`;
  const t2 = size && `${baseClass}--size-${size}`;
  const t3 = disabled && `${baseClass}--disabled`;
  let t4;
  if ($[0] !== className || $[1] !== t0 || $[2] !== t1 || $[3] !== t2 || $[4] !== t3) {
    t4 = [baseClass, className, t0, t1, t2, t3].filter(Boolean);
    $[0] = className;
    $[1] = t0;
    $[2] = t1;
    $[3] = t2;
    $[4] = t3;
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  const classes = t4.join(" ");
  let t5;
  if ($[6] !== active || $[7] !== setActive) {
    t5 = () => {
      setActive(!active);
    };
    $[6] = active;
    $[7] = setActive;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  const handleClick = t5;
  if (buttonType === "none") {
    return null;
  }
  if (buttonType === "custom") {
    let t6;
    if ($[9] !== handleClick) {
      t6 = e => {
        if (e.key === "Enter") {
          handleClick();
        }
      };
      $[9] = handleClick;
      $[10] = t6;
    } else {
      t6 = $[10];
    }
    let t7;
    if ($[11] !== button || $[12] !== classes || $[13] !== handleClick || $[14] !== t6) {
      t7 = _jsx("div", {
        className: classes,
        onClick: handleClick,
        onKeyDown: t6,
        role: "button",
        tabIndex: 0,
        children: button
      });
      $[11] = button;
      $[12] = classes;
      $[13] = handleClick;
      $[14] = t6;
      $[15] = t7;
    } else {
      t7 = $[15];
    }
    return t7;
  }
  let t6;
  if ($[16] !== handleClick) {
    t6 = e_0 => {
      if (e_0.key === "Enter") {
        handleClick();
      }
    };
    $[16] = handleClick;
    $[17] = t6;
  } else {
    t6 = $[17];
  }
  let t7;
  if ($[18] !== button || $[19] !== classes || $[20] !== disabled || $[21] !== handleClick || $[22] !== t6) {
    t7 = _jsx("button", {
      className: classes,
      disabled,
      onClick: handleClick,
      onKeyDown: t6,
      tabIndex: 0,
      type: "button",
      children: button
    });
    $[18] = button;
    $[19] = classes;
    $[20] = disabled;
    $[21] = handleClick;
    $[22] = t6;
    $[23] = t7;
  } else {
    t7 = $[23];
  }
  return t7;
};
//# sourceMappingURL=index.js.map