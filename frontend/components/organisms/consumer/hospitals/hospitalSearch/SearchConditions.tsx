import { Tag, Text, HStack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

type Props = {
  reservable: boolean;
  nightServiceOption: boolean;
  insuranceEnabled: boolean;
  jsavaOption: boolean;
  nichijuOption: boolean;
};

const SearchConditions: React.FC<Props> = ({
  reservable,
  nightServiceOption,
  insuranceEnabled,
  jsavaOption,
  nichijuOption,
}) => {
  return (
    <HStack spacing={2} wrap="wrap">
      <Tag borderRadius={100} p="2" my="2" bgColor="primary.main" color="white">
        <Text fontSize="md">全条件クリア</Text>
        <CloseIcon fontSize="xs" ml="1" />
      </Tag>
      {!reservable || (
        <Tag
          borderRadius={100}
          p="2"
          my="2"
          bgColor="primary.main"
          color="white"
        >
          <Text fontSize="md">予約可</Text>
          <CloseIcon fontSize="xs" ml="1" />
        </Tag>
      )}
      {!nightServiceOption || (
        <Tag
          borderRadius={100}
          p="2"
          my="2"
          bgColor="primary.main"
          color="white"
        >
          <Text fontSize="md">夜間営業</Text>
          <CloseIcon fontSize="xs" ml="1" />
        </Tag>
      )}
      {!insuranceEnabled || (
        <Tag
          borderRadius={100}
          p="2"
          my="2"
          bgColor="primary.main"
          color="white"
        >
          <Text fontSize="md">保険適用可</Text>
          <CloseIcon fontSize="xs" ml="1" />
        </Tag>
      )}
      {!jsavaOption || (
        <Tag
          borderRadius={100}
          p="2"
          my="2"
          bgColor="primary.main"
          color="white"
        >
          <Text fontSize="md">日本小動物獣医師会 (JSAVA) 認定あり</Text>
          <CloseIcon fontSize="xs" ml="1" />
        </Tag>
      )}
      {!nichijuOption || (
        <Tag
          borderRadius={100}
          p="2"
          my="2"
          bgColor="primary.main"
          color="white"
        >
          <Text fontSize="md">日本獣医師会認定あり</Text>
          <CloseIcon fontSize="xs" ml="1" />
        </Tag>
      )}
    </HStack>
  );
};

export default SearchConditions;
