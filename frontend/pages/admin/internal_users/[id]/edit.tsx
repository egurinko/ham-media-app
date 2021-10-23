import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Form from '@/components/ecosystems/admin/internal_users/edit/Form';
import InternalLayout from '@/components/layouts/admin/InternalLayout';
import ClientOnly from '@/components/ecosystems/ClientOnly';
import { getInternalUsers } from '@/api/internal_api/getInternalUsers';
import type { InternalGetInternalUsersQuery } from '@/api/internal_api/types';
import { apiClient } from '@/utils/apollo';
import { goAdminInternalUsers } from '@/utils/routes';

const Edit: React.VFC<Props> = () => {
  const router = useRouter();
  const { id: internalUserId } = router.query;

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminInternalUsers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">ユーザ編集</Heading>
      </Box>
      <ClientOnly>
        {typeof internalUserId === 'string' ? (
          <Form internalUserId={BigInt(internalUserId)} />
        ) : null}
      </ClientOnly>
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await apiClient.query<InternalGetInternalUsersQuery>({
    query: getInternalUsers,
  });

  const paths = data.internalUsers.map((internalUser) => ({
    params: { id: String(internalUser.id) },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  return { props: {} };
};

export default Edit;
