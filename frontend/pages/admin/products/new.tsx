import { useRouter } from 'next/router';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/products/new/Form';
import { goAdminProducts } from '@/utils/routes';

const New: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminProducts(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">商品登録</Heading>
      </Box>
      <Form />
    </InternalLayout>
  );
};

export default New;
