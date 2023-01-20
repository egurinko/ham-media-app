import { Box, Text, Divider } from '@chakra-ui/react';
import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import { memo } from 'react';
import { Card } from '@/components/atoms/Card';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { InsuranceIcon } from '@/components/atoms/assets/InsuranceIcon';
import { LinkIcon } from '@/components/atoms/assets/LinkIcon';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { PhoneIcon } from '@/components/atoms/assets/PhoneIcon';
import type { FC } from 'react';
import { GoogleMap } from '@/components/organisms/GoogleMap';
import { HospitalTags } from '@/components/organisms/consumer/hospitals/HospitalTags';
import type { PublicApiHospitalFieldsFragment } from '@/services/api/public_api/types';
import { HOSPITAL_STATUSES } from '@/utils/constant';

type Props = {
  hospital: PublicApiHospitalFieldsFragment;
};

const DetailCard: FC<Props> = ({ hospital }) => (
  <Box my="4">
    <Card>
      <Box my="2">
        <Box display="flex" flexDirection="column">
          <Box mb="1">
            <Text fontSize="2xl" fontWeight="bold">
              {hospital.name}
            </Text>
          </Box>
          <Box fill="primary.main" mb="2">
            <Box display="flex" flexDirection="row" alignItems="center">
              <MapPinIcon width={15} height={15} />
              <Text fontSize="sm" color="text.secondary" ml="1">
                {hospital.hospitalAddress?.prefecture.name}
                {hospital.hospitalAddress?.address}
              </Text>
            </Box>
          </Box>
          <Box fill="primary.main" mb="2">
            <Box display="flex" flexDirection="row" alignItems="center">
              <LinkIcon width={15} height={15} />
              <Text
                textDecoration="underline"
                fontSize="sm"
                color="text.secondary"
                ml="1"
              >
                <a href={hospital.url} target="_blank" rel="noreferrer">
                  {hospital.url}
                </a>
              </Text>
            </Box>
          </Box>
          <Box mb="2">
            <HospitalTags hospital={hospital} spacing={2} />
          </Box>
          <Divider my="4" />
          <Box display="flex" flexDirection="column">
            <Box mb="2">
              <Text
                fontSize="xl"
                borderLeft="4px"
                borderColor="primary.main"
                pl="2"
                as="span"
              >
                診療時間
              </Text>
              <Box whiteSpace="pre-line" mt="4">
                {hospital.hospitalBusinessForm?.business_hour}
              </Box>
            </Box>
            <Box my="2">
              <Text>■ 休診日</Text>
              <Text>{hospital.hospitalBusinessForm?.closed_day}</Text>
            </Box>
            <Box my="2">
              <Text>■ 備考</Text>
              <Text whiteSpace="pre-line">
                {hospital.hospitalBusinessForm?.remark}
              </Text>
            </Box>
          </Box>

          <Divider my="4" />
          <Box display="flex" flexDirection="column">
            <Box mb="2">
              <Text
                fontSize="xl"
                borderLeft="4px"
                borderColor="primary.main"
                pl="2"
                as="span"
              >
                予約
              </Text>
              <Box my="2" mt="4">
                {hospital.hospitalReservationStatus?.required ===
                HOSPITAL_STATUSES.YES
                  ? '■ 予約必須'
                  : hospital.hospitalReservationStatus?.reservable ===
                    HOSPITAL_STATUSES.NO
                  ? '■ 予約不可'
                  : hospital.hospitalReservationStatus?.required ===
                      HOSPITAL_STATUSES.NO &&
                    hospital.hospitalReservationStatus?.reservable ===
                      HOSPITAL_STATUSES.YES
                  ? '■ 予約なしでOK'
                  : '■ 予約については公式HPを確認'}
              </Box>
              <Box my="2">
                <Text>■ 備考</Text>
                <Text whiteSpace="pre-line">
                  {hospital.hospitalReservationStatus?.remark}
                </Text>
              </Box>
            </Box>
          </Box>

          <Divider my="4" />
          <Box display="flex" flexDirection="column">
            <Box mb="2">
              <Text
                fontSize="xl"
                borderLeft="4px"
                borderColor="primary.main"
                pl="2"
                as="span"
              >
                夜間営業
              </Text>
              <Box my="2" mt="4">
                {hospital.hospitalNightServiceOption?.status ===
                HOSPITAL_STATUSES.YES
                  ? '■ 夜間営業あり'
                  : hospital.hospitalNightServiceOption?.status ===
                    HOSPITAL_STATUSES.NO
                  ? '■ 夜間営業なし'
                  : '■ 夜間営業については公式HPを確認'}
              </Box>
              <Box my="2">
                {hospital.hospitalNightUrgentActionOption?.status ===
                HOSPITAL_STATUSES.YES
                  ? '■ 夜間救急対応あり'
                  : hospital.hospitalNightUrgentActionOption?.status ===
                    HOSPITAL_STATUSES.NO
                  ? '■ 夜間救急対応なし'
                  : '■ 夜間救急対応については公式HPを確認'}
              </Box>
              <Box my="2">
                <Text>■ 備考</Text>
                <Text whiteSpace="pre-line">
                  {hospital.hospitalNightServiceOption?.remark}
                </Text>
              </Box>
            </Box>
          </Box>

          <Divider my="4" />
          <Box my="2">
            <Box display="flex" flexDirection="row" alignItems="center" mb="2">
              <InsuranceIcon width={20} height={20} />
              <Text ml="2" fontSize="lg">
                保険利用可否{' '}
                {hospital.hospitalBusinessForm?.insurance_enabled ===
                HOSPITAL_STATUSES.YES
                  ? HOSPITAL_STATUSES.YES
                  : 'なし'}
              </Text>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" mb="2">
              <Text ml="2" fontSize="lg">
                日本小動物獣医師会(JSAVA)所属{' '}
                {hospital.hospitalCertificationOption?.jsava_registered ===
                HOSPITAL_STATUSES.YES
                  ? HOSPITAL_STATUSES.YES
                  : 'なし'}
              </Text>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" mb="2">
              <Text ml="2" fontSize="lg">
                日本獣医師会所属{' '}
                {hospital.hospitalCertificationOption?.nichiju_registered ===
                HOSPITAL_STATUSES.YES
                  ? HOSPITAL_STATUSES.YES
                  : 'なし'}
              </Text>
            </Box>
          </Box>

          <Divider my="4" />
          <SecondaryButton
            fill="primary.main"
            p="4"
            borderRadius="5"
            textAlign="center"
          >
            <a href={`tel:${hospital.hospitalAddress?.phone_number}`}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <PhoneIcon width={20} height={20} />
                <Text fontSize="md" ml="2">
                  {hospital.hospitalAddress?.phone_number}
                </Text>
              </Box>
            </a>
          </SecondaryButton>
        </Box>
      </Box>
    </Card>
    {hospital.hospitalAddress?.hospitalAddressGeoLocation ? (
      <Box my="4">
        <Card>
          <GoogleMap
            height={400}
            currentLat={
              hospital.hospitalAddress.hospitalAddressGeoLocation.latitude
            }
            currentLng={
              hospital.hospitalAddress.hospitalAddressGeoLocation.longitude
            }
          >
            <MarkerF
              position={{
                lat: hospital.hospitalAddress.hospitalAddressGeoLocation
                  .latitude,
                lng: hospital.hospitalAddress.hospitalAddressGeoLocation
                  .longitude,
              }}
            />
            <InfoWindowF
              position={{
                lat:
                  hospital.hospitalAddress.hospitalAddressGeoLocation.latitude +
                  0.012,
                lng: hospital.hospitalAddress.hospitalAddressGeoLocation
                  .longitude,
              }}
            >
              <Box display="flex" flexDirection="column">
                <a href={hospital.url} target="_blank" rel="noreferrer">
                  <Text fontSize="md" textDecoration="underline">
                    {hospital.name}
                  </Text>
                </a>
                <Text fontSize="xs">
                  {hospital.hospitalAddress.phone_number}
                </Text>
                <Text fontSize="xs">{hospital.hospitalAddress.address}</Text>
              </Box>
            </InfoWindowF>
          </GoogleMap>
        </Card>
      </Box>
    ) : null}
  </Box>
);

const Memoed = memo(DetailCard);

export { Memoed as DetailCard };
