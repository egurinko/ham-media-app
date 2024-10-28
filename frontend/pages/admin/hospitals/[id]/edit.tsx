import { ChevronRightIcon, LinkIcon } from '@chakra-ui/icons';
import {
  Heading,
  Box,
  Input,
  Stack,
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
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { Marker } from '@react-google-maps/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { GoogleMap } from '@/components/organisms/GoogleMap';
import {
  useInternalGetHospitalQuery,
  useInternalUpdateHospitalMutation,
  useInternalUpsertHospitalAddressGeoLocationMutation,
} from '@/services/api/internal_api/types';
import { useLocalReadIsAdminQuery } from '@/services/api/local_api/types';
import { usePublicGetPrefecturesQuery } from '@/services/api/public_api/types';
import { goAdminHospitals } from '@/utils/routes';
import { scrollTo } from '@/utils/scroll';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { ReactElement } from 'react';
import type { SubmitHandler } from 'react-hook-form';

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

const Edit = () => {
  const router = useRouter();

  const { id: hospitalId } = router.query;
  const { data: hospitalData, fetchMore } = useInternalGetHospitalQuery({
    variables: { id: Number(typeof hospitalId === 'string' ? hospitalId : 1) },
    fetchPolicy: 'network-only',
  });
  const hospital = hospitalData?.hospital;
  const [latitude, setLatitude] = useState(
    hospital?.hospitalAddress?.hospitalAddressGeoLocation?.latitude || '',
  );
  const [longitude, setLongitude] = useState(
    hospital?.hospitalAddress?.hospitalAddressGeoLocation?.longitude || '',
  );

  const [
    upsertGeoLocation,
    {
      data: upsertGeoLocationData,
      loading: upsertGeoLocationLoading,
      error: upsertGeoLocationError,
    },
  ] = useInternalUpsertHospitalAddressGeoLocationMutation();
  const handleGeoLocationClick = useCallback(async () => {
    const hospitalAddress = hospital?.hospitalAddress;
    if (hospitalAddress) {
      try {
        await upsertGeoLocation({
          variables: {
            hospitalAddressId: hospitalAddress.id,
          },
        });
        await fetchMore({ variables: { id: hospital.id } });
      } catch {}
    }
  }, [upsertGeoLocation, hospital, fetchMore]);
  useEffect(() => {
    const geoLocation = hospital?.hospitalAddress?.hospitalAddressGeoLocation;
    if (geoLocation) {
      setLatitude(geoLocation.latitude);
      setLongitude(geoLocation.longitude);
    }
  }, [hospital]);

  const { data: prefectureData } = usePublicGetPrefecturesQuery();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

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

    if (typeof hospitalId === 'string') {
      try {
        await update({
          variables: {
            id: Number(hospitalId),
            name: formInput.name,
            url: formInput.url,
            deleted: !formInput.published,
            internal_memo: formInput.internalMemo,
            hospitalAddressInput: {
              address: formInput.address,
              phone_number: formInput.phoneNumber,
              prefecture_id: Number(formInput.prefectureId),
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
        });
        setTimeout(() => {
          goAdminHospitals(router);
        }, 2000);
      } catch (e) {}
      scrollTo();
    }
  };

  return (
    <>
      <Box display="flex" mb="4">
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
      {hospital ? (
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb="8">
              <Heading size="md">
                基本情報
                <Link
                  href={`${location.origin}/hospitals/${hospital.id}`}
                  target="_blank"
                >
                  <LinkIcon ml="4" />
                </Link>
              </Heading>
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
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
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
                  <FormErrorMessage>
                    {errors.phoneNumber?.message}
                  </FormErrorMessage>
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
                <FormControl id="published">
                  <FormLabel>公開状態</FormLabel>
                  <Controller
                    name="published"
                    control={control}
                    defaultValue={!hospital.deleted}
                    render={({ field }) => (
                      <Switch
                        onChange={(e) => field.onChange(e.target.checked)}
                        defaultChecked={!hospital.deleted}
                        checked={field.value}
                        colorScheme="green"
                      />
                    )}
                  />
                </FormControl>
                <FormControl
                  id="internalMemo"
                  isInvalid={!!errors.internalMemo}
                >
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
                  <FormErrorMessage>
                    {errors.internalMemo?.message}
                  </FormErrorMessage>
                  <FormHelperText>
                    ※LINE等には露出しないデータです
                  </FormHelperText>
                </FormControl>
              </Stack>
            </Box>
            <Box mb="8">
              <Heading size="md">住所</Heading>
              <Divider mt="2" mb="4" />
              <Stack spacing={4}>
                {prefectureData ? (
                  <FormControl
                    id="prefectureId"
                    isRequired
                    isInvalid={!!errors.prefectureId}
                  >
                    <FormLabel>都道府県</FormLabel>
                    <Controller
                      name="prefectureId"
                      defaultValue={String(
                        hospital.hospitalAddress?.prefecture.id,
                      )}
                      control={control}
                      rules={{ required: '都道府県を入力してください' }}
                      render={({ field }) => (
                        <Select isInvalid={!!errors.prefectureId} {...field}>
                          {prefectureData.prefectures.map((prefecture) => (
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
                    <FormErrorMessage>
                      {errors.prefectureId?.message}
                    </FormErrorMessage>
                  </FormControl>
                ) : null}

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
                <SecondaryButton
                  isLoading={upsertGeoLocationLoading}
                  onClick={handleGeoLocationClick}
                >
                  住所から緯度経度を作成/更新
                </SecondaryButton>
                <ErrorMessage error={upsertGeoLocationError} />
                <SuccessMessage
                  message="緯度経度が更新されました"
                  data={upsertGeoLocationData}
                />
                {hospital.hospitalAddress?.hospitalAddressGeoLocation && (
                  <>
                    <FormControl>
                      <FormLabel>緯度</FormLabel>
                      <NumberInput
                        value={latitude}
                        step={0.000001}
                        id="latitude"
                      >
                        <NumberInputField disabled={true} />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>経度</FormLabel>
                      <NumberInput
                        value={longitude}
                        step={0.000001}
                        id="longitude"
                      >
                        <NumberInputField disabled={true} />
                      </NumberInput>
                    </FormControl>
                    <Box>
                      <GoogleMap
                        currentLat={
                          hospital.hospitalAddress.hospitalAddressGeoLocation
                            .latitude
                        }
                        currentLng={
                          hospital.hospitalAddress.hospitalAddressGeoLocation
                            .longitude
                        }
                        height={200}
                      >
                        <Marker
                          position={{
                            lat: hospital.hospitalAddress
                              .hospitalAddressGeoLocation.latitude,
                            lng: hospital.hospitalAddress
                              .hospitalAddressGeoLocation.longitude,
                          }}
                          icon="https://user-images.githubusercontent.com/23233648/136685502-4bf03930-df2c-4194-8cc7-67f10699f5b8.png"
                        />
                      </GoogleMap>
                    </Box>
                  </>
                )}
              </Stack>
            </Box>
            <Box mb="8">
              <Heading size="md">内部評価</Heading>
              <Divider mt="2" mb="4" />
              <Stack spacing={4}>
                <FormControl id="star" isRequired isInvalid={!!errors.star}>
                  <FormLabel>星</FormLabel>
                  <Controller
                    name="star"
                    defaultValue={hospital.hospitalInternalReputation?.star}
                    control={control}
                    rules={{ required: '星を入力してください' }}
                    render={({ field }) => (
                      <Select {...field} isInvalid={!!errors.star}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>{errors.star?.message}</FormErrorMessage>
                  <FormHelperText>
                    ※LINE等には露出しないデータです
                  </FormHelperText>
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
                    render={({ field }) => (
                      <Textarea isInvalid={!!errors.starRemark} {...field} />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.starRemark?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Box>
            <Box mb="8">
              <Heading size="md">営業形態</Heading>
              <Divider mt="2" mb="4" />
              <Stack spacing={4}>
                <FormControl
                  id="businessHour"
                  isRequired
                  isInvalid={!!errors.businessHour}
                >
                  <FormLabel>診療時間</FormLabel>
                  <Controller
                    name="businessHour"
                    defaultValue={hospital.hospitalBusinessForm?.business_hour}
                    control={control}
                    rules={{ required: '診療時間を入力してください' }}
                    render={({ field }) => (
                      <Textarea isInvalid={!!errors.businessHour} {...field} />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.businessHour?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="closedDay"
                  isRequired
                  isInvalid={!!errors.closedDay}
                >
                  <FormLabel>休診日</FormLabel>
                  <Controller
                    name="closedDay"
                    defaultValue={hospital.hospitalBusinessForm?.closed_day}
                    control={control}
                    rules={{ required: '休診日を入力してください' }}
                    render={({ field }) => (
                      <Textarea isInvalid={!!errors.closedDay} {...field} />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.closedDay?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="businessFormRemark">
                  <FormLabel>備考</FormLabel>
                  <Controller
                    name="businessFormRemark"
                    defaultValue={hospital.hospitalBusinessForm?.remark}
                    control={control}
                    render={({ field }) => <Textarea {...field} />}
                  />
                </FormControl>
                <FormControl
                  id="insuranceEnabled"
                  isRequired
                  isInvalid={!!errors.insuranceEnabled}
                >
                  <FormLabel>保険利用可否</FormLabel>
                  <Controller
                    name="insuranceEnabled"
                    defaultValue={
                      hospital.hospitalBusinessForm?.insurance_enabled
                    }
                    control={control}
                    rules={{ required: '保険利用可否を入力してください' }}
                    render={({ field }) => (
                      <Select isInvalid={!!errors.insuranceEnabled} {...field}>
                        <option value="○">○</option>
                        <option value="×">×</option>
                        <option value="不明">不明</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.insuranceEnabled?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Box>
            <Box mb="8">
              <Heading size="md">予約</Heading>
              <Divider mt="2" mb="4" />
              <Stack spacing={4}>
                <FormControl
                  id="reservationRequired"
                  isRequired
                  isInvalid={!!errors.reservationRequired}
                >
                  <FormLabel>要不要</FormLabel>
                  <Controller
                    name="reservationRequired"
                    defaultValue={hospital.hospitalReservationStatus?.required}
                    rules={{ required: '要不要を入力してください' }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        isInvalid={!!errors.reservationRequired}
                        {...field}
                      >
                        <option value="○">○</option>
                        <option value="×">×</option>
                        <option value="不明">不明</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.reservationRequired?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="reservable"
                  isRequired
                  isInvalid={!!errors.reservable}
                >
                  <FormLabel>可否</FormLabel>
                  <Controller
                    name="reservable"
                    defaultValue={
                      hospital.hospitalReservationStatus?.reservable
                    }
                    rules={{ required: '可否を入力してください' }}
                    control={control}
                    render={({ field }) => (
                      <Select isInvalid={!!errors.reservable} {...field}>
                        <option value="○">○</option>
                        <option value="×">×</option>
                        <option value="不明">不明</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.reservable?.message}
                  </FormErrorMessage>
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
                <FormControl
                  id="nightServiceStatus"
                  isRequired
                  isInvalid={!!errors.nightServiceStatus}
                >
                  <FormLabel>営業可否</FormLabel>
                  <Controller
                    name="nightServiceStatus"
                    defaultValue={hospital.hospitalNightServiceOption?.status}
                    rules={{ required: '営業可否を入力してください' }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isInvalid={!!errors.nightServiceStatus}
                      >
                        <option value="○">○</option>
                        <option value="×">×</option>
                        <option value="不明">不明</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.nightServiceStatus?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="nightUrgentActionStatus"
                  isRequired
                  isInvalid={!!errors.nightUrgentActionStatus}
                >
                  <FormLabel>緊急夜間対応可否</FormLabel>
                  <Controller
                    name="nightUrgentActionStatus"
                    defaultValue={
                      hospital.hospitalNightUrgentActionOption?.status
                    }
                    rules={{ required: '緊急夜間対応可否を入力してください' }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isInvalid={!!errors.nightUrgentActionStatus}
                      >
                        <option value="○">○</option>
                        <option value="×">×</option>
                        <option value="不明">不明</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.nightUrgentActionStatus?.message}
                  </FormErrorMessage>
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
                <FormControl
                  id="jsavaRegistered"
                  isRequired
                  isInvalid={!!errors.jsavaRegistered}
                >
                  <FormLabel>日本小動物獣医師会(JSAVA)認定状況</FormLabel>
                  <Controller
                    name="jsavaRegistered"
                    defaultValue={
                      hospital.hospitalCertificationOption?.jsava_registered
                    }
                    rules={{ required: '認定状況を入力してください' }}
                    control={control}
                    render={({ field }) => (
                      <Select isInvalid={!!errors.jsavaRegistered} {...field}>
                        <option value="○">○</option>
                        <option value="×">×</option>
                        <option value="不明">不明</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.jsavaRegistered?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="nichijuRegistered"
                  isRequired
                  isInvalid={!!errors.nichijuRegistered}
                >
                  <FormLabel>日本獣医師会認定状況</FormLabel>
                  <Controller
                    name="nichijuRegistered"
                    defaultValue={
                      hospital.hospitalCertificationOption?.nichiju_registered
                    }
                    rules={{ required: '認定状況を入力してください' }}
                    control={control}
                    render={({ field }) => (
                      <Select isInvalid={!!errors.nichijuRegistered} {...field}>
                        <option value="○">○</option>
                        <option value="×">×</option>
                        <option value="不明">不明</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.nichijuRegistered?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Box>
            <Box display="grid" justifyContent="center">
              <PrimaryButton
                size="lg"
                mt="16"
                type="submit"
                isLoading={loading}
                disabled={
                  Object.keys(errors).length !== 0 ||
                  !isAdminData?.readIsAdmin.isAdmin
                }
              >
                更新する
              </PrimaryButton>
            </Box>
          </form>
        </Card>
      ) : null}
    </>
  );
};

Edit.getLayout = (page: ReactElement) => (
  <InternalLayout>{page}</InternalLayout>
);

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<NoProps, Params> = async () => ({
  props: {},
});

export default Edit;
