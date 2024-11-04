import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import {
  ADMIN_HOSPIALS_PATH,
  ADMIN_HOSPIALS_DETAIL_PATH,
} from '@/utils/routes';
import { getHospital } from './index.api';
import type { FC } from 'react';

type Props = {
  id?: number;
  route: HospitalRoute;
};

export const HOSPITAL_ROUTES = {
  INDEX: 'index',
  NEW: 'new',
  DETAIL: 'detail',
  EDIT: 'edit',
  ADDRESS_EDIT: 'addressEdit',
  BUSINESS_FORM_EDIT: 'businessFormEdit',
  INTERNAL_REPUTATION_EDIT: 'internalReputationEdit',
  RESERVATION_STATUS_EDIT: 'reservationStatusEdit',
  NIGHT_SERVICE_OPTION_EDIT: 'nightServiceOptionEdit',
  NIGHT_URGENT_ACTION_OPTION_EDIT: 'nightUrgentActionEdit',
  CERTIFICATION_OPTION_EDIT: 'certificationOptionEdit',
} as const;

type HospitalRoute = ValueOf<typeof HOSPITAL_ROUTES>;

export const HospitalBreadcrumbs: FC<Props> = async ({ id, route }) => {
  if (!id) {
    if (route === HOSPITAL_ROUTES.INDEX) {
      return <Breadcrumbs breadcrumbs={[{ title: '病院一覧' }]} />;
    } else if (route === HOSPITAL_ROUTES.NEW) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            { title: '病院登録' },
          ]}
        />
      );
    }
  } else {
    const { data } = await getHospital({ id });
    const { hospital } = data;
    if (route === HOSPITAL_ROUTES.DETAIL) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            { title: hospital.name },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '編集',
            },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.ADDRESS_EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '住所編集',
            },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.BUSINESS_FORM_EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '営業形態編集',
            },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.INTERNAL_REPUTATION_EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '内部評価編集',
            },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.RESERVATION_STATUS_EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '予約形態編集',
            },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.NIGHT_SERVICE_OPTION_EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '夜間営業編集',
            },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.NIGHT_URGENT_ACTION_OPTION_EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '夜間緊急編集',
            },
          ]}
        />
      );
    } else if (route === HOSPITAL_ROUTES.CERTIFICATION_OPTION_EDIT) {
      return (
        <Breadcrumbs
          breadcrumbs={[
            { title: '病院一覧', href: ADMIN_HOSPIALS_PATH },
            {
              title: hospital.name,
              href: ADMIN_HOSPIALS_DETAIL_PATH(hospital.id),
            },
            {
              title: '認定編集',
            },
          ]}
        />
      );
    }
  }
  return <></>;
};
