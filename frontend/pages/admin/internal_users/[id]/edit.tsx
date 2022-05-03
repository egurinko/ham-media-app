import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/internal_users/edit/Form';
import { goAdminInternalUsers } from '@/utils/routes';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

const Edit: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { id: internalUserId } = router.query;

  return (
    <InternalLayout>
      <Box display="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminInternalUsers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">ユーザ編集</Heading>
      </Box>
      {typeof internalUserId === 'string' ? (
        <Form internalUserId={BigInt(internalUserId)} />
      ) : null}
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<NoProps, Params> = async () => ({
  props: {},
});

export default Edit;
