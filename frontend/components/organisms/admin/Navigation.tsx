import { Box, VStack, UnorderedList, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useLocalReadIsAdminQuery } from '@/api/local_api/types';
import { HospitalIcon } from '@/components/atoms/assets/HospitalIcon';
import { InventoryIcon } from '@/components/atoms/assets/InventoryIcon';
import { UserProfileIcon } from '@/components/atoms/assets/UserProfileIcon';
import { NavigationLink } from '@/components/molecules/NavigationLink';
import {
  ADMIN_INTERNAL_USERS_PATH,
  ADMIN_HOSPIALS_PATH,
  ADMIN_MAKERS_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_STOCK_REQUESTS_PATH,
  ADMIN_PRODUCT_TAG_GROUPS_PATH,
} from '@/utils/routes';

const Navigation: React.VFC<NoProps> = () => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();
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
        {isAdminData?.readIsAdmin.isAdmin ? (
          <NavigationLink
            title="ユーザ管理"
            href={ADMIN_INTERNAL_USERS_PATH}
            isCurrentPath={isAdminInternalUsersPath}
            icon={<UserProfileIcon width={20} height={20} />}
          />
        ) : null}
      </Box>
      <Box>
        <NavigationLink
          title="病院管理"
          href={ADMIN_HOSPIALS_PATH}
          isCurrentPath={isAdminHospitalsPath}
          icon={<HospitalIcon width={20} height={20} />}
        />
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
            <NavigationLink
              title="メーカー管理"
              href={ADMIN_MAKERS_PATH}
              isCurrentPath={isAdminMakersPath}
            />
          </ListItem>
          <ListItem>
            <NavigationLink
              title="商品管理"
              href={ADMIN_PRODUCTS_PATH}
              isCurrentPath={isAdminProductsPath}
            />
          </ListItem>
          <ListItem>
            <NavigationLink
              title="タグ管理"
              href={ADMIN_PRODUCT_TAG_GROUPS_PATH}
              isCurrentPath={isAdminProductTagGroupsPath}
            />
          </ListItem>
          <ListItem>
            <NavigationLink
              title="在庫リクエスト管理"
              href={ADMIN_STOCK_REQUESTS_PATH}
              isCurrentPath={isAdminStockRequestsPath}
            />
          </ListItem>
        </UnorderedList>
      </Box>
    </VStack>
  );
};

export { Navigation };
