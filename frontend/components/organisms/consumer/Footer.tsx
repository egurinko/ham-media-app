import { Text, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { RedirectIcon } from '@/components/atoms/assets/RedirectIcon';
import { AbountInformationProvide } from './footer/AboutInformationProvide';
import { AboutOfficialSNS } from './footer/AboutOfficialSNS';

type Props = Record<string, never>;

const Footer: FC<Props> = () => (
  <footer>
    <Box mb="4">
      <AbountInformationProvide />
    </Box>
    <Box mb="4">
      <AboutOfficialSNS />
    </Box>
    <Box display="flex" justifyContent="center" my="4">
      <Box p="2" border="1px" borderRadius="5" borderColor="gray.300">
        <a href="https://ham-media.net">
          <Box display="flex" justifyContent="space-between">
            <Box fill="primary.main" color="primary.main" mr="2">
              <RedirectIcon width={20} height={20} />
            </Box>
            ホームページに戻る
          </Box>
        </a>
      </Box>
    </Box>
    <Box display="flex" justifyContent="center">
      <Text>© 2021 一般社団法人 ハムメディア</Text>
    </Box>
  </footer>
);

const Memoed = memo(Footer);

export { Memoed as Footer };
