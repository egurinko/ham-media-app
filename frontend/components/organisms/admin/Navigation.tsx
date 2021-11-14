import { Box, VStack, UnorderedList, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserProfileIcon } from '@/components/atoms/assets/UserProfileIcon';
import { HospitalIcon } from '@/components/atoms/assets/HospitalIcon';
import { InventoryIcon } from '@/components/atoms/assets/InventoryIcon';

const Navigation: React.VFC<NoProps> = () => {
  const router = useRouter();
  const isAdminInternalUsersPath = router.pathname.includes(
    'admin/internal_users'
  );
  const isAdminHospitalsPath = router.pathname.includes('admin/hospitals');
  const isAdminMakersPath = router.pathname.includes('admin/makers');

  return (
    <VStack alignItems="flex-start" spacing={{ base: 6, sm: 12 }} mt="8">
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
      <Box>
        <Box display="flex" alignItems="center" fill="text.main">
          <Box mr="2">
            <InventoryIcon width={20} height={20} />
          </Box>
          在庫管理
        </Box>
        <UnorderedList spacing={3} ml="6" mt="2">
          <ListItem>
            <Link href="/admin/makers">
              <a>
                <Box
                  display="flex"
                  alignItems="center"
                  fill={isAdminMakersPath ? 'primary.main' : 'text.main'}
                  color={isAdminMakersPath ? 'primary.main' : undefined}
                  _hover={{
                    fill: 'primary.main',
                    color: 'primary.main',
                  }}
                >
                  メーカー管理
                </Box>
              </a>
            </Link>
          </ListItem>
          {/* <ListItem>
            <Link href="/admin/products">
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
                  在庫一覧
                </Box>
              </a>
            </Link>
          </ListItem> */}
        </UnorderedList>
      </Box>
    </VStack>
  );
};

export { Navigation };
