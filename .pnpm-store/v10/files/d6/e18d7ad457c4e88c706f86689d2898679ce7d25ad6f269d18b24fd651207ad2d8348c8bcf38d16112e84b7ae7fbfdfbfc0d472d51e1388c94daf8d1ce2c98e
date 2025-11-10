import { formatAdminURL } from 'payload/shared';
export const handleGoBack = ({
  adminRoute,
  collectionSlug,
  router
}) => {
  const redirectRoute = formatAdminURL({
    adminRoute,
    path: collectionSlug ? `/collections/${collectionSlug}` : '/'
  });
  router.push(redirectRoute);
};
//# sourceMappingURL=handleGoBack.js.map