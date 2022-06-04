import { Text, Box, UnorderedList, ListItem } from '@chakra-ui/react';
import { memo } from 'react';
import { TitleCard } from '@/components/molecules/TitleCard';
import type { FC } from 'react';

type Props = Record<string, never>;

const AbountInformationProvide: FC<Props> = () => (
  <TitleCard title="情報提供について">
    <Box>
      <Text as="span">
        掲載されている病院、掲載されていない病院について何か情報がありましたら、
      </Text>
      <Box color="primary.main" as="u">
        <a href="https://ham-media.net/contactus/">お問い合わせ</a>
      </Box>
      <Text as="span">より情報をご提供いただけると幸いです。</Text>
    </Box>
    <Box mt="4">
      <Text as="span">以下の情報は即時反映いたします。</Text>
      <UnorderedList>
        <ListItem>掲載されていない病院</ListItem>
        <ListItem>
          掲載されている病院のハムスター取扱有無（取扱をやめたなど）
        </ListItem>
      </UnorderedList>
    </Box>
    <Box mt="4">
      <Text as="span">
        以下の情報は一旦ハムメディア内部で蓄積します。蓄積した情報をもとに議論・調査を重ねた上で反映を行いますので時間を要します。
      </Text>
      <UnorderedList>
        <ListItem>掲載されている病院の善し悪し</ListItem>
      </UnorderedList>
    </Box>
  </TitleCard>
);

const Memoed = memo(AbountInformationProvide);

export { Memoed as AbountInformationProvide };
