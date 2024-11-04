import Link from 'next/link';
import { Icon } from '@/app/components/atoms/Icon';
import { Tag } from '@/app/components/atoms/Tag';
import { Typography } from '@/app/components/atoms/Typography';
import MapPinIcon from '@/assets/map_pin.svg';
import PhoneIcon from '@/assets/phone.svg';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import type { HospitalListItemFieldsFragment } from './listItem.api.generated';
import type { FC } from 'react';

type Props = {
  hospital: HospitalListItemFieldsFragment;
};

export const ListItem: FC<Props> = ({ hospital }) => (
  <li
    key={hospital.id}
    className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      borderTopWidth: 'thin',
      borderColor: 'outline.main',
      p: 'sm',
    })}
  >
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 'sm',
      })}
    >
      <div
        className={css({
          display: 'flex',
          gap: 'sm',
          alignItems: 'center',
        })}
      >
        <Link
          href={ADMIN_HOSPIALS_DETAIL_PATH(hospital.id)}
          className={css({
            textDecoration: 'underline',
          })}
        >
          <Typography variant="subhead" bold={true}>
            {hospital.name}
          </Typography>
        </Link>
      </div>
      <div
        className={flex({
          gap: 'sm',
          fill: 'background.on-main',
          alignItems: 'center',
        })}
      >
        <Icon source={<MapPinIcon />} width="16px" height="16px" />
        <Typography variant="body2">
          {hospital.hospitalAddress?.prefecture.name}
          {hospital.hospitalAddress?.address}
        </Typography>
      </div>
      <div
        className={flex({
          gap: 'sm',
          fill: 'background.on-main',
          alignItems: 'center',
        })}
      >
        <Icon source={<PhoneIcon />} width="16px" height="16px" />
        <Typography variant="body2">
          {hospital.hospitalAddress?.phone_number}
        </Typography>
      </div>
    </div>
    <div>{hospital.deleted ? <Tag>非公開</Tag> : <Tag>公開</Tag>}</div>
  </li>
);
