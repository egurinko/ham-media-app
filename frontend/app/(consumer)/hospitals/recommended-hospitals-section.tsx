import Link from 'next/link';
import { HospitalMiniCard } from '@/app/(consumer)/hospitals/hospital-mini-card';
import { Card } from '@/app/components/atoms/Card';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import { getHospitalConnection } from '@/app/utils/api/publicApi/getHospitalConnection';
import ChevronRightIcon from '@/assets/chevron_right.svg';
import StarIcon from '@/assets/star.svg';
import { css } from '@/styled/css';
import { HOSPITALS_RESULT_PATH } from '@/utils/routes';
import type { FC } from 'react';

export const RecommendedHospitalsSection: FC<NoProps> = async () => {
  const { data } = await getHospitalConnection({
    first: 100,
    searchText: '',
    reservable: false,
    nightServiceOption: false,
    insuranceEnabled: false,
    jsavaOption: false,
    nichijuOption: false,
    recommended: true,
  });

  return (
    <Card
      className={css({
        width: '100%',
        p: 'lg',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}
        >
          <Icon source={<StarIcon />} width={20} height={20} />
          <Typography variant="subhead" bold={true}>
            ハムメディアおすすめ病院
          </Typography>
        </div>
        <Link href={`${HOSPITALS_RESULT_PATH}?recommended=true`}>
          <div className={css({ display: 'flex', alignItems: 'center' })}>
            詳しくみる
            <Icon source={<ChevronRightIcon />} width={15} height={15} />
          </div>
        </Link>
      </div>

      <div
        className={css({
          display: 'flex',
          gap: 'md',
          overflowX: 'scroll',
        })}
      >
        {data.publicHospitalConnection?.edges
          ?.filter((edge) => !!edge?.node)
          .map((edge) => {
            if (!edge?.node) return null;
            const hospital = edge.node;

            return (
              <HospitalMiniCard
                key={hospital.id}
                hospitalId={hospital.id}
                hospitalName={hospital.name}
                hospitalAddress={`${hospital.hospitalAddress?.prefecture.name}${hospital.hospitalAddress?.address}`}
                hospitalPhoneNumber={
                  hospital.hospitalAddress?.phone_number || ''
                }
              />
            );
          })}
      </div>
    </Card>
  );
};
