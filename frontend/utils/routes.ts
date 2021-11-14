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

export const goAdminHospitals = (router: NextRouter) =>
  router.push('/admin/hospitals');
export const goAdminHospitalsNew = (router: NextRouter) =>
  router.push('/admin/hospitals/new');
export const goAdminHospitalsEdit = (
  router: NextRouter,
  { id }: { id: BigInt }
) => router.push(`/admin/hospitals/${id}/edit`);

export const goAdminMakers = (router: NextRouter) =>
  router.push('/admin/makers');
export const goAdminMakersNew = (router: NextRouter) =>
  router.push('/admin/makers/new');
export const goAdminMakersEdit = (router: NextRouter, { id }: { id: number }) =>
  router.push(`/admin/makers/${id}/edit`);
export const goAdminProducts = (router: NextRouter) =>
  router.push('/admin/products');

export const goHospitals = (router: NextRouter) => router.push('/hospitals');
export const goHospitalDetail = (router: NextRouter, { id }: { id: BigInt }) =>
  router.push(`/hospitals/${id}`);
