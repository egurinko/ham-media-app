import { Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserIcon from '../../../assets/user_profile.svg';
import HospitalIcon from '../../../assets/hospital.svg';

type Props = Record<string, never>;

const Navigation: React.VFC<Props> = () => {
  const router = useRouter();
  return (
    <VStack spacing={{ base: 6, sm: 12 }} mt="8">
      <Box>
        <Link href="/admin/internal_users">
          <a>
            <Box
              display="flex"
              alignItems="center"
              fill={
                router.pathname.includes('admin/internal_users')
                  ? 'primary.main'
                  : 'text.main'
              }
              color={
                router.pathname.includes('admin/internal_users')
                  ? 'primary.main'
                  : undefined
              }
              _hover={{
                fill: 'primary.main',
                color: 'primary.main',
              }}
            >
              <Box mr="2">
                <UserIcon width={20} height={20} />
              </Box>
              ユーザ管理
            </Box>
          </a>
        </Link>
      </Box>
      <Box>
        <Link href="/admin/hospitals">
          <a>
            <Box
              display="flex"
              alignItems="center"
              fill={
                router.pathname.includes('admin/hospitals')
                  ? 'primary.main'
                  : 'text.main'
              }
              color={
                router.pathname.includes('admin/hospitals')
                  ? 'primary.main'
                  : undefined
              }
              _hover={{
                fill: 'primary.main',
                color: 'primary.main',
              }}
            >
              <Box mr="2">
                <HospitalIcon width={20} height={20} />
              </Box>
              病院管理
            </Box>
          </a>
        </Link>
      </Box>
    </VStack>
  );
};

export default Navigation;
