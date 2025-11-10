'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { useSearchParams } from 'next/navigation.js';
import React, { createContext, use, useEffect, useRef, useState } from 'react';
import { findLocaleFromCode } from '../../utilities/findLocaleFromCode.js';
import { useAuth } from '../Auth/index.js';
import { useConfig } from '../Config/index.js';
import { usePreferences } from '../Preferences/index.js';
const LocaleContext = /*#__PURE__*/createContext({});
export const LocaleLoadingContext = /*#__PURE__*/createContext({
  localeIsLoading: false,
  setLocaleIsLoading: _ => undefined
});
const fetchPreferences = async (key, baseURL) => await fetch(`${baseURL}/payload-preferences/${key}`, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET'
})?.then(res => res.json());
export const LocaleProvider = t0 => {
  const $ = _c(27);
  const {
    children,
    locale: initialLocaleFromPrefs
  } = t0;
  const {
    config: t1
  } = useConfig();
  const {
    localization: t2,
    routes: t3,
    serverURL
  } = t1;
  const localization = t2 === undefined ? false : t2;
  const {
    api: apiRoute
  } = t3;
  const {
    user
  } = useAuth();
  const defaultLocale = localization ? localization.defaultLocale : "en";
  const {
    getPreference
  } = usePreferences();
  const t4 = useSearchParams();
  let t5;
  if ($[0] !== t4) {
    t5 = t4.get("locale");
    $[0] = t4;
    $[1] = t5;
  } else {
    t5 = $[1];
  }
  const localeFromParams = t5;
  let t6;
  if ($[2] !== defaultLocale || $[3] !== initialLocaleFromPrefs || $[4] !== localeFromParams || $[5] !== localization) {
    t6 = () => {
      if (!localization || localization && !localization.locales.length) {
        return {};
      }
      return findLocaleFromCode(localization, localeFromParams) || findLocaleFromCode(localization, initialLocaleFromPrefs) || findLocaleFromCode(localization, defaultLocale) || findLocaleFromCode(localization, localization.locales[0].code);
    };
    $[2] = defaultLocale;
    $[3] = initialLocaleFromPrefs;
    $[4] = localeFromParams;
    $[5] = localization;
    $[6] = t6;
  } else {
    t6 = $[6];
  }
  const [locale, setLocale] = React.useState(t6);
  const [isLoading, setLocaleIsLoading] = useState(false);
  const prevLocale = useRef(locale);
  let t7;
  let t8;
  if ($[7] !== locale) {
    t7 = () => {
      if (locale.code !== prevLocale.current.code) {
        setLocaleIsLoading(false);
      }
      prevLocale.current = locale;
    };
    t8 = [locale];
    $[7] = locale;
    $[8] = t7;
    $[9] = t8;
  } else {
    t7 = $[8];
    t8 = $[9];
  }
  useEffect(t7, t8);
  const fetchURL = `${serverURL}${apiRoute}`;
  let t9;
  if ($[10] !== defaultLocale || $[11] !== fetchURL || $[12] !== localeFromParams || $[13] !== localization || $[14] !== user?.id) {
    t9 = () => {
      const resetLocale = async function resetLocale() {
        if (localization && user?.id) {
          const localeToUse = localeFromParams || (await fetchPreferences("locale", fetchURL)?.then(_temp));
          const newLocale = findLocaleFromCode(localization, localeToUse) || findLocaleFromCode(localization, defaultLocale) || findLocaleFromCode(localization, localization?.locales?.[0]?.code);
          if (newLocale) {
            setLocale(newLocale);
          }
        }
      };
      resetLocale();
    };
    $[10] = defaultLocale;
    $[11] = fetchURL;
    $[12] = localeFromParams;
    $[13] = localization;
    $[14] = user?.id;
    $[15] = t9;
  } else {
    t9 = $[15];
  }
  const t10 = user?.id;
  let t11;
  if ($[16] !== defaultLocale || $[17] !== fetchURL || $[18] !== getPreference || $[19] !== localeFromParams || $[20] !== localization || $[21] !== t10) {
    t11 = [defaultLocale, getPreference, localization, fetchURL, localeFromParams, t10];
    $[16] = defaultLocale;
    $[17] = fetchURL;
    $[18] = getPreference;
    $[19] = localeFromParams;
    $[20] = localization;
    $[21] = t10;
    $[22] = t11;
  } else {
    t11 = $[22];
  }
  useEffect(t9, t11);
  let t12;
  if ($[23] !== children || $[24] !== isLoading || $[25] !== locale) {
    t12 = _jsx(LocaleContext, {
      value: locale,
      children: _jsx(LocaleLoadingContext, {
        value: {
          localeIsLoading: isLoading,
          setLocaleIsLoading
        },
        children
      })
    });
    $[23] = children;
    $[24] = isLoading;
    $[25] = locale;
    $[26] = t12;
  } else {
    t12 = $[26];
  }
  return t12;
};
export const useLocaleLoading = () => use(LocaleLoadingContext);
/**
 * TODO: V4
 * The return type of the `useLocale` hook will change in v4. It will return `null | Locale` instead of `false | {} | Locale`.
 */
export const useLocale = () => use(LocaleContext);
function _temp(res) {
  return res.value;
}
//# sourceMappingURL=index.js.map