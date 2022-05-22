import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/makers/edit/Form';
import { goAdminMakers } from '@/utils/routes';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { ReactElement } from 'react';

const Edit = () => {
  const router = useRouter();
  const { id: makerId } = router.query;

  return (
    <>
      <Box display="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminMakers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">メーカー編集</Heading>
      </Box>
      {typeof makerId === 'string' ? <Form makerId={Number(makerId)} /> : null}
    </>
  );
};

Edit.getLayout = (page: ReactElement) => (
  <InternalLayout>{page}</InternalLayout>
);

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
