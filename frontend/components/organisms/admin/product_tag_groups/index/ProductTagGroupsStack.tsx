import { Divider, Box } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useInternalGetProductTagGroupsQuery } from '@/api/internal_api/types';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { Spinner } from '@/components/atoms/Spinner';
import { ProductTagGroupSummary } from './productTagGroupsStack/ProductTagGroupSummary';

const ProductTagGroupsStack: React.VFC<NoProps> = () => {
  const { data, loading, error } = useInternalGetProductTagGroupsQuery({
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <Box textAlign="center">
        <Spinner loading={loading} />
      </Box>
      <ErrorMessage error={error} />
      <Divider mt="2" />
      {data?.productTagGroups.map((productTagGroup) => (
        <Fragment key={productTagGroup.id}>
          <ProductTagGroupSummary
            key={productTagGroup.id}
            productTagGroup={productTagGroup}
          />
          <Divider />
        </Fragment>
      ))}
    </>
  );
};

export { ProductTagGroupsStack };
