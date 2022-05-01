import { Text, Box, Input, Switch, Select } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInternalGetHospitalConnectionLazyQuery } from '@/api/internal_api/types';
import { usePublicGetPrefecturesQuery } from '@/api/public_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import type {
  Name,
  SetName,
  Deleted,
  SetDeleted,
  PrefectureId,
  SetPrefectureId,
  InternalReputationStar,
  SetInternalReputationStar,
  SearchHospitals,
} from '../types';

type Props = {
  name: Name;
  setName: SetName;
  deleted: Deleted;
  setDeleted: SetDeleted;
  prefectureId: PrefectureId;
  setPrefectureId: SetPrefectureId;
  internalReputationStar: InternalReputationStar;
  setInternalReputationStar: SetInternalReputationStar;
  loading: boolean;
  searchHospitals: SearchHospitals;
};

const SearchSection: React.VFC<Props> = ({
  name,
  deleted,
  prefectureId,
  loading,
  setDeleted,
  setName,
  setPrefectureId,
  internalReputationStar,
  setInternalReputationStar,
  searchHospitals,
}) => {
  const { data: prefectures } = usePublicGetPrefecturesQuery();
  const [getHospitailConnection, { data, loading: csvLoading }] =
    useInternalGetHospitalConnectionLazyQuery({ fetchPolicy: 'network-only' });

  const handleCsv = () => {
    getHospitailConnection({
      variables: {
        first: 10000,
        name,
        deleted,
        prefectureId: prefectureId !== '' ? BigInt(prefectureId) : undefined,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const edges = data.hospitalConnection?.edges;
      if (edges) {
        const nodes = edges
          .filter((edge) => edge?.node)
          .map((edge) => edge?.node);
        const records = nodes.map((node) => [
          `"${node?.deleted}"`,
          `"${node?.name}"`,
          `"${node?.url}"`,
          `"${node?.internal_memo}"`,
          `"${node?.hospitalAddress?.prefecture.name}"`,
          `"${node?.hospitalAddress?.address}"`,
          `"${node?.hospitalAddress?.phone_number}"`,
          `"${node?.hospitalBusinessForm?.business_hour}"`,
          `"${node?.hospitalBusinessForm?.closed_day}"`,
          `"${node?.hospitalBusinessForm?.insurance_enabled}"`,
          `"${node?.hospitalBusinessForm?.remark}"`,
          `"${node?.hospitalNightServiceOption?.status}"`,
          `"${node?.hospitalNightServiceOption?.remark}"`,
          `"${node?.hospitalNightUrgentActionOption?.status}"`,
          `"${node?.hospitalReservationStatus?.required}"`,
          `"${node?.hospitalReservationStatus?.reservable}"`,
          `"${node?.hospitalReservationStatus?.remark}"`,
          `"${node?.hospitalCertificationOption?.jsava_registered}"`,
          `"${node?.hospitalCertificationOption?.nichiju_registered}"`,
          `"${node?.hospitalInternalReputation?.star}"`,
          `"${node?.hospitalInternalReputation?.remark}"`,
        ]);
        const headers = [
          '削除済',
          '病院名',
          'URL',
          '内部メモ',
          '都道府県',
          '住所',
          '電話番号',
          '診療時間',
          '休診日',
          '保険適用可否',
          '診療備考',
          '夜間営業',
          '夜間営業備考',
          '緊急夜間',
          '予約要否',
          '予約可否',
          '予約備考',
          '日本獣医師会',
          '日本小動物獣医師会',
          '評価星',
          '評価備考',
        ];

        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        const csvData = [headers, ...records]
          .map((record) => record.join('\t'))
          .join('\r\n');
        const blob = new Blob([bom, csvData], { type: 'text/csv' });

        const downloadLink = document.createElement('a');
        downloadLink.download = '病院一覧.csv';
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.dataset.downloadurl = [
          'text/plain',
          downloadLink.download,
          downloadLink.href,
        ].join(':');
        downloadLink.click();
      }
    }
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchHospitals();
      }}
    >
      <Box display="flex">
        <Box mr="4">
          <Text>病院名 (部分一致)</Text>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Box>
        <Box mr="4">
          <Text>都道府県</Text>
          <Select
            placeholder="選択してください"
            value={prefectureId}
            onChange={(e) => setPrefectureId(e.target.value)}
          >
            {prefectures?.prefectures.map((prefecture) => (
              <option key={String(prefecture.id)} value={String(prefecture.id)}>
                {prefecture.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box mr="4">
          <Text>星（☆）</Text>
          <Select
            placeholder="選択してください"
            value={internalReputationStar}
            onChange={(e) => setInternalReputationStar(e.target.value)}
          >
            {Array(5)
              .fill('')
              .map((_, i) => (
                <option key={String(i)} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
          </Select>
        </Box>
        <Box mr="4">
          <Text>公開状態</Text>
          <Switch
            defaultChecked={!deleted}
            checked={!deleted}
            onChange={(e) => setDeleted(!e.target.checked)}
          />
        </Box>
      </Box>
      <Box textAlign="center" position="relative">
        <PrimaryButton mt="4" isLoading={loading} type="submit">
          検索
        </PrimaryButton>
        <SecondaryButton
          position="absolute"
          right={0}
          mt="4"
          variant="outline"
          borderColor="primary.main"
          isLoading={csvLoading}
          onClick={handleCsv}
        >
          CSV出力
        </SecondaryButton>
      </Box>
    </form>
  );
};

export { SearchSection };
