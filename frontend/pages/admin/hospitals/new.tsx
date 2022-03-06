import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Heading,
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  IconButton,
  Switch,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useInternalCreateHospitalMutation } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { goAdminHospitalsEdit, goAdminHospitals } from '@/utils/routes';
import type { SubmitHandler } from 'react-hook-form';

interface FormInput {
  name: string;
  url: string;
  published: boolean;
  internalMemo: string;
}

const New: React.VFC<NoProps> = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });
  const [create, { data, loading, error }] =
    useInternalCreateHospitalMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({
    name,
    url,
    published,
    internalMemo,
  }) => {
    trigger();

    try {
      const result = await create({
        variables: {
          name,
          url: url,
          deleted: !published,
          internal_memo: internalMemo,
        },
      });
      setTimeout(() => {
        if (result.data) {
          goAdminHospitalsEdit(router, { id: result.data.createHospital.id });
        }
      }, 2000);
    } catch (e) {}
  };

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminHospitals(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">病院登録</Heading>
      </Box>
      {data ? (
        <Alert my="4" status="success">
          <AlertIcon />
          登録に成功しました
        </Alert>
      ) : error ? (
        <Alert my="4" status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>病院名</FormLabel>
              <Controller
                name="name"
                control={control}
                rules={{ required: '病院名を入力してください' }}
                render={({ field }) => (
                  <Input type="text" isInvalid={!!errors.name} {...field} />
                )}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="url" isInvalid={!!errors.url}>
              <FormLabel>URL</FormLabel>
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <Input
                    type="url"
                    autoComplete="url"
                    autoCapitalize="off"
                    isInvalid={!!errors.url}
                    {...field}
                  />
                )}
              />
              {errors.url && (
                <FormErrorMessage>{errors.url.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="published" isRequired>
              <FormLabel>公開状態</FormLabel>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch
                    ref={field.ref}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    checked={field.value}
                    defaultChecked={false}
                    colorScheme="green"
                  />
                )}
              />
            </FormControl>
            <FormControl id="internalMemo" isInvalid={!!errors.internalMemo}>
              <FormLabel>内部メモ</FormLabel>
              <Controller
                name="internalMemo"
                defaultValue=""
                control={control}
                rules={{
                  maxLength: {
                    value: 200,
                    message: '内部メモは200字以内で入力してください',
                  },
                }}
                render={({ field }) => (
                  <Textarea isInvalid={!!errors.internalMemo} {...field} />
                )}
              />
              {errors.internalMemo && (
                <FormErrorMessage>
                  {errors.internalMemo.message}
                </FormErrorMessage>
              )}
              <FormHelperText>※LINE等には露出しないデータです</FormHelperText>
            </FormControl>
          </Stack>
          <Box d="grid" justifyContent="center">
            <PrimaryButton
              size="lg"
              mt="16"
              type="submit"
              isLoading={loading}
              disabled={Object.keys(errors).length !== 0}
            >
              新規登録する
            </PrimaryButton>
          </Box>
        </form>
      </Card>
    </InternalLayout>
  );
};

export default New;
