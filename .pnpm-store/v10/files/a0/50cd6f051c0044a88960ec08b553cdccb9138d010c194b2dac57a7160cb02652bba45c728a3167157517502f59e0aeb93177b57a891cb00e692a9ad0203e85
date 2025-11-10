'use client';

import { c as _c } from "react/compiler-runtime";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, ConfirmationModal, toast, useModal, useTranslation } from '@payloadcms/ui';
import * as qs from 'qs-esm';
import { Fragment, useCallback } from 'react';
const confirmResetModalSlug = 'confirm-reset-modal';
export const ResetPreferences = t0 => {
  const $ = _c(9);
  const {
    apiRoute,
    user
  } = t0;
  const {
    openModal
  } = useModal();
  const {
    t
  } = useTranslation();
  let t1;
  if ($[0] !== apiRoute || $[1] !== user) {
    t1 = async () => {
      if (!user) {
        return;
      }
      const stringifiedQuery = qs.stringify({
        depth: 0,
        where: {
          user: {
            id: {
              equals: user.id
            }
          }
        }
      }, {
        addQueryPrefix: true
      });
      ;
      try {
        const res = await fetch(`${apiRoute}/payload-preferences${stringifiedQuery}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "DELETE"
        });
        const json = await res.json();
        const message = json.message;
        if (res.ok) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      } catch (t2) {
        const _err = t2;
      }
    };
    $[0] = apiRoute;
    $[1] = user;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  const handleResetPreferences = t1;
  let t2;
  if ($[3] !== openModal) {
    t2 = () => openModal(confirmResetModalSlug);
    $[3] = openModal;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  let t3;
  if ($[5] !== handleResetPreferences || $[6] !== t || $[7] !== t2) {
    t3 = _jsxs(Fragment, {
      children: [_jsx("div", {
        children: _jsx(Button, {
          buttonStyle: "secondary",
          onClick: t2,
          children: t("general:resetPreferences")
        })
      }), _jsx(ConfirmationModal, {
        body: t("general:resetPreferencesDescription"),
        confirmingLabel: t("general:resettingPreferences"),
        heading: t("general:resetPreferences"),
        modalSlug: confirmResetModalSlug,
        onConfirm: handleResetPreferences
      })]
    });
    $[5] = handleResetPreferences;
    $[6] = t;
    $[7] = t2;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  return t3;
};
//# sourceMappingURL=index.js.map