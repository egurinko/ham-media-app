import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { StockRequestNewForm } from '@/app/components/organisms/admin/stockRequestNewForm/Index';
import { css } from '@/styled/css';
import { ADMIN_STOCK_REQUESTS_PATH } from '@/utils/routes';

export default async function Page() {
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
        <Breadcrumbs
          breadcrumbs={[
            { title: '在庫リクエスト一覧', href: ADMIN_STOCK_REQUESTS_PATH },
            { title: '在庫リクエスト' },
          ]}
        />
      </div>

      <StockRequestNewForm />
    </div>
  );
}
