import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/products/new/Form';
import { goAdminProducts } from '@/utils/routes';
import type { ReactElement } from 'react';

const New = () => {
  const router = useRouter();

  return (
    <>
      <Box display="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminProducts(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">商品登録</Heading>
      </Box>
      <Form />
    </>
  );
};

New.getLayout = (page: ReactElement) => <InternalLayout>{page}</InternalLayout>;

export default New;
