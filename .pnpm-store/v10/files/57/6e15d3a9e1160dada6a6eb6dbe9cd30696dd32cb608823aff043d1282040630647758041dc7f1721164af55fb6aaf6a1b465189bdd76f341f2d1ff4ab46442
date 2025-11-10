import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { Button, Card, Gutter, Locked } from '@payloadcms/ui';
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent';
import { EntityType } from '@payloadcms/ui/shared';
import { formatAdminURL } from 'payload/shared';
import React, { Fragment } from 'react';
const baseClass = 'dashboard';
export function DefaultDashboard(props) {
  const {
    globalData,
    i18n,
    i18n: {
      t
    },
    locale,
    navGroups,
    params,
    payload: {
      config: {
        admin: {
          components: {
            afterDashboard,
            beforeDashboard
          }
        },
        routes: {
          admin: adminRoute
        }
      }
    },
    payload,
    permissions,
    searchParams,
    user
  } = props;
  return /*#__PURE__*/_jsx("div", {
    className: baseClass,
    children: /*#__PURE__*/_jsxs(Gutter, {
      className: `${baseClass}__wrap`,
      children: [beforeDashboard && RenderServerComponent({
        Component: beforeDashboard,
        importMap: payload.importMap,
        serverProps: {
          i18n,
          locale,
          params,
          payload,
          permissions,
          searchParams,
          user
        }
      }), /*#__PURE__*/_jsx(Fragment, {
        children: !navGroups || navGroups?.length === 0 ? /*#__PURE__*/_jsx("p", {
          children: "no nav groups...."
        }) : navGroups.map(({
          entities,
          label
        }, groupIndex) => {
          return /*#__PURE__*/_jsxs("div", {
            className: `${baseClass}__group`,
            children: [/*#__PURE__*/_jsx("h2", {
              className: `${baseClass}__label`,
              children: label
            }), /*#__PURE__*/_jsx("ul", {
              className: `${baseClass}__card-list`,
              children: entities.map(({
                slug,
                type,
                label
              }, entityIndex) => {
                let title;
                let buttonAriaLabel;
                let createHREF;
                let href;
                let hasCreatePermission;
                let isLocked = null;
                let userEditing = null;
                if (type === EntityType.collection) {
                  title = getTranslation(label, i18n);
                  buttonAriaLabel = t('general:showAllLabel', {
                    label: title
                  });
                  href = formatAdminURL({
                    adminRoute,
                    path: `/collections/${slug}`
                  });
                  createHREF = formatAdminURL({
                    adminRoute,
                    path: `/collections/${slug}/create`
                  });
                  hasCreatePermission = permissions?.collections?.[slug]?.create;
                }
                if (type === EntityType.global) {
                  title = getTranslation(label, i18n);
                  buttonAriaLabel = t('general:editLabel', {
                    label: getTranslation(label, i18n)
                  });
                  href = formatAdminURL({
                    adminRoute,
                    path: `/globals/${slug}`
                  });
                  // Find the lock status for the global
                  const globalLockData = globalData.find(global => global.slug === slug);
                  if (globalLockData) {
                    isLocked = globalLockData.data._isLocked;
                    userEditing = globalLockData.data._userEditing;
                    // Check if the lock is expired
                    const lockDuration = globalLockData?.lockDuration;
                    const lastEditedAt = new Date(globalLockData.data?._lastEditedAt).getTime();
                    const lockDurationInMilliseconds = lockDuration * 1000;
                    const lockExpirationTime = lastEditedAt + lockDurationInMilliseconds;
                    if (new Date().getTime() > lockExpirationTime) {
                      isLocked = false;
                      userEditing = null;
                    }
                  }
                }
                return /*#__PURE__*/_jsx("li", {
                  children: /*#__PURE__*/_jsx(Card, {
                    actions: isLocked && user?.id !== userEditing?.id ? /*#__PURE__*/_jsx(Locked, {
                      className: `${baseClass}__locked`,
                      user: userEditing
                    }) : hasCreatePermission && type === EntityType.collection ? /*#__PURE__*/_jsx(Button, {
                      "aria-label": t('general:createNewLabel', {
                        label
                      }),
                      buttonStyle: "icon-label",
                      el: "link",
                      icon: "plus",
                      iconStyle: "with-border",
                      round: true,
                      to: createHREF
                    }) : undefined,
                    buttonAriaLabel: buttonAriaLabel,
                    href: href,
                    id: `card-${slug}`,
                    title: getTranslation(label, i18n),
                    titleAs: "h3"
                  })
                }, entityIndex);
              })
            })]
          }, groupIndex);
        })
      }), afterDashboard && RenderServerComponent({
        Component: afterDashboard,
        importMap: payload.importMap,
        serverProps: {
          i18n,
          locale,
          params,
          payload,
          permissions,
          searchParams,
          user
        }
      })]
    })
  });
}
//# sourceMappingURL=index.js.map