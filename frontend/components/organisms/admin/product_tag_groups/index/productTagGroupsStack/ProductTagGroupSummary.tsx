import { Text, Box, UnorderedList, ListItem } from '@chakra-ui/react';
import { memo } from 'react';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import type { InternalGetProductTagGroupsQuery } from '@/services/api/internal_api/types';
import { ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  productTagGroup: InternalGetProductTagGroupsQuery['productTagGroups'][number];
};

const ProductTagGroupSummary: FC<Props> = ({ productTagGroup }) => (
  <SummaryLink url={ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(productTagGroup.id)}>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      p="2"
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {productTagGroup.name}
        </Text>
      </Box>
      <Box>
        <UnorderedList>
          {productTagGroup.productTags.map((productTag) => (
            <ListItem key={productTag.id}>
              <Text size="sm">{productTag.name}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  </SummaryLink>
);

const Memoed = memo(ProductTagGroupSummary);

export { Memoed as ProductTagGroupSummary };
