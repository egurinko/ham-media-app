import Link from 'next/link';
import { Card } from '@/app/components/atoms/Card';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import MapPin from '@/assets/map_pin.svg';
import Phone from '@/assets/phone.svg';
import { css } from '@/styled/css';
import { HOSPITALS_DETAIL_PATH } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  hospitalId: number;
  hospitalName: string;
  hospitalPhoneNumber: string;
  hospitalAddress: string;
};

export const HospitalMiniCard: FC<Props> = async ({
  hospitalId,
  hospitalName,
  hospitalPhoneNumber,
  hospitalAddress,
}) => (
  <Link href={HOSPITALS_DETAIL_PATH(hospitalId)}>
    <Card
      visual="outlined"
      className={css({
        width: '150px',
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 'md',
        my: 'md',
        _hover: {
          boxShadow: 'sm',
        },
      })}
    >
      <Typography
        variant="body2"
        className={css({
          lineClamp: 2,
        })}
        display="-webkit-box"
      >
        {hospitalName}
      </Typography>
      <div
        className={css({
          fill: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'xs',
          })}
        >
          <Icon source={<Phone />} width="12px" height="12px" />
          <Typography variant="caption">{hospitalPhoneNumber}</Typography>
        </div>
        <div
          className={css({
            display: '-webkit-box',
            lineClamp: 1,
          })}
        >
          <Icon source={<MapPin />} width="12px" height="12px" />
          <Typography
            variant="caption"
            className={css({
              ml: 'xs',
            })}
          >
            {hospitalAddress}
          </Typography>
        </div>
      </div>
    </Card>
  </Link>
);
