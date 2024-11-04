import Link from 'next/link';
import { Button } from '@/app/components/atoms/Button';
import { Card } from '@/app/components/atoms/Card';
import { Icon } from '@/app/components/atoms/Icon';
import { Switch } from '@/app/components/atoms/Switch';
import { Typography } from '@/app/components/atoms/Typography';
import { HospitalMap } from '@/app/components/molecules/HospitalMap';
import LinkIcon from '@/assets/link.svg';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import {
  ADMIN_HOSPIALS_EDIT_PATH,
  ADMIN_HOSPIALS_ADDRESS_EDIT_PATH,
  ADMIN_HOSPIALS_BUSINESS_FORM_EDIT_PATH,
  ADMIN_HOSPIALS_INTERNAL_REPUTATION_FORM_EDIT_PATH,
  ADMIN_HOSPIALS_RESERVATION_STATUS_EDIT_PATH,
  ADMIN_HOSPIALS_NIGHT_SERVICE_OPTION_EDIT_PATH,
  ADMIN_HOSPIALS_NIGHT_URGENT_ACTION_OPTION_EDIT_PATH,
  ADMIN_HOSPIALS_CERTIFICATION_OPTION_EDIT_PATH,
  HOSPITALS_DETAIL_PATH,
} from '@/utils/routes';
import { AddressUpdate } from './AddressUpdate';
import { getHospital } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalDetail: FC<Props> = async ({ id }) => {
  const { data } = await getHospital({ id });
  const { hospital } = data;

  return (
    <>
      <Card
        className={css({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            基本情報
            <Link
              href={HOSPITALS_DETAIL_PATH(hospital.id)}
              className={css({ ml: 'sm' })}
            >
              <Icon source={<LinkIcon />} width="20px" height="20px" />
            </Link>
          </Typography>
          <Link href={ADMIN_HOSPIALS_EDIT_PATH(hospital.id)}>
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div
          className={stack({
            gap: 'lg',
          })}
        >
          <div>
            <Typography variant="body1" bold={true}>
              病院名
            </Typography>
            <Typography variant="body1">{hospital.name}</Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              URL
            </Typography>
            <Typography variant="body1">{hospital.url || 'なし'}</Typography>
          </div>
          <div>
            <Switch defaultChecked={!hospital.deleted} disabled={true}>
              公開状態
            </Switch>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              内部メモ
            </Typography>
            <Typography variant="body1">
              {hospital.internal_memo || 'なし'}
            </Typography>
          </div>
        </div>
      </Card>
      <Card
        className={stack({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            住所情報
          </Typography>
          <Link href={ADMIN_HOSPIALS_ADDRESS_EDIT_PATH(hospital.id)}>
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div>
          <div>
            <Typography variant="body1" bold={true}>
              都道府県
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalAddress?.prefecture.name}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              住所（都道府県以降）
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalAddress?.address}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              電話番号
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalAddress?.phone_number || 'なし'}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              緯度/経度
              {hospital.hospitalAddress?.id && (
                <AddressUpdate
                  hospitalAddressId={hospital.hospitalAddress.id}
                />
              )}
            </Typography>
            <Typography variant="body1">
              {!!hospital.hospitalAddress?.hospitalAddressGeoLocation ? (
                <HospitalMap
                  latitude={
                    hospital.hospitalAddress.hospitalAddressGeoLocation.latitude
                  }
                  longitude={
                    hospital.hospitalAddress.hospitalAddressGeoLocation
                      .longitude
                  }
                  name={hospital.name}
                  url={hospital.url}
                  phone_number={hospital.hospitalAddress.phone_number}
                  address={hospital.hospitalAddress.address}
                />
              ) : (
                'なし'
              )}
            </Typography>
          </div>
        </div>
      </Card>
      <Card
        className={stack({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            内部評価
          </Typography>
          <Link
            href={ADMIN_HOSPIALS_INTERNAL_REPUTATION_FORM_EDIT_PATH(
              hospital.id,
            )}
          >
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div>
          <div>
            <Typography variant="body1" bold={true}>
              星
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalInternalReputation?.star}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              備考
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalInternalReputation?.remark}
            </Typography>
          </div>
          <Typography variant="caption">
            ※LINE等には露出しないデータです
          </Typography>
        </div>
      </Card>
      <Card
        className={stack({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            営業形態
          </Typography>
          <Link href={ADMIN_HOSPIALS_BUSINESS_FORM_EDIT_PATH(hospital.id)}>
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div>
          <div>
            <Typography variant="body1" bold={true}>
              診療時間
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalBusinessForm?.business_hour}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              休診日
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalBusinessForm?.closed_day}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              保険利用可否
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalBusinessForm?.insurance_enabled}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              備考
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalBusinessForm?.remark}
            </Typography>
          </div>
        </div>
      </Card>
      <Card
        className={stack({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            予約形態
          </Typography>
          <Link href={ADMIN_HOSPIALS_RESERVATION_STATUS_EDIT_PATH(hospital.id)}>
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div>
          <div>
            <Typography variant="body1" bold={true}>
              要/不要
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalReservationStatus?.required}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              可否
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalReservationStatus?.reservable}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              備考
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalReservationStatus?.remark}
            </Typography>
          </div>
        </div>
      </Card>
      <Card
        className={stack({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            夜間営業
          </Typography>
          <Link
            href={ADMIN_HOSPIALS_NIGHT_SERVICE_OPTION_EDIT_PATH(hospital.id)}
          >
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div>
          <div>
            <Typography variant="body1" bold={true}>
              可否
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalNightServiceOption?.status}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              備考
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalNightServiceOption?.remark}
            </Typography>
          </div>
        </div>
      </Card>
      <Card
        className={stack({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            緊急夜間対応
          </Typography>
          <Link
            href={ADMIN_HOSPIALS_NIGHT_URGENT_ACTION_OPTION_EDIT_PATH(
              hospital.id,
            )}
          >
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div>
          <div>
            <Typography variant="body1" bold={true}>
              可否
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalNightUrgentActionOption?.status}
            </Typography>
          </div>
        </div>
      </Card>
      <Card
        className={stack({
          p: 'md',
          w: '100%',
          whiteSpace: 'pre-line',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="headlineS" bold={true}>
            認定
          </Typography>
          <Link
            href={ADMIN_HOSPIALS_CERTIFICATION_OPTION_EDIT_PATH(hospital.id)}
          >
            <Button visual="tonal">編集</Button>
          </Link>
        </div>
        <div>
          <div>
            <Typography variant="body1" bold={true}>
              日本小動物獣医師会(JSAVA)認定状況
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalCertificationOption?.jsava_registered}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" bold={true}>
              日本獣医師会認定状況
            </Typography>
            <Typography variant="body1">
              {hospital.hospitalCertificationOption?.nichiju_registered}
            </Typography>
          </div>
        </div>
      </Card>
    </>
  );
};
