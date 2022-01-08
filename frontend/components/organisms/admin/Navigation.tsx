import { useMemo } from 'react';
import { Box, VStack, UnorderedList, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserProfileIcon } from '@/components/atoms/assets/UserProfileIcon';
import { HospitalIcon } from '@/components/atoms/assets/HospitalIcon';
import { InventoryIcon } from '@/components/atoms/assets/InventoryIcon';
import {
  ADMIN_INTERNAL_USERS_PATH,
  ADMIN_HOSPIALS_PATH,
  ADMIN_MAKERS_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_STOCK_REQUESTS_PATH,
  ADMIN_PRODUCT_TAG_GROUPS_PATH,
} from '@/utils/routes';

const Navigation: React.VFC<NoProps> = () => {
  const router = useRouter();
  const isAdminInternalUsersPath = useMemo(
    () => router.pathname.includes(ADMIN_INTERNAL_USERS_PATH),
    [router.pathname]
  );
  const isAdminHospitalsPath = useMemo(
    () => router.pathname.includes(ADMIN_HOSPIALS_PATH),
    [router.pathname]
  );
  const isAdminMakersPath = useMemo(
    () => router.pathname.includes(ADMIN_MAKERS_PATH),
    [router.pathname]
  );
  const isAdminProductsPath = useMemo(
    () => router.pathname.includes(ADMIN_PRODUCTS_PATH),
    [router.pathname]
  );
  const isAdminProductTagGroupsPath = useMemo(
    () => router.pathname.includes(ADMIN_PRODUCT_TAG_GROUPS_PATH),
    [router.pathname]
  );
  const isAdminStockRequestsPath = useMemo(
    () => router.pathname.includes(ADMIN_STOCK_REQUESTS_PATH),
    [router.pathname]
  );

  return (
    <VStack alignItems="flex-start" spacing={{ base: 6, sm: 12 }} mt="8">
      <Box>
        <Link href={ADMIN_INTERNAL_USERS_PATH}>
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
        <Link href={ADMIN_HOSPIALS_PATH}>
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
            <Link href={ADMIN_MAKERS_PATH}>
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
          <ListItem>
            <Link href={ADMIN_PRODUCTS_PATH}>
              <a>
                <Box
                  display="flex"
                  alignItems="center"
                  fill={isAdminProductsPath ? 'primary.main' : 'text.main'}
                  color={isAdminProductsPath ? 'primary.main' : undefined}
                  _hover={{
                    fill: 'primary.main',
                    color: 'primary.main',
                  }}
                >
                  商品管理
                </Box>
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href={ADMIN_PRODUCT_TAG_GROUPS_PATH}>
              <a>
                <Box
                  display="flex"
                  alignItems="center"
                  fill={
                    isAdminProductTagGroupsPath ? 'primary.main' : 'text.main'
                  }
                  color={
                    isAdminProductTagGroupsPath ? 'primary.main' : undefined
                  }
                  _hover={{
                    fill: 'primary.main',
                    color: 'primary.main',
                  }}
                >
                  タグ管理
                </Box>
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href={ADMIN_STOCK_REQUESTS_PATH}>
              <a>
                <Box
                  display="flex"
                  alignItems="center"
                  fill={isAdminStockRequestsPath ? 'primary.main' : 'text.main'}
                  color={isAdminStockRequestsPath ? 'primary.main' : undefined}
                  _hover={{
                    fill: 'primary.main',
                    color: 'primary.main',
                  }}
                >
                  在庫リクエスト管理
                </Box>
              </a>
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </VStack>
  );
};

export { Navigation };
