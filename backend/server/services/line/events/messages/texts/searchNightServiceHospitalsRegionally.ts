import type {
  FlexMessage,
  FlexBubble,
  FlexBox,
  FlexComponent,
} from '@line/bot-sdk';
import type {
  Prefecture,
  Hospital,
  HospitalAddress,
  HospitalBusinessForm,
  HospitalNightServiceOption,
  HospitalReservationStatus,
  HospitalAddressGeoLocation,
} from '@prisma/client';
import { client } from '@/services/prisma';

export const getSearchNightServiceHospitalsRegionallyReplyMessage = async (
  text: string
): Promise<FlexMessage> => {
  const hospitals = await getRegionalHospitals(text);
  const sliced = hospitals.slice(0, 10);

  return getReplyMessage(sliced);
};

const getRegionalPrefectures = async (text: string): Promise<Prefecture[]> => {
  const userInputRegion = text.split('の')[0];
  return await client.prefecture.findMany({
    where: {
      region: {
        is: {
          name: userInputRegion,
        },
      },
    },
  });
};

type RegionalHospitals = RegionalHospital[];
type RegionalHospital = Hospital & {
  hospitalBusinessForm: HospitalBusinessForm | null;
  hospitalNightServiceOption: HospitalNightServiceOption | null;
  hospitalReservationStatus: HospitalReservationStatus | null;
  hospitalAddress:
    | null
    | (HospitalAddress & {
        hospitalAddressGeoLocation: HospitalAddressGeoLocation | null;
        prefecture: Prefecture | null;
      });
};

const getRegionalHospitals = async (
  text: string
): Promise<RegionalHospitals> => {
  const regionalPrefectures = await getRegionalPrefectures(text);

  return await client.hospital.findMany({
    where: {
      deleted: false,
      hospitalAddress: {
        is: {
          prefecture_id: {
            in: regionalPrefectures.map((prefecture) => prefecture.id),
          },
        },
      },
      hospitalNightServiceOption: {
        status: '○',
      },
    },
    include: {
      hospitalBusinessForm: true,
      hospitalNightServiceOption: true,
      hospitalReservationStatus: true,
      hospitalAddress: {
        include: {
          hospitalAddressGeoLocation: true,
          prefecture: true,
        },
      },
    },
  });
};

const getReplyMessage = (hospitals: RegionalHospitals): FlexMessage => ({
  type: 'flex',
  altText: '夜間病院の検索結果',
  contents: {
    type: 'carousel',
    contents: hospitals.map((hospital) => getCarouselContent(hospital)),
  },
});

const TEXT_SECONDARY = '#757575';
const getCarouselContent = (hospital: RegionalHospital): FlexBubble => ({
  type: 'bubble',
  header: getHeader(hospital),
  body: getBody(hospital),
  footer: getFooter(hospital.id),
  styles: getStyles(),
});

const getHeader = (hospital: RegionalHospital): FlexBox => ({
  type: 'box',
  layout: 'vertical',
  contents: [
    getHeaderHospitalName(hospital.name, hospital.url),
    getHeaderHospitalAddress(hospital),
    getHeaderHospitalPhoneNumber(hospital.hospitalAddress?.phone_number),
    {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'image',
          url: 'https://user-images.githubusercontent.com/23233648/100380543-697e3200-305a-11eb-8133-9d550013b680.png',
          flex: 1,
        },
        getHeaderHospitalUrl(hospital.url),
      ],
      spacing: 'md',
      margin: 'md',
      justifyContent: 'center',
      alignItems: 'center',
    },
  ],
  spacing: 'md',
  margin: 'md',
});

const getHeaderHospitalName = (name: string, url: string): FlexComponent => {
  if (url) {
    return {
      type: 'text',
      text: name,
      size: 'xxl',
      weight: 'bold',
      adjustMode: 'shrink-to-fit',
      wrap: false,
      action: {
        type: 'uri',
        label: 'action',
        uri: url,
      },
    };
  }
  return {
    type: 'text',
    text: name,
    size: 'xxl',
    weight: 'bold',
    adjustMode: 'shrink-to-fit',
    wrap: false,
  };
};

const getHeaderHospitalAddress = (
  hospital: RegionalHospital
): FlexComponent => ({
  type: 'box',
  layout: 'horizontal',
  contents: [
    {
      type: 'image',
      url: 'https://user-images.githubusercontent.com/23233648/100377262-43ee2a00-3054-11eb-86ae-2b618048cd05.png',
      aspectMode: 'fit',
      flex: 1,
    },
    {
      type: 'text',
      text: hospital.hospitalAddress?.address
        ? hospital.hospitalAddress.prefecture?.name +
          hospital.hospitalAddress.address
        : '不明',
      flex: 11,
      color: TEXT_SECONDARY,
      decoration: hospital.hospitalAddress?.address ? 'underline' : 'none',
    },
  ],
  justifyContent: 'center',
  alignItems: 'center',
  spacing: 'md',
  margin: 'sm',
  action: {
    type: 'uri',
    label: 'action',
    uri: encodeURI(
      `https://www.google.com/maps/search/?api=1&query=${hospital.name}`
    ),
  },
});

