import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/product_tag_groups/new/Form';
import { goAdminProductTagGroups } from '@/utils/routes';

const New: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminProductTagGroups(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">タグカテゴリー登録</Heading>
      </Box>
      <Form />
    </InternalLayout>
  );
};

export default New;
