import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Form from '@/components/admin/internal_users/edit/Form';
import InternalLayout from '@/components/admin/templates/InternalLayout';
import { getInternalUsers } from '@/api/internal_api/getInternalUsers';
import type { InternalGetInternalUsersQuery } from '@/api/internal_api/types';
import { getInternalUser } from '@/api/internal_api/getInternalUser';
import type {
  InternalGetInternalUserQuery,
  InternalGetInternalUserQueryVariables,
} from '@/api/internal_api/types';
import { apiClient } from '@/utils/apollo';
import { goAdminInternalUsers } from '@/utils/routes';

const Edit: React.VFC<Props> = ({ internalUser }) => {
  const router = useRouter();

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
      <Form internalUser={internalUser} />
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  internalUser: InternalGetInternalUserQuery['internalUser'];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await apiClient.query<InternalGetInternalUsersQuery>({
    query: getInternalUsers,
  });

  const paths = data.internalUsers.map((internalUser) => ({
    params: { id: String(internalUser.id) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { data } = await apiClient.query<
    InternalGetInternalUserQuery,
    InternalGetInternalUserQueryVariables
  >({
    query: getInternalUser,
    variables: {
      id: BigInt(params!.id),
    },
  });

  return { props: { internalUser: data.internalUser } };
};

export default Edit;
