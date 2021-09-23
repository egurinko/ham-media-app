import { useRouter } from 'next/router';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import InternalLayout from '@/components/layouts/admin/InternalLayout';
import Form from '@/components/admin/internal_users/new/Form';
import { goAdminInternalUsers } from '@/utils/routes';

const New: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminInternalUsers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">ユーザ登録</Heading>
      </Box>
      <Form />
    </InternalLayout>
  );
};

export default New;
