import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/stock_requests/new/Form';
import { goAdminStockRequests } from '@/utils/routes';

const New: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminStockRequests(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">在庫リクエスト</Heading>
      </Box>
      <Form />
    </InternalLayout>
  );
};

export default New;
