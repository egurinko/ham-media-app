import { Text, Box, Input, Switch, Select, Button } from '@chakra-ui/react';
import { usePublicGetPrefecturesQuery } from '@/api/public_api/types';
import type {
  Name,
  SetName,
  Deleted,
  SetDeleted,
  PrefectureId,
  SetPrefectureId,
  SearchHospitals,
} from '../types';

type Props = {
  name: Name;
  setName: SetName;
  deleted: Deleted;
  setDeleted: SetDeleted;
  prefectureId: PrefectureId;
  setPrefectureId: SetPrefectureId;
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
  searchHospitals,
}) => {
  const { data: prefectures } = usePublicGetPrefecturesQuery();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchHospitals();
      }}
    >
      <Box display="flex">
        <Box mr="4">
          <Text>病院名 (前方一致)</Text>
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
          <Text>公開状態</Text>
          <Switch
            defaultChecked={!deleted}
            checked={!deleted}
            onChange={(e) => setDeleted(!e.target.checked)}
          />
        </Box>
      </Box>
      <Box textAlign="center">
        <Button
          mt="4"
          variant="solid"
          bgColor="primary.main"
          color="white"
          isLoading={loading}
          type="submit"
        >
          検索
        </Button>
      </Box>
    </form>
  );
};

export { SearchSection };
