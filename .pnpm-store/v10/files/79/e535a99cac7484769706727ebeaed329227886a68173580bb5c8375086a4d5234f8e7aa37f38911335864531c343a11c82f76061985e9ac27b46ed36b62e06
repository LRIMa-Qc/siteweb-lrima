import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HydrateAuthProvider, SetStepNav } from '@payloadcms/ui';
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent';
import { EntityType, groupNavItems } from '@payloadcms/ui/shared';
import React, { Fragment } from 'react';
import { DefaultDashboard } from './Default/index.js';
const globalLockDurationDefault = 300;
export async function DashboardView(props) {
  const {
    locale,
    permissions,
    req: {
      i18n,
      payload: {
        config
      },
      payload,
      user
    },
    req,
    visibleEntities
  } = props.initPageResult;
  const collections = config.collections.filter(collection => permissions?.collections?.[collection.slug]?.read && visibleEntities.collections.includes(collection.slug));
  const globals = config.globals.filter(global => permissions?.globals?.[global.slug]?.read && visibleEntities.globals.includes(global.slug));
  // Query locked global documents only if there are globals in the config
  let globalData = [];
  if (config.globals.length > 0) {
    const lockedDocuments = await payload.find({
      collection: 'payload-locked-documents',
      depth: 1,
      overrideAccess: false,
      pagination: false,
      req,
      select: {
        globalSlug: true,
        updatedAt: true,
        user: true
      },
      where: {
        globalSlug: {
          exists: true
        }
      }
    });
    // Map over globals to include `lockDuration` and lock data for each global slug
    globalData = config.globals.map(global => {
      const lockDuration = typeof global.lockDocuments === 'object' ? global.lockDocuments.duration : globalLockDurationDefault;
      const lockedDoc = lockedDocuments.docs.find(doc => doc.globalSlug === global.slug);
      return {
        slug: global.slug,
        data: {
          _isLocked: !!lockedDoc,
          _lastEditedAt: lockedDoc?.updatedAt ?? null,
          _userEditing: lockedDoc?.user?.value ?? null
        },
        lockDuration
      };
    });
  }
  const navGroups = groupNavItems([...(collections.map(collection => {
    const entityToGroup = {
      type: EntityType.collection,
      entity: collection
    };
    return entityToGroup;
  }) ?? []), ...(globals.map(global => {
    const entityToGroup = {
      type: EntityType.global,
      entity: global
    };
    return entityToGroup;
  }) ?? [])], permissions, i18n);
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [/*#__PURE__*/_jsx(HydrateAuthProvider, {
      permissions: permissions
    }), /*#__PURE__*/_jsx(SetStepNav, {
      nav: []
    }), RenderServerComponent({
      clientProps: {
        locale
      },
      Component: config.admin?.components?.views?.dashboard?.Component,
      Fallback: DefaultDashboard,
      importMap: payload.importMap,
      serverProps: {
        ...props,
        globalData,
        i18n,
        locale,
        navGroups,
        payload,
        permissions,
        user,
        visibleEntities
      }
    })]
  });
}
//# sourceMappingURL=index.js.map