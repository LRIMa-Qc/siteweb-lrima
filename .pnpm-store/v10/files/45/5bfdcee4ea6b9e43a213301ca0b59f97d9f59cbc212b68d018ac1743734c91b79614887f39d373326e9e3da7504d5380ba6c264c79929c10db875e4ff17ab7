import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useSelection } from '../../providers/Selection/index.js';
// import { useTranslation } from '../../providers/Translation/index.js'
import { Pill } from '../Pill/index.js';
export const SelectMany = props => {
  const {
    onClick
  } = props;
  const {
    count,
    selected
  } = useSelection();
  // const { t } = useTranslation()
  if (!selected || !count) {
    return null;
  }
  return /*#__PURE__*/_jsx(Pill, {
    // className={`${baseClass}__toggle`}
    onClick: () => {
      if (typeof onClick === 'function') {
        onClick(selected);
      }
    },
    pillStyle: "white",
    size: "small",
    children: `Select ${count}`
  });
};
//# sourceMappingURL=index.js.map