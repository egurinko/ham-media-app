import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Form } from '@/components/organisms/admin/makers/edit/Form';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { goAdminMakers } from '@/utils/routes';

const Edit: React.VFC<Props> = () => {
  const router = useRouter();
  const { id: makerId } = router.query;

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminMakers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">メーカー編集</Heading>
      </Box>
      {typeof makerId === 'string' ? <Form makerId={Number(makerId)} /> : null}
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  return { props: {} };
};

export default Edit;
