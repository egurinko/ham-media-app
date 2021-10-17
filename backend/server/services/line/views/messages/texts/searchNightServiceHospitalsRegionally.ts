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

export type RegionalHospitals = RegionalHospital[];
export type RegionalHospital = Hospital & {
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

const PRIMARY = '#FF6C4A';
const TEXT_SECONDARY = '#757575';
const GRAY_BACKGROUND = '#F5F5F5';

export const createSearchNightServiceHospitalsRegionallyReplyMessage = (
  hospitals: RegionalHospitals
): FlexMessage => ({
  type: 'flex',
  altText: '夜間病院の検索結果',
  contents: {
    type: 'carousel',
    contents: hospitals.map((hospital) => createCarouselContent(hospital)),
  },
});

const createCarouselContent = (hospital: RegionalHospital): FlexBubble => ({
  type: 'bubble',
  header: createHeader(hospital),
  body: createBody(hospital),
  footer: createFooter(hospital.id),
  styles: createStyles(),
});

const createHeader = (hospital: RegionalHospital): FlexBox => ({
  type: 'box',
  layout: 'vertical',
  spacing: 'md',
  margin: 'md',
  contents: [
    createHeaderHospitalName(hospital.name, hospital.url),
    createHeaderHospitalAddress(hospital),
    createHeaderHospitalPhoneNumber(hospital.hospitalAddress?.phone_number),
    createHeaderHospitalUrl(hospital.url),
  ],
});

const createHeaderHospitalName = (name: string, url: string): FlexComponent => {
  const baseFlexComponent: FlexComponent = {
    type: 'text',
    text: name,
    size: 'xxl',
    weight: 'bold',
    adjustMode: 'shrink-to-fit',
    wrap: false,
  };
  if (url) {
    return {
      ...baseFlexComponent,
      action: {
        type: 'uri',
        label: 'action',
        uri: url,
      },
    };
  }
  return baseFlexComponent;
};

const createHeaderHospitalAddress = (
  hospital: RegionalHospital
): FlexComponent => ({
  type: 'box',
  layout: 'horizontal',
  contents: [
    {
      type: 'image',
      url: 'https://user-images.githubusercontent.com/23233648/137619190-89632b1f-9829-423e-b491-8b70ada62dd8.png',
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

const createHeaderHospitalPhoneNumber = (
  phoneNumber?: string
): FlexComponent => ({
  type: 'box',
  layout: 'horizontal',
  contents: [
    {
      type: 'image',
      url: 'https://user-images.githubusercontent.com/23233648/137635042-eb81fc25-6f50-4733-9687-8f1675440b76.png',
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

const createHeaderHospitalUrl = (url: string): FlexComponent => ({
  type: 'box',
  layout: 'horizontal',
  spacing: 'md',
  margin: 'md',
  justifyContent: 'center',
  alignItems: 'center',
  contents: [
    {
      type: 'image',
      url: 'https://user-images.githubusercontent.com/23233648/137635040-d489bf1a-de06-4522-ac2a-4a9a8f77b746.png',
      flex: 1,
    },
    createHeaderHospitalUrlLink(url),
  ],
});

const createHeaderHospitalUrlLink = (url: string): FlexComponent => {
  const baseFlexComponent: FlexComponent = {
    type: 'text',
    text: url,
    color: TEXT_SECONDARY,
    flex: 11,
    decoration: 'underline',
  };
  if (url) {
    return {
      ...baseFlexComponent,
      action: {
        type: 'uri',
        label: 'action',
        uri: url,
      },
    };
  }
  return {
    ...baseFlexComponent,
    text: 'なし',
  };
};

const createBody = (hospital: RegionalHospital): FlexBox => ({
  type: 'box',
  layout: 'vertical',
  margin: 'none',
  spacing: 'none',
  contents: [
    createHospitalBusinessForm(hospital.hospitalBusinessForm),
    createHospitalRemarks(hospital),
  ],
});

const createHospitalBusinessForm = (
  hospitalBusinessForm?: RegionalHospital['hospitalBusinessForm']
): FlexComponent => ({
  type: 'box',
  layout: 'vertical',
  spacing: 'none',
  backgroundColor: GRAY_BACKGROUND,
  cornerRadius: '10px',
  paddingAll: '10px',
  margin: 'lg',
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
      text: hospitalBusinessForm?.business_hour
        ? hospitalBusinessForm.business_hour
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
      text: hospitalBusinessForm?.closed_day
        ? hospitalBusinessForm.closed_day
        : '不明',
      flex: 6,
      wrap: true,
      size: 'sm',
    },
  ],
});

const createHospitalRemarks = (hospital: RegionalHospital): FlexComponent => ({
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
  backgroundColor: GRAY_BACKGROUND,
  cornerRadius: '10px',
  paddingAll: '10px',
  margin: 'md',
});

const createFooter = (hospitalId: BigInt): FlexBox => ({
  type: 'box',
  layout: 'vertical',
  contents: [
    {
      type: 'button',
      style: 'primary',
      color: PRIMARY,
      action: {
        type: 'uri',
        label: '詳しく病院情報を見る',
        uri: `https://ham-media-app.net/hospitals/${hospitalId}`,
      },
    },
  ],
});

const createStyles = () => ({
  header: {
    separator: true,
    separatorColor: TEXT_SECONDARY,
  },
  body: {
    separatorColor: '#d8d8d8',
    separator: true,
  },
});
