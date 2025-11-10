'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { slugify } from 'payload/shared';
import React, { useCallback, useState } from 'react';
import { Button } from '../../elements/Button/index.js';
import { useForm } from '../../forms/Form/index.js';
import { useField } from '../../forms/useField/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { TextInput } from '../Text/index.js';
import './index.scss';
/**
 * @experimental This component is experimental and may change or be removed in the future. Use at your own risk.
 */
export const SlugField = t0 => {
  const $ = _c(18);
  const {
    field,
    fieldToUse,
    path,
    readOnly: readOnlyFromProps
  } = t0;
  const {
    label
  } = field;
  const t1 = path || field.name;
  let t2;
  if ($[0] !== t1) {
    t2 = {
      path: t1
    };
    $[0] = t1;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const {
    setValue,
    value
  } = useField(t2);
  const {
    getDataByPath
  } = useForm();
  const [isLocked, setIsLocked] = useState(true);
  let t3;
  if ($[2] !== fieldToUse || $[3] !== getDataByPath || $[4] !== setValue || $[5] !== value) {
    t3 = e => {
      e.preventDefault();
      const targetFieldValue = getDataByPath(fieldToUse);
      if (targetFieldValue) {
        const formattedSlug = slugify(targetFieldValue);
        if (value !== formattedSlug) {
          setValue(formattedSlug);
        }
      } else {
        if (value !== "") {
          setValue("");
        }
      }
    };
    $[2] = fieldToUse;
    $[3] = getDataByPath;
    $[4] = setValue;
    $[5] = value;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  const handleGenerate = t3;
  let t4;
  if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = e_0 => {
      e_0.preventDefault();
      setIsLocked(_temp);
    };
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  const toggleLock = t4;
  const t5 = `field-${path}`;
  let t6;
  if ($[8] !== field.name || $[9] !== handleGenerate || $[10] !== isLocked || $[11] !== label || $[12] !== path || $[13] !== readOnlyFromProps || $[14] !== setValue || $[15] !== t5 || $[16] !== value) {
    t6 = _jsxs("div", {
      className: "field-type slug-field-component",
      children: [_jsxs("div", {
        className: "label-wrapper",
        children: [_jsx(FieldLabel, {
          htmlFor: t5,
          label
        }), !isLocked && _jsx(Button, {
          buttonStyle: "none",
          className: "lock-button",
          onClick: handleGenerate,
          children: "Generate"
        }), _jsx(Button, {
          buttonStyle: "none",
          className: "lock-button",
          onClick: toggleLock,
          children: isLocked ? "Unlock" : "Lock"
        })]
      }), _jsx(TextInput, {
        onChange: setValue,
        path: path || field.name,
        readOnly: Boolean(readOnlyFromProps || isLocked),
        value
      })]
    });
    $[8] = field.name;
    $[9] = handleGenerate;
    $[10] = isLocked;
    $[11] = label;
    $[12] = path;
    $[13] = readOnlyFromProps;
    $[14] = setValue;
    $[15] = t5;
    $[16] = value;
    $[17] = t6;
  } else {
    t6 = $[17];
  }
  return t6;
};
function _temp(prev) {
  return !prev;
}
//# sourceMappingURL=index.js.map