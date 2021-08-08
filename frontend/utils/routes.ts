import { NextRouter } from 'next/router';

export const goAdminLogin = (router: NextRouter) => router.push('/admin/login');
export const goAdminInternalUsers = (router: NextRouter) =>
  router.push('/admin/internal_users');
export const goAdminInternalUserNew = (router: NextRouter) =>
  router.push('/admin/internal_users/new');
export const goAdminInternalUserEdit = (
  router: NextRouter,
  { id }: { id: number }
) => router.push(`/admin/internal_users/${id}/edit`);
