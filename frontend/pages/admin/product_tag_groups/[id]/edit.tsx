import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Form } from '@/components/organisms/admin/product_tag_groups/edit/Form';
import { Tags } from '@/components/organisms/admin/product_tag_groups/edit/Tags';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { getProductTagGroupIds } from '@/api/internal_api/getProductTagGroupIds';
import type { InternalGetProductTagGroupIdsQuery } from '@/api/internal_api/types';
import { apiClient } from '@/utils/apollo';
import { goAdminProducts } from '@/utils/routes';

const Edit: React.VFC<Props> = () => {
  const router = useRouter();
  const { id: productTagGroupId } = router.query;

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminProducts(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">タグカテゴリー編集</Heading>
      </Box>
      {typeof productTagGroupId === 'string' ? (
        <>
          <Box mb="2">
            <Form productTagGroupId={Number(productTagGroupId)} />
          </Box>
          <Tags productTagGroupId={Number(productTagGroupId)} />
        </>
      ) : null}
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await apiClient.query<InternalGetProductTagGroupIdsQuery>({
    query: getProductTagGroupIds,
  });

  const paths = data.productTagGroups.map((productTagGroup) => ({
    params: { id: String(productTagGroup.id) },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  return { props: {} };
};

export default Edit;
