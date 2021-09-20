import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import {
  Heading,
  Box,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Switch,
  Textarea,
  Select,
  Divider,
  Alert,
  AlertIcon,
  IconButton,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import InternalLayout from '@/components/layouts/admin/InternalLayout';
import Card from '@/components/atoms/Card';
import { getHospital } from '@/api/internal_api/getHospital';
import type {
  InternalGetHospitalQuery,
  InternalGetHospitalQueryVariables,
} from '@/api/internal_api/types';
import { getPrefectures } from '@/api/public_api/getPrefectures';
import type { PublicGetPrefecturesQuery } from '@/api/public_api/types';
import { useInternalUpdateHospitalMutation } from '@/api/internal_api/types';
import { apiClient } from '@/utils/apollo';
import { goAdminHospitals } from '@/utils/routes';

interface FormInput {
  name: string;
  url: string;
  published: boolean;
  internalMemo: string;
  prefectureId: string;
  address: string;
  phoneNumber: string;
  star: number;
  starRemark: string;
  businessHour: string;
  closedDay: string;
  businessFormRemark: string;
  insuranceEnabled: string;
  reservationRequired: string;
  reservable: string;
  reservationRemark: string;
  nightServiceStatus: string;
  nightServiceRemark: string;
  nightUrgentActionStatus: string;
  jsavaRegistered: string;
  nichijuRegistered: string;
}

const Edit: React.VFC<Props> = ({ hospital, prefectures }) => {
  const router = useRouter();
  const [update, { data, loading, error }] =
    useInternalUpdateHospitalMutation();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<FormInput> = async (formInput) => {
    trigger();

    try {
      await update({
        variables: {
          id: hospital.id,
          name: formInput.name,
          url: formInput.url,
          deleted: !formInput.published,
          internal_memo: formInput.internalMemo,
          hospitalAddressInput: {
            address: formInput.address,
            phone_number: formInput.phoneNumber,
            prefecture_id: BigInt(formInput.prefectureId),
          },
          hospitalBusinessFormInput: {
            business_hour: formInput.businessHour,
            closed_day: formInput.closedDay,
            insurance_enabled: formInput.insuranceEnabled,
            remark: formInput.businessFormRemark,
          },
          hospitalCertificationOptionInput: {
            jsava_registered: formInput.jsavaRegistered,
            nichiju_registered: formInput.nichijuRegistered,
          },
          hospitalInternalReputationInput: {
            star: Number(formInput.star),
            remark: formInput.starRemark,
          },
          hospitalNightServiceOptionInput: {
            status: formInput.nightServiceStatus,
            remark: formInput.nightServiceRemark,
          },
          hospitalNightUrgentActionOptionInput: {
            status: formInput.nightUrgentActionStatus,
          },
          hospitalReservationStatusInput: {
            required: formInput.reservationRequired,
            reservable: formInput.reservable,
            remark: formInput.reservationRemark,
          },
        },
        refetchQueries: [
          { query: getHospital, variables: { id: hospital.id } },
          'InternalGetHospital',
        ],
      });
      setTimeout(() => {
        goAdminHospitals(router);
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
        <Heading size="sm">病院編集</Heading>
      </Box>
      {data ? (
        <Alert my="4" status="success">
          <AlertIcon />
          更新に成功しました
        </Alert>
      ) : error ? (
        <Alert my="4" status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : null}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb="8">
            <Heading size="md">基本情報</Heading>
            <Divider mt="2" mb="4" />
            <Stack spacing={4}>
              <FormControl id="name" isRequired isInvalid={!!errors.name}>
                <FormLabel>病院名</FormLabel>
                <Controller
                  name="name"
                  defaultValue={hospital.name}
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
              <FormControl
                id="prefectureId"
                isRequired
                isInvalid={!!errors.prefectureId}
              >
                <FormLabel>都道府県</FormLabel>
                <Controller
                  name="prefectureId"
                  defaultValue={String(hospital.hospitalAddress?.prefecture.id)}
                  control={control}
                  rules={{ required: '都道府県を入力してください' }}
                  render={({ field }) => (
                    <Select isInvalid={!!errors.prefectureId} {...field}>
                      {prefectures.map((prefecture) => (
                        <option
                          key={String(prefecture.id)}
                          value={String(prefecture.id)}
                        >
                          {prefecture.name}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                {errors.prefectureId && (
                  <FormErrorMessage>
                    {errors.prefectureId.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="address">
                <FormLabel>住所</FormLabel>
                <Controller
                  name="address"
                  defaultValue={hospital.hospitalAddress?.address}
                  control={control}
                  render={({ field }) => <Input type="text" {...field} />}
                />
                <FormHelperText>
                  ※不明な場合は未記入で入力してください
                </FormHelperText>
              </FormControl>
              <FormControl
                id="phoneNumber"
                isRequired
                isInvalid={!!errors.phoneNumber}
              >
                <FormLabel>電話番号</FormLabel>
                <Controller
                  name="phoneNumber"
                  defaultValue={hospital.hospitalAddress?.phone_number}
                  control={control}
                  rules={{ required: '電話番号を入力してください' }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      isInvalid={!!errors.phoneNumber}
                      {...field}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <FormErrorMessage>
                    {errors.phoneNumber.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="url">
                <FormLabel>URL</FormLabel>
                <Controller
                  name="url"
                  defaultValue={hospital.url}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      autoComplete="off"
                      autoCapitalize="off"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl id="published" isRequired>
                <FormLabel>公開状態</FormLabel>
                <Controller
                  name="published"
                  control={control}
                  defaultValue={!hospital.deleted}
                  render={({ field }) => (
                    <Switch
                      ref={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      checked={field.value}
                      defaultChecked={!hospital.deleted}
                      colorScheme="green"
                    />
                  )}
                />
              </FormControl>
              <FormControl id="internalMemo" isInvalid={!!errors.internalMemo}>
                <FormLabel>内部メモ</FormLabel>
                <Controller
                  name="internalMemo"
                  defaultValue={hospital.internal_memo}
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
          </Box>
          <Box mb="8">
            <Heading size="md">内部評価</Heading>
            <Divider mt="2" mb="4" />
            <Stack spacing={4}>
              <FormControl id="star" isRequired>
                <FormLabel>星</FormLabel>
                <Controller
                  name="star"
                  defaultValue={hospital.hospitalInternalReputation?.star}
                  control={control}
                  rules={{ required: '星を入力してください' }}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Select>
                  )}
                />
                <FormHelperText>※LINE等には露出しないデータです</FormHelperText>
              </FormControl>
              <FormControl id="starRemark" isInvalid={!!errors.starRemark}>
                <FormLabel>備考</FormLabel>
                <Controller
                  name="starRemark"
                  defaultValue={hospital.hospitalInternalReputation?.remark}
                  control={control}
                  rules={{
                    maxLength: {
                      value: 200,
                      message: '備考は200字以内で入力してください',
                    },
                  }}
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
            </Stack>
          </Box>
          <Box mb="8">
            <Heading size="md">営業形態</Heading>
            <Divider mt="2" mb="4" />
            <Stack spacing={4}>
              <FormControl id="businessHour" isRequired>
                <FormLabel>診療時間</FormLabel>
                <Controller
                  name="businessHour"
                  defaultValue={hospital.hospitalBusinessForm?.business_hour}
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
              <FormControl id="closedDay" isRequired>
                <FormLabel>休診日</FormLabel>
                <Controller
                  name="closedDay"
                  defaultValue={hospital.hospitalBusinessForm?.closed_day}
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
              <FormControl id="businessFormRemark" isRequired>
                <FormLabel>備考</FormLabel>
                <Controller
                  name="businessFormRemark"
                  defaultValue={hospital.hospitalBusinessForm?.remark}
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
              <FormControl id="insuranceEnabled" isRequired>
                <FormLabel>保険利用可否</FormLabel>
                <Controller
                  name="insuranceEnabled"
                  defaultValue={
                    hospital.hospitalBusinessForm?.insurance_enabled
                  }
                  control={control}
                  rules={{ required: '保険利用可否を入力してください' }}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="○">○</option>
                      <option value="×">×</option>
                      <option value="不明">不明</option>
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </Box>
          <Box mb="8">
            <Heading size="md">予約</Heading>
            <Divider mt="2" mb="4" />
            <Stack spacing={4}>
              <FormControl id="reservationRequired" isRequired>
                <FormLabel>要不要</FormLabel>
                <Controller
                  name="reservationRequired"
                  defaultValue={hospital.hospitalReservationStatus?.required}
                  rules={{ required: '要不要を入力してください' }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="○">○</option>
                      <option value="×">×</option>
                      <option value="不明">不明</option>
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl id="reservable" isRequired>
                <FormLabel>可否</FormLabel>
                <Controller
                  name="reservable"
                  defaultValue={hospital.hospitalReservationStatus?.reservable}
                  rules={{ required: '可否を入力してください' }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="○">○</option>
                      <option value="×">×</option>
                      <option value="不明">不明</option>
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl id="reservationRemark">
                <FormLabel>備考</FormLabel>
                <Controller
                  name="reservationRemark"
                  defaultValue={hospital.hospitalReservationStatus?.remark}
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
            </Stack>
          </Box>
          <Box mb="8">
            <Heading size="md">夜間営業</Heading>
            <Divider mt="2" mb="4" />
            <Stack spacing={4}>
              <FormControl id="nightServiceStatus" isRequired>
                <FormLabel>営業可否</FormLabel>
                <Controller
                  name="nightServiceStatus"
                  defaultValue={hospital.hospitalNightServiceOption?.status}
                  rules={{ required: '営業可否を入力してください' }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="○">○</option>
                      <option value="×">×</option>
                      <option value="不明">不明</option>
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl id="nightUrgentActionStatus" isRequired>
                <FormLabel>緊急夜間対応可否</FormLabel>
                <Controller
                  name="nightUrgentActionStatus"
                  defaultValue={
                    hospital.hospitalNightUrgentActionOption?.status
                  }
                  rules={{ required: '緊急夜間対応可否を入力してください' }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="○">○</option>
                      <option value="×">×</option>
                      <option value="不明">不明</option>
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl id="nightServiceRemark">
                <FormLabel>備考</FormLabel>
                <Controller
                  name="nightServiceRemark"
                  defaultValue={hospital.hospitalNightServiceOption?.remark}
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
            </Stack>
          </Box>
          <Box mb="8">
            <Heading size="md">認定</Heading>
            <Divider mt="2" mb="4" />
            <Stack spacing={4}>
              <FormControl id="jsavaRegistered" isRequired>
                <FormLabel>日本小動物獣医師会(JSAVA)認定状況</FormLabel>
                <Controller
                  name="jsavaRegistered"
                  defaultValue={
                    hospital.hospitalCertificationOption?.jsava_registered
                  }
                  rules={{ required: '認定状況を入力してください' }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="○">○</option>
                      <option value="×">×</option>
                      <option value="不明">不明</option>
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl id="nichijuRegistered" isRequired>
                <FormLabel>日本獣医師会認定状況</FormLabel>
                <Controller
                  name="nichijuRegistered"
                  defaultValue={
                    hospital.hospitalCertificationOption?.nichiju_registered
                  }
                  rules={{ required: '認定状況を入力してください' }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="○">○</option>
                      <option value="×">×</option>
                      <option value="不明">不明</option>
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </Box>
          <Box d="grid" justifyContent="center">
            <Button
              size="lg"
              mt="16"
              variant="solid"
              bgColor="primary.main"
              color="white"
              type="submit"
              isLoading={loading}
              disabled={Object.keys(errors).length !== 0}
            >
              更新する
            </Button>
          </Box>
        </form>
      </Card>
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  hospital: InternalGetHospitalQuery['hospital'];
  prefectures: PublicGetPrefecturesQuery['prefectures'];
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { data: hospitalData } = await apiClient.query<
    InternalGetHospitalQuery,
    InternalGetHospitalQueryVariables
  >({
    query: getHospital,
    variables: {
      id: BigInt(params!.id),
    },
    fetchPolicy: 'no-cache',
  });

  const { data: prefecturesData } =
    await apiClient.query<PublicGetPrefecturesQuery>({
      query: getPrefectures,
    });

  return {
    props: {
      hospital: hospitalData.hospital,
      prefectures: prefecturesData.prefectures,
    },
  };
};

export default Edit;
