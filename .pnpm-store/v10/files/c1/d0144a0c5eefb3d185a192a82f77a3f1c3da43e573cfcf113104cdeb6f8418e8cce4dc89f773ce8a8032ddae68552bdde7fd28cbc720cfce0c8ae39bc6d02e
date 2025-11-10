'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { tabHasName, toKebabCase } from 'payload/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { useCollapsible } from '../../elements/Collapsible/provider.js';
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js';
import { useFormFields } from '../../forms/Form/index.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { usePreferences } from '../../providers/Preferences/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { fieldBaseClass } from '../shared/index.js';
import { TabsProvider } from './provider.js';
import { TabComponent } from './Tab/index.js';
import './index.scss';
const baseClass = 'tabs-field';
export { TabsProvider };
function generateTabPath({
  activeTabConfig,
  path
}) {
  let tabPath = path;
  if (tabHasName(activeTabConfig) && activeTabConfig.name) {
    if (path) {
      tabPath = `${path}.${activeTabConfig.name}`;
    } else {
      tabPath = activeTabConfig.name;
    }
  }
  return tabPath;
}
const TabsFieldComponent = props => {
  const $ = _c(59);
  const {
    field: t0,
    forceRender: t1,
    indexPath: t2,
    parentPath: t3,
    parentSchemaPath: t4,
    path: t5,
    permissions,
    readOnly
  } = props;
  const {
    admin: t6,
    tabs: t7
  } = t0;
  let t8;
  if ($[0] !== t6) {
    t8 = t6 === undefined ? {} : t6;
    $[0] = t6;
    $[1] = t8;
  } else {
    t8 = $[1];
  }
  const {
    className
  } = t8;
  let t9;
  if ($[2] !== t7) {
    t9 = t7 === undefined ? [] : t7;
    $[2] = t7;
    $[3] = t9;
  } else {
    t9 = $[3];
  }
  const tabs = t9;
  const forceRender = t1 === undefined ? false : t1;
  const indexPath = t2 === undefined ? "" : t2;
  const parentPath = t3 === undefined ? "" : t3;
  const parentSchemaPath = t4 === undefined ? "" : t4;
  const path = t5 === undefined ? "" : t5;
  const {
    getPreference,
    setPreference
  } = usePreferences();
  const {
    preferencesKey
  } = useDocumentInfo();
  const {
    i18n
  } = useTranslation();
  const {
    isWithinCollapsible
  } = useCollapsible();
  let t10;
  if ($[4] !== tabs) {
    t10 = t11 => {
      const [fields] = t11;
      return tabs.map((tab, index) => {
        const id = tab?.id;
        return {
          index,
          passesCondition: fields?.[id]?.passesCondition ?? true,
          tab
        };
      });
    };
    $[4] = tabs;
    $[5] = t10;
  } else {
    t10 = $[5];
  }
  const tabStates = useFormFields(t10);
  let t11;
  if ($[6] !== tabStates) {
    t11 = () => tabStates.filter(_temp)?.[0]?.index ?? 0;
    $[6] = tabStates;
    $[7] = t11;
  } else {
    t11 = $[7];
  }
  const [activeTabIndex, setActiveTabIndex] = useState(t11);
  const tabsPrefKey = `tabs-${indexPath}`;
  let t12;
  if ($[8] !== activeTabIndex || $[9] !== parentPath || $[10] !== tabs) {
    t12 = () => generateTabPath({
      activeTabConfig: tabs[activeTabIndex],
      path: parentPath
    });
    $[8] = activeTabIndex;
    $[9] = parentPath;
    $[10] = tabs;
    $[11] = t12;
  } else {
    t12 = $[11];
  }
  const [activeTabPath, setActiveTabPath] = useState(t12);
  let t13;
  if ($[12] !== parentSchemaPath || $[13] !== tabs[0]) {
    t13 = () => generateTabPath({
      activeTabConfig: tabs[0],
      path: parentSchemaPath
    });
    $[12] = parentSchemaPath;
    $[13] = tabs[0];
    $[14] = t13;
  } else {
    t13 = $[14];
  }
  const [activeTabSchemaPath, setActiveTabSchemaPath] = useState(t13);
  let t14;
  if ($[15] !== activeTabIndex || $[16] !== activeTabPath || $[17] !== parentPath || $[18] !== tabs) {
    t14 = tabHasName(tabs[activeTabIndex]) ? activeTabPath : parentPath;
    $[15] = activeTabIndex;
    $[16] = activeTabPath;
    $[17] = parentPath;
    $[18] = tabs;
    $[19] = t14;
  } else {
    t14 = $[19];
  }
  const activePathChildrenPath = t14;
  const activeTabInfo = tabStates[activeTabIndex];
  const activeTabConfig = activeTabInfo?.tab;
  let t15;
  if ($[20] !== activeTabIndex || $[21] !== activeTabSchemaPath || $[22] !== parentSchemaPath || $[23] !== tabs) {
    t15 = tabHasName(tabs[activeTabIndex]) ? activeTabSchemaPath : parentSchemaPath;
    $[20] = activeTabIndex;
    $[21] = activeTabSchemaPath;
    $[22] = parentSchemaPath;
    $[23] = tabs;
    $[24] = t15;
  } else {
    t15 = $[24];
  }
  const activePathSchemaChildrenPath = t15;
  const activeTabDescription = activeTabConfig.admin?.description ?? activeTabConfig.description;
  const activeTabStaticDescription = typeof activeTabDescription === "function" ? activeTabDescription({
    i18n,
    t: i18n.t
  }) : activeTabDescription;
  const hasVisibleTabs = tabStates.some(_temp2);
  let t16;
  if ($[25] !== getPreference || $[26] !== parentPath || $[27] !== parentSchemaPath || $[28] !== path || $[29] !== preferencesKey || $[30] !== setPreference || $[31] !== tabs || $[32] !== tabsPrefKey) {
    t16 = async incomingTabIndex => {
      setActiveTabIndex(incomingTabIndex);
      setActiveTabPath(generateTabPath({
        activeTabConfig: tabs[incomingTabIndex],
        path: parentPath
      }));
      setActiveTabSchemaPath(generateTabPath({
        activeTabConfig: tabs[incomingTabIndex],
        path: parentSchemaPath
      }));
      const existingPreferences = await getPreference(preferencesKey);
      if (preferencesKey) {
        setPreference(preferencesKey, {
          ...existingPreferences,
          ...(path ? {
            fields: {
              ...(existingPreferences?.fields || {}),
              [path]: {
                ...existingPreferences?.fields?.[path],
                tabIndex: incomingTabIndex
              }
            }
          } : {
            fields: {
              ...existingPreferences?.fields,
              [tabsPrefKey]: {
                ...existingPreferences?.fields?.[tabsPrefKey],
                tabIndex: incomingTabIndex
              }
            }
          })
        });
      }
    };
    $[25] = getPreference;
    $[26] = parentPath;
    $[27] = parentSchemaPath;
    $[28] = path;
    $[29] = preferencesKey;
    $[30] = setPreference;
    $[31] = tabs;
    $[32] = tabsPrefKey;
    $[33] = t16;
  } else {
    t16 = $[33];
  }
  const handleTabChange = t16;
  let t17;
  let t18;
  if ($[34] !== getPreference || $[35] !== parentPath || $[36] !== parentSchemaPath || $[37] !== path || $[38] !== preferencesKey || $[39] !== tabs || $[40] !== tabsPrefKey) {
    t17 = () => {
      if (preferencesKey) {
        const getInitialPref = async () => {
          const existingPreferences_0 = await getPreference(preferencesKey);
          const initialIndex = path ? existingPreferences_0?.fields?.[path]?.tabIndex : existingPreferences_0?.fields?.[tabsPrefKey]?.tabIndex;
          const newIndex = initialIndex || 0;
          setActiveTabIndex(newIndex);
          setActiveTabPath(generateTabPath({
            activeTabConfig: tabs[newIndex],
            path: parentPath
          }));
          setActiveTabSchemaPath(generateTabPath({
            activeTabConfig: tabs[newIndex],
            path: parentSchemaPath
          }));
        };
        getInitialPref();
      }
    };
    t18 = [path, getPreference, preferencesKey, tabsPrefKey, tabs, parentPath, parentSchemaPath];
    $[34] = getPreference;
    $[35] = parentPath;
    $[36] = parentSchemaPath;
    $[37] = path;
    $[38] = preferencesKey;
    $[39] = tabs;
    $[40] = tabsPrefKey;
    $[41] = t17;
    $[42] = t18;
  } else {
    t17 = $[41];
    t18 = $[42];
  }
  useEffect(t17, t18);
  let t19;
  if ($[43] !== activeTabInfo?.passesCondition || $[44] !== handleTabChange || $[45] !== tabStates) {
    t19 = () => {
      if (activeTabInfo?.passesCondition === false) {
        const nextTab = tabStates.find(_temp3);
        if (nextTab) {
          handleTabChange(nextTab.index);
        }
      }
    };
    $[43] = activeTabInfo?.passesCondition;
    $[44] = handleTabChange;
    $[45] = tabStates;
    $[46] = t19;
  } else {
    t19 = $[46];
  }
  let t20;
  if ($[47] !== activeTabInfo || $[48] !== handleTabChange || $[49] !== tabStates) {
    t20 = [activeTabInfo, tabStates, handleTabChange];
    $[47] = activeTabInfo;
    $[48] = handleTabChange;
    $[49] = tabStates;
    $[50] = t20;
  } else {
    t20 = $[50];
  }
  useEffect(t19, t20);
  const t21 = isWithinCollapsible && `${baseClass}--within-collapsible`;
  const t22 = !hasVisibleTabs && `${baseClass}--hidden`;
  let t23;
  if ($[51] !== className || $[52] !== t21 || $[53] !== t22) {
    t23 = [fieldBaseClass, className, baseClass, t21, t22].filter(Boolean);
    $[51] = className;
    $[52] = t21;
    $[53] = t22;
    $[54] = t23;
  } else {
    t23 = $[54];
  }
  let t24;
  if ($[55] !== activeTabIndex || $[56] !== handleTabChange || $[57] !== path) {
    t24 = t25 => {
      const {
        index: index_0,
        passesCondition: passesCondition_2,
        tab: tab_0
      } = t25;
      return _jsx(TabComponent, {
        hidden: !passesCondition_2,
        isActive: activeTabIndex === index_0,
        parentPath: path,
        setIsActive: () => {
          handleTabChange(index_0);
        },
        tab: tab_0
      }, index_0);
    };
    $[55] = activeTabIndex;
    $[56] = handleTabChange;
    $[57] = path;
    $[58] = t24;
  } else {
    t24 = $[58];
  }
  return _jsx("div", {
    className: t23.join(" "),
    children: _jsxs(TabsProvider, {
      children: [_jsx("div", {
        className: `${baseClass}__tabs-wrap`,
        children: _jsx("div", {
          className: `${baseClass}__tabs`,
          children: tabStates.map(t24)
        })
      }), _jsx("div", {
        className: `${baseClass}__content-wrap`,
        children: activeTabConfig && _jsx(TabContent, {
          description: activeTabStaticDescription,
          fields: activeTabConfig.fields,
          forceRender,
          hidden: false,
          parentIndexPath: tabHasName(activeTabConfig) ? "" : `${indexPath ? indexPath + "-" : ""}` + String(activeTabInfo.index),
          parentPath: activePathChildrenPath,
          parentSchemaPath: activePathSchemaChildrenPath,
          path: activeTabPath,
          permissions: permissions && typeof permissions === "object" && "name" in activeTabConfig ? permissions[activeTabConfig.name] && typeof permissions[activeTabConfig.name] === "object" && "fields" in permissions[activeTabConfig.name] ? permissions[activeTabConfig.name].fields : permissions[activeTabConfig.name] : permissions,
          readOnly
        })
      })]
    })
  });
};
export const TabsField = withCondition(TabsFieldComponent);
function TabContent(t0) {
  const $ = _c(21);
  const {
    description,
    fields,
    forceRender,
    hidden,
    label,
    parentIndexPath,
    parentPath,
    parentSchemaPath,
    permissions,
    readOnly
  } = t0;
  const {
    i18n
  } = useTranslation();
  const {
    customComponents: t1,
    path
  } = useField();
  let t2;
  let t3;
  if ($[0] !== description || $[1] !== fields || $[2] !== forceRender || $[3] !== hidden || $[4] !== i18n || $[5] !== label || $[6] !== parentIndexPath || $[7] !== parentPath || $[8] !== parentSchemaPath || $[9] !== path || $[10] !== permissions || $[11] !== readOnly || $[12] !== t1) {
    t3 = Symbol.for("react.early_return_sentinel");
    bb0: {
      const {
        AfterInput,
        BeforeInput,
        Description,
        Field
      } = t1 === undefined ? {} : t1;
      if (Field) {
        t3 = Field;
        break bb0;
      }
      const t4 = hidden && `${baseClass}__tab--hidden`;
      let t5;
      if ($[15] !== i18n || $[16] !== label) {
        t5 = label && `${baseClass}__tabConfigLabel-${toKebabCase(getTranslation(label, i18n))}`;
        $[15] = i18n;
        $[16] = label;
        $[17] = t5;
      } else {
        t5 = $[17];
      }
      let t6;
      if ($[18] !== t4 || $[19] !== t5) {
        t6 = [t4, `${baseClass}__tab`, t5].filter(Boolean);
        $[18] = t4;
        $[19] = t5;
        $[20] = t6;
      } else {
        t6 = $[20];
      }
      t2 = _jsxs("div", {
        className: t6.join(" "),
        children: [_jsx(RenderCustomComponent, {
          CustomComponent: Description,
          Fallback: _jsx(FieldDescription, {
            description,
            marginPlacement: "bottom",
            path
          })
        }), BeforeInput, _jsx(RenderFields, {
          fields,
          forceRender,
          parentIndexPath,
          parentPath,
          parentSchemaPath,
          permissions,
          readOnly
        }), AfterInput]
      });
    }
    $[0] = description;
    $[1] = fields;
    $[2] = forceRender;
    $[3] = hidden;
    $[4] = i18n;
    $[5] = label;
    $[6] = parentIndexPath;
    $[7] = parentPath;
    $[8] = parentSchemaPath;
    $[9] = path;
    $[10] = permissions;
    $[11] = readOnly;
    $[12] = t1;
    $[13] = t2;
    $[14] = t3;
  } else {
    t2 = $[13];
    t3 = $[14];
  }
  if (t3 !== Symbol.for("react.early_return_sentinel")) {
    return t3;
  }
  return t2;
}
function _temp(t0) {
  const {
    passesCondition
  } = t0;
  return passesCondition;
}
function _temp2(t0) {
  const {
    passesCondition: passesCondition_0
  } = t0;
  return passesCondition_0;
}
function _temp3(t0) {
  const {
    passesCondition: passesCondition_1
  } = t0;
  return passesCondition_1;
}
//# sourceMappingURL=index.js.map