const getHeaderHospitalPhoneNumber = (phoneNumber?: string): FlexComponent => ({
  type: 'box',
  layout: 'horizontal',
  contents: [
    {
      type: 'image',
      url: 'https://user-images.githubusercontent.com/23233648/100377816-5ddc3c80-3055-11eb-9d2c-1a52c60d49c1.png',
      flex: 1,
    },
    {
      type: 'text',
      text: phoneNumber || '不明',
      color: TEXT_SECONDARY,
      flex: 11,
      decoration: phoneNumber ? 'underline' : 'none',
    },
  ],
  spacing: 'md',
  margin: 'md',
  justifyContent: 'center',
  alignItems: 'center',
  action: {
    type: 'uri',
    label: 'action',
    uri: `tel:${phoneNumber}`,
  },
});

const getHeaderHospitalUrl = (url: string): FlexComponent => {
  if (url) {
    return {
      type: 'text',
      text: url,
      color: TEXT_SECONDARY,
      flex: 11,
      action: {
        type: 'uri',
        label: 'action',
        uri: url,
      },
      decoration: 'underline',
    };
  }
  return {
    type: 'text',
    text: 'なし',
    color: TEXT_SECONDARY,
    flex: 11,
    decoration: 'underline',
  };
};

const getBody = (hospital: RegionalHospital): FlexBox => ({
  type: 'box',
  layout: 'vertical',
  contents: [
    {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '診療時間',
          decoration: 'underline',
          flex: 5,
          color: TEXT_SECONDARY,
        },
        {
          type: 'text',
          text: hospital.hospitalBusinessForm?.business_hour
            ? hospital.hospitalBusinessForm?.business_hour
            : '不明',
          flex: 6,
          wrap: true,
          size: 'sm',
        },
        {
          type: 'text',
          text: '■ 休診日',
          flex: 1,
          margin: 'sm',
          size: 'sm',
        },
        {
          type: 'text',
          text: hospital.hospitalBusinessForm?.closed_day
            ? hospital.hospitalBusinessForm.closed_day
            : '不明',
          flex: 6,
          wrap: true,
          size: 'sm',
        },
      ],
      spacing: 'none',
      backgroundColor: '#F5F5F5',
      cornerRadius: '10px',
      paddingAll: '10px',
      margin: 'lg',
    },
    {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'その他',
          flex: 1,
          decoration: 'underline',
          color: TEXT_SECONDARY,
        },
        {
          type: 'text',
          text:
            hospital.hospitalNightServiceOption?.status === '○'
              ? '■ 夜間営業しています\n' +
                hospital.hospitalNightServiceOption.remark
              : hospital.hospitalNightServiceOption?.status === '×'
              ? '■ 夜間営業していません'
              : '■ 夜間営業状況はわかりません',
          flex: 1,
          margin: 'xs',
          size: 'sm',
          wrap: true,
        },
        {
          type: 'text',
          text:
            hospital.hospitalReservationStatus?.required === '○'
              ? '■ 予約必須です'
              : hospital.hospitalReservationStatus?.required === '×'
              ? '■ 予約なしで診療できます'
              : '■ 予約が必須か分かりません',
          flex: 1,
          margin: 'xs',
          size: 'sm',
          wrap: true,
        },
        {
          type: 'text',
          text:
            hospital.hospitalBusinessForm?.insurance_enabled === '○'
              ? '■ 保険適用できます'
              : hospital.hospitalBusinessForm?.insurance_enabled === '×'
              ? '■ 保険適用できません'
              : '■ 保険適用状況は分かりません',
          flex: 1,
          margin: 'xs',
          size: 'sm',
          wrap: true,
        },
        {
          type: 'text',
          text:
            hospital.hospitalBusinessForm &&
            hospital.hospitalBusinessForm.remark !== ''
              ? '■ 備考\n' + hospital.hospitalBusinessForm.remark
              : '■ 備考はありません',
          flex: 1,
          margin: 'xs',
          size: 'sm',
          wrap: true,
        },
      ],
      spacing: 'none',
      backgroundColor: '#F5F5F5',
      cornerRadius: '10px',
      paddingAll: '10px',
      margin: 'md',
    },
  ],
  margin: 'none',
  spacing: 'none',
});

const getFooter = (hospitalId: BigInt): FlexBox => ({
  type: 'box',
  layout: 'vertical',
  contents: [
    {
      type: 'button',
      style: 'primary',
      color: '#FF6C4A',
      action: {
        type: 'uri',
        label: '詳しく病院情報を見る',
        uri: `https://ham-media.herokuapp.com/hospitals/${hospitalId}`,
      },
    },
  ],
});

const getStyles = () => ({
  header: {
    separator: true,
    separatorColor: TEXT_SECONDARY,
  },
  body: {
    separatorColor: '#d8d8d8',
    separator: true,
  },
});
