'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, type FC } from 'react';
import { Dialog } from '@/app/components/atoms';
import { Button } from '@/app/components/atoms/Button';
import { Checkbox } from '@/app/components/atoms/Checkbox';
import { FloatingActionButton } from '@/app/components/atoms/FloatingActionButton';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import FilterIcon from '@/assets/filter.svg';
import { css } from '@/styled/css';

export const HospitalFilter: FC<NoProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [recommended, setRecommended] = useState(
    searchParams?.get('recommended') === 'true',
  );
  const [reservable, setReservable] = useState(
    searchParams?.get('reservable') === 'true',
  );
  const [nightServiceOption, setNightServiceOption] = useState(
    searchParams?.get('nightServiceOption') === 'true',
  );
  const [insuranceEnabled, setInsuranceEnabled] = useState(
    searchParams?.get('insuranceEnabled') === 'true',
  );
  const [jsavaOption, setJsavaOption] = useState(
    searchParams?.get('jsavaOption') === 'true',
  );
  const [nichijuOption, setNichijuOption] = useState(
    searchParams?.get('nichijuOption') === 'true',
  );

  const handleSearch = () => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      searchParams?.forEach((_, key) => {
        if (key !== 'searchText' && key !== 'latitude' && key !== 'longitude') {
          params.delete(key);
        }
      });
      params.set('recommended', String(recommended));
      params.set('reservable', String(reservable));
      params.set('nightServiceOption', String(nightServiceOption));
      params.set('insuranceEnabled', String(insuranceEnabled));
      params.set('jsavaOption', String(jsavaOption));
      params.set('nichijuOption', String(nichijuOption));

      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <FloatingActionButton
          visual="tonal"
          size="lg"
          className={css({ position: 'fixed', bottom: 'md', right: 'md' })}
        >
          <Icon source={<FilterIcon />} width={18} height={18} />
        </FloatingActionButton>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content width="100%" height="100vh" p="lg">
          <Dialog.Title>絞り込み検索</Dialog.Title>
          <div
            className={css({
              mt: 'md',
              display: 'flex',
              flexDirection: 'column',
              gap: 'lg',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'sm',
              })}
            >
              <Typography variant="headlineS">ハムメディアセレクト</Typography>
              <Checkbox
                size="lg"
                checked={recommended}
                onCheckedChange={(checkedDetail) =>
                  setRecommended(Boolean(checkedDetail.checked))
                }
              >
                おすすめ
              </Checkbox>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'sm',
              })}
            >
              <Typography variant="headlineS">営業形態</Typography>
              <Checkbox
                size="lg"
                checked={reservable}
                onCheckedChange={(checkedDetail) =>
                  setReservable(Boolean(checkedDetail.checked))
                }
              >
                予約可
              </Checkbox>
              <Checkbox
                size="lg"
                checked={nightServiceOption}
                onCheckedChange={(checkedDetail) =>
                  setNightServiceOption(Boolean(checkedDetail.checked))
                }
              >
                夜間営業
              </Checkbox>
              <Checkbox
                size="lg"
                checked={insuranceEnabled}
                onCheckedChange={(checkedDetail) =>
                  setInsuranceEnabled(Boolean(checkedDetail.checked))
                }
              >
                保険適用可
              </Checkbox>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'sm',
              })}
            >
              <Typography variant="headlineS">認定</Typography>
              <Checkbox
                size="lg"
                checked={jsavaOption}
                onCheckedChange={(checkedDetail) =>
                  setJsavaOption(Boolean(checkedDetail.checked))
                }
              >
                日本小動物獣医師会 (JSAVA) 認定
              </Checkbox>
              <Checkbox
                size="lg"
                checked={nichijuOption}
                onCheckedChange={(checkedDetail) =>
                  setNichijuOption(Boolean(checkedDetail.checked))
                }
              >
                日本獣医師会認定
              </Checkbox>
            </div>
          </div>
          <div className={css({ mt: 'lg', textAlign: 'right' })}>
            <Dialog.CloseTrigger asChild>
              <Button visual="text">キャンセル</Button>
            </Dialog.CloseTrigger>
            <Dialog.CloseTrigger asChild>
              <Button visual="primary" onClick={handleSearch}>
                絞り込む
              </Button>
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
