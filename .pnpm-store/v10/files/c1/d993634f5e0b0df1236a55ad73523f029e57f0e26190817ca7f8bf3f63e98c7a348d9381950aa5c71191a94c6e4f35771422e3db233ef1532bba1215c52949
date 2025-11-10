'use client';

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import * as qs from 'qs-esm';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useFormModified } from '../../forms/Form/context.js';
import { FormSubmit } from '../../forms/Submit/index.js';
import { useHotkey } from '../../hooks/useHotkey.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useOperation } from '../../providers/Operation/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { traverseForLocalizedFields } from '../../utilities/traverseForLocalizedFields.js';
import { PopupList } from '../Popup/index.js';
import { ScheduleDrawer } from './ScheduleDrawer/index.js';
export function PublishButton({
  label: labelProp
}) {
  const {
    id,
    collectionSlug,
    docConfig,
    globalSlug,
    hasPublishedDoc,
    hasPublishPermission,
    setHasPublishedDoc,
    setMostRecentVersionIsAutosaved,
    setUnpublishedVersionCount,
    unpublishedVersionCount,
    uploadStatus
  } = useDocumentInfo();
  const {
    config,
    getEntityConfig
  } = useConfig();
  const {
    submit
  } = useForm();
  const modified = useFormModified();
  const editDepth = useEditDepth();
  const {
    code: localeCode
  } = useLocale();
  const {
    isModalOpen,
    toggleModal
  } = useModal();
  const drawerSlug = `schedule-publish-${id}`;
  const {
    localization,
    routes: {
      api
    },
    serverURL
  } = config;
  const {
    t
  } = useTranslation();
  const label = labelProp || t('version:publishChanges');
  const entityConfig = React.useMemo(() => {
    if (collectionSlug) {
      return getEntityConfig({
        collectionSlug
      });
    }
    if (globalSlug) {
      return getEntityConfig({
        globalSlug
      });
    }
  }, [collectionSlug, globalSlug, getEntityConfig]);
  const hasNewerVersions = unpublishedVersionCount > 0;
  const schedulePublish = typeof entityConfig?.versions?.drafts === 'object' && entityConfig?.versions?.drafts.schedulePublish;
  const canPublish = hasPublishPermission && (modified || hasNewerVersions || !hasPublishedDoc) && uploadStatus !== 'uploading';
  const scheduledPublishEnabled = Boolean(schedulePublish);
  // If autosave is enabled the modified will always be true so only conditionally check on modified state
  const hasAutosave = Boolean(typeof entityConfig?.versions?.drafts === 'object' && entityConfig?.versions?.drafts.autosave);
  const canSchedulePublish = Boolean(scheduledPublishEnabled && hasPublishPermission && (globalSlug || collectionSlug && id) && (hasAutosave || !modified));
  const [hasLocalizedFields, setHasLocalizedFields] = useState(false);
  useEffect(() => {
    const hasLocalizedField = traverseForLocalizedFields(entityConfig?.fields);
    setHasLocalizedFields(hasLocalizedField);
  }, [entityConfig?.fields]);
  const canPublishSpecificLocale = localization && hasLocalizedFields && hasPublishPermission;
  const operation = useOperation();
  const disabled = operation === 'update' && !modified;
  const saveDraft = useCallback(async () => {
    if (disabled) {
      return;
    }
    const search = `?locale=${localeCode}&depth=0&fallback-locale=null&draft=true`;
    let action;
    let method = 'POST';
    if (collectionSlug) {
      action = `${serverURL}${api}/${collectionSlug}${id ? `/${id}` : ''}${search}`;
      if (id) {
        method = 'PATCH';
      }
    }
    if (globalSlug) {
      action = `${serverURL}${api}/globals/${globalSlug}${search}`;
    }
    await submit({
      action,
      method,
      overrides: {
        _status: 'draft'
      },
      skipValidation: true
    });
  }, [submit, collectionSlug, globalSlug, serverURL, api, localeCode, id, disabled]);
  useHotkey({
    cmdCtrlKey: true,
    editDepth,
    keyCodes: ['s']
  }, e => {
    e.preventDefault();
    e.stopPropagation();
    if (saveDraft && docConfig.versions?.drafts && docConfig.versions?.drafts?.autosave) {
      void saveDraft();
    }
  });
  const publish = useCallback(async () => {
    if (uploadStatus === 'uploading') {
      return;
    }
    const result = await submit({
      overrides: {
        _status: 'published'
      }
    });
    if (result) {
      setUnpublishedVersionCount(0);
      setMostRecentVersionIsAutosaved(false);
      setHasPublishedDoc(true);
    }
  }, [setHasPublishedDoc, submit, setUnpublishedVersionCount, uploadStatus, setMostRecentVersionIsAutosaved]);
  const publishSpecificLocale = useCallback(async locale => {
    if (uploadStatus === 'uploading') {
      return;
    }
    const params = qs.stringify({
      depth: 0,
      publishSpecificLocale: locale
    });
    const action_0 = `${serverURL}${api}${globalSlug ? `/globals/${globalSlug}` : `/${collectionSlug}${id ? `/${id}` : ''}`}${params ? '?' + params : ''}`;
    const result_0 = await submit({
      action: action_0,
      overrides: {
        _status: 'published'
      }
    });
    if (result_0) {
      setHasPublishedDoc(true);
    }
  }, [api, collectionSlug, globalSlug, id, serverURL, setHasPublishedDoc, submit, uploadStatus]);
  const publishAll = !localization || localization && localization.defaultLocalePublishOption !== 'active';
  const activeLocale = localization && localization?.locales.find(locale_0 => typeof locale_0 === 'string' ? locale_0 === localeCode : locale_0.code === localeCode);
  const activeLocaleLabel = activeLocale && (typeof activeLocale.label === 'string' ? activeLocale.label : activeLocale.label?.[localeCode] ?? undefined);
  const defaultPublish = publishAll ? publish : () => publishSpecificLocale(activeLocale.code);
  const defaultLabel = publishAll ? label : t('version:publishIn', {
    locale: activeLocaleLabel
  });
  const secondaryPublish = publishAll ? () => publishSpecificLocale(activeLocale.code) : publish;
  const secondaryLabel = publishAll ? t('version:publishIn', {
    locale: activeLocaleLabel
  }) : t('version:publishAllLocales');
  if (!hasPublishPermission) {
    return null;
  }
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(FormSubmit, {
      buttonId: "action-save",
      disabled: !canPublish,
      enableSubMenu: canSchedulePublish,
      onClick: defaultPublish,
      size: "medium",
      SubMenuPopupContent: canPublishSpecificLocale || canSchedulePublish ? ({
        close
      }) => {
        return /*#__PURE__*/_jsxs(React.Fragment, {
          children: [canSchedulePublish && /*#__PURE__*/_jsx(PopupList.ButtonGroup, {
            children: /*#__PURE__*/_jsx(PopupList.Button, {
              id: "schedule-publish",
              onClick: () => [toggleModal(drawerSlug), close()],
              children: t('version:schedulePublish')
            })
          }, "schedule-publish"), canPublishSpecificLocale && /*#__PURE__*/_jsx(PopupList.ButtonGroup, {
            children: /*#__PURE__*/_jsx(PopupList.Button, {
              id: "publish-locale",
              onClick: secondaryPublish,
              children: secondaryLabel
            })
          })]
        });
      } : undefined,
      type: "button",
      children: localization ? defaultLabel : label
    }), canSchedulePublish && isModalOpen(drawerSlug) && /*#__PURE__*/_jsx(ScheduleDrawer, {
      defaultType: !hasNewerVersions ? 'unpublish' : 'publish',
      schedulePublishConfig: typeof schedulePublish === 'object' && schedulePublish,
      slug: drawerSlug
    })]
  });
}
//# sourceMappingURL=index.js.map