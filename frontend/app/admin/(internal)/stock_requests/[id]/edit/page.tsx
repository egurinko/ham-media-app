import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { StockRequestEditForm } from '@/app/components/organisms/admin/stockRequestEditForm/Index';
import { StockRequestReview } from '@/app/components/organisms/admin/stockRequestReview/Index';
import { css } from '@/styled/css';
import { ADMIN_STOCK_REQUESTS_PATH } from '@/utils/routes';
import { getStockRequest } from './page.api';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const stockRequestId = Number((await params).id);
  const stockRequest = await getStockRequest({
    id: stockRequestId,
  });

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
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <Breadcrumbs
          breadcrumbs={[
            { title: '在庫リクエスト一覧', href: ADMIN_STOCK_REQUESTS_PATH },
            { title: '在庫リクエスト編集' },
          ]}
        />
        <div>
          <StockRequestReview id={stockRequestId} submitType="reject" />
          <StockRequestReview id={stockRequestId} submitType="approve" />
        </div>
      </div>
      <StockRequestEditForm stockRequest={stockRequest} />
    </div>
  );
}
