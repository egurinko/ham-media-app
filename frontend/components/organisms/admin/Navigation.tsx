import { Box, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserProfileIcon from '@/components/atoms/assets/UserProfileIcon';
import HospitalIcon from '@/components/atoms/assets/HospitalIcon';

const Navigation: React.VFC<NoProps> = () => {
  const router = useRouter();
  const isAdminInternalUsersPath = router.pathname.includes(
    'admin/internal_users'
  );
  const isAdminHospitalsPath = router.pathname.includes('admin/hospitals');

  return (
    <VStack spacing={{ base: 6, sm: 12 }} mt="8">
      <Box>
        <Link href="/admin/internal_users">
          <a>
            <Box
              display="flex"
              alignItems="center"
              fill={isAdminInternalUsersPath ? 'primary.main' : 'text.main'}
              color={isAdminInternalUsersPath ? 'primary.main' : undefined}
              _hover={{
                fill: 'primary.main',
                color: 'primary.main',
              }}
            >
              <Box mr="2">
                <UserProfileIcon width={20} height={20} />
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
              fill={isAdminHospitalsPath ? 'primary.main' : 'text.main'}
              color={isAdminHospitalsPath ? 'primary.main' : undefined}
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

export { Navigation };
