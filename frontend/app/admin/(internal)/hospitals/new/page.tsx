import {
  HospitalBreadcrumbs,
  HOSPITAL_ROUTES,
} from '@/app/components/organisms/admin/hospitalBreadcrumbs/Index';
import { HospitalNewForm } from '@/app/components/organisms/admin/hospitalForm/HospitalNewForm';
import { css } from '@/styled/css';

export default function Page() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 'lg',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'xs',
        })}
      >
        <HospitalBreadcrumbs route={HOSPITAL_ROUTES.NEW} />
      </div>

      <HospitalNewForm />
    </div>
  );
}
