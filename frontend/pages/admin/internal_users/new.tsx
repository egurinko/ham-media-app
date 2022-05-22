import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { Form } from '@/components/organisms/admin/internal_users/new/Form';
import { goAdminInternalUsers } from '@/utils/routes';
import type { ReactElement } from 'react';

const New = () => {
  const router = useRouter();

  return (
    <>
      <Box display="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminInternalUsers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">ユーザ登録</Heading>
      </Box>
      <Form />
    </>
  );
};

New.getLayout = (page: ReactElement) => <InternalLayout>{page}</InternalLayout>;

export default New;
