import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/product_tag_groups/new/Form';
import { goAdminProductTagGroups } from '@/utils/routes';
import type { ReactElement } from 'react';

const New = () => {
  const router = useRouter();

  return (
    <>
      <Box display="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminProductTagGroups(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">タグカテゴリー登録</Heading>
      </Box>
      <Form />
    </>
  );
};

New.getLayout = (page: ReactElement) => <InternalLayout>{page}</InternalLayout>;

export default New;
