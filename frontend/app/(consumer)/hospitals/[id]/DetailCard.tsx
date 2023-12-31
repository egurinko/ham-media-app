import { HospitalTags } from '@/app/(consumer)/hospitals/HospitalTags';
import { LinkIcon } from '@/app/components/assets/LinkIcon';
import { MapPinIcon } from '@/app/components/assets/MapPinIcon';
import { PhoneIcon } from '@/app/components/assets/PhoneIcon';
import { Button } from '@/app/components/atoms/Button';
import { Card } from '@/app/components/atoms/Card';
import { Divider } from '@/app/components/atoms/Divider';
import { Typography } from '@/app/components/atoms/Typography';
import { getHospital } from '@/app/utils/api/publicApi/getHospital';
import { css } from '@/styled/css';
import { HOSPITAL_STATUSES } from '@/utils/constant';
import type { FC } from 'react';

type Props = {
  hospitalId: string;
};

export const DetailCard: FC<Props> = async ({ hospitalId }) => {
  const { hospital } = (await getHospital(hospitalId)).data;

  return (
    <Card
      className={css({
        p: 'lg',
      })}
    >
      <div className={css({ display: 'flex', flexDir: 'column', gap: '4' })}>
        <div className={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
          <Typography variant="headlineM" bold={true}>
            {hospital.name}
          </Typography>
          <div
            className={css({
              display: 'flex',
              flexDir: 'row',
              alignItems: 'center',
              gap: '1',
            })}
          >
            <div
              className={css({
                fill: 'primary.main',
              })}
            >
              <MapPinIcon width={15} height={15} />
            </div>
            <Typography
              variant="body2"
              className={css({
                color: 'text.secondary',
              })}
            >
              {hospital.hospitalAddress?.prefecture.name}
              {hospital.hospitalAddress?.address}
            </Typography>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDir: 'row',
              alignItems: 'center',
              gap: '1',
            })}
          >
            <div
              className={css({
                fill: 'primary.main',
              })}
            >
              <LinkIcon width={15} height={15} />
            </div>
            <Typography
              variant="caption"
              className={css({
                color: 'text.secondary',
                textDecorationLine: 'underline',
              })}
            >
              <a href={hospital.url} target="_blank" rel="noreferrer">
                {hospital.url}
              </a>
            </Typography>
          </div>
          <HospitalTags hospital={hospital} />
        </div>
        <Divider />
        <div className={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
          <Typography
            variant="headlineS"
            className={css({
              borderLeft: '4px',
              borderColor: 'primary.main',
              borderStyle: 'solid',
              pl: 3,
            })}
          >
            診療時間
          </Typography>
          <div
            className={css({
              whiteSpace: 'pre-line',
            })}
          >
            {hospital.hospitalBusinessForm?.business_hour}
            <div
              className={css({
                mt: 4,
              })}
            >
              ■ 休診日
            </div>
            {hospital.hospitalBusinessForm?.closed_day}

            <div
              className={css({
                mt: 4,
              })}
            >
              ■ 備考
            </div>
            {hospital.hospitalBusinessForm?.remark}
          </div>
        </div>
        <Divider />
        <div className={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
          <Typography
            variant="headlineS"
            className={css({
              borderLeft: '4px',
              borderColor: 'primary.main',
              borderStyle: 'solid',
              pl: 3,
            })}
          >
            予約
          </Typography>
          <div
            className={css({
              whiteSpace: 'pre-line',
            })}
          >
            {hospital.hospitalReservationStatus?.required ===
            HOSPITAL_STATUSES.YES
              ? '予約必須'
              : hospital.hospitalReservationStatus?.reservable ===
                  HOSPITAL_STATUSES.NO
                ? '予約不可'
                : hospital.hospitalReservationStatus?.required ===
                      HOSPITAL_STATUSES.NO &&
                    hospital.hospitalReservationStatus?.reservable ===
                      HOSPITAL_STATUSES.YES
                  ? '予約なしでOK'
                  : '予約については公式HPを確認'}

            <div
              className={css({
                mt: 4,
              })}
            >
              ■ 備考
            </div>
            {hospital.hospitalReservationStatus?.remark}
          </div>
        </div>
        <Divider />
        <div className={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
          <Typography
            variant="headlineS"
            className={css({
              borderLeft: '4px',
              borderColor: 'primary.main',
              borderStyle: 'solid',
              pl: 3,
            })}
          >
            夜間営業
          </Typography>
          <div
            className={css({
              whiteSpace: 'pre-line',
            })}
          >
            {hospital.hospitalNightServiceOption?.status ===
            HOSPITAL_STATUSES.YES
              ? '夜間営業あり'
              : hospital.hospitalNightServiceOption?.status ===
                  HOSPITAL_STATUSES.NO
                ? '夜間営業なし'
                : '夜間営業については公式HPを確認'}
            <div
              className={css({
                mt: 4,
              })}
            >
              {hospital.hospitalNightUrgentActionOption?.status ===
              HOSPITAL_STATUSES.YES
                ? '■ 夜間救急対応あり'
                : hospital.hospitalNightUrgentActionOption?.status ===
                    HOSPITAL_STATUSES.NO
                  ? '■ 夜間救急対応なし'
                  : '■ 夜間救急対応については公式HPを確認'}
            </div>
            {hospital.hospitalBusinessForm?.closed_day}

            <div
              className={css({
                mt: 4,
              })}
            >
              ■ 備考
            </div>
            {hospital.hospitalNightServiceOption?.remark}
          </div>
        </div>
        <Divider />
        <div className={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
          <Typography variant="body1">
            保険利用可否{' '}
            {hospital.hospitalBusinessForm?.insurance_enabled ===
            HOSPITAL_STATUSES.YES
              ? HOSPITAL_STATUSES.YES
              : 'なし'}
          </Typography>
          <Typography variant="body1">
            日本小動物獣医師会(JSAVA)所属{' '}
            {hospital.hospitalCertificationOption?.jsava_registered ===
            HOSPITAL_STATUSES.YES
              ? HOSPITAL_STATUSES.YES
              : 'なし'}
          </Typography>
          <Typography variant="body1">
            日本獣医師会所属{' '}
            {hospital.hospitalCertificationOption?.nichiju_registered ===
            HOSPITAL_STATUSES.YES
              ? HOSPITAL_STATUSES.YES
              : 'なし'}
          </Typography>
        </div>
        <Divider />
        <Button visual="tonal" size="md" fullWidth>
          <a
            href={`tel:${hospital.hospitalAddress?.phone_number}`}
            className={css({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            })}
          >
            <PhoneIcon width={20} height={20} />
            {hospital.hospitalAddress?.phone_number}
          </a>
        </Button>
      </div>
    </Card>
  );
};
