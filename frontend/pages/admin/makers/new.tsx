import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/makers/new/Form';
import { goAdminMakers } from '@/utils/routes';

const New: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminMakers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">メーカー登録</Heading>
      </Box>
      <Form />
    </InternalLayout>
  );
};

export default New;
