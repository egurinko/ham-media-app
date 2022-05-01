import type { PublicGetHospitalConnectionQueryVariables } from '@/api/public_api/types';

export type SearchText =
  PublicGetHospitalConnectionQueryVariables['searchText'];
export type CurrentLocation =
  PublicGetHospitalConnectionQueryVariables['currentLocation'];
export type Reservable =
  PublicGetHospitalConnectionQueryVariables['reservable'];
export type NightServiceOption =
  PublicGetHospitalConnectionQueryVariables['nightServiceOption'];
export type InsuranceEnabled =
  PublicGetHospitalConnectionQueryVariables['insuranceEnabled'];
export type JsavaOption =
  PublicGetHospitalConnectionQueryVariables['jsavaOption'];
export type NichijuOption =
  PublicGetHospitalConnectionQueryVariables['nichijuOption'];
export type Recommended =
  PublicGetHospitalConnectionQueryVariables['recommended'];

export type SetSearchText = UseStateAction<SearchText>;
export type SetCurrentLocation = UseStateAction<CurrentLocation>;
export type SetReservable = UseStateAction<Reservable>;
export type SetNightServiceOption = UseStateAction<NightServiceOption>;
export type SetInsuranceEnabled = UseStateAction<InsuranceEnabled>;
export type SetJsavaOption = UseStateAction<JsavaOption>;
export type SetNichijuOption = UseStateAction<NichijuOption>;
export type SetRecommended = UseStateAction<Recommended>;

export type GetInitialHospitalConnection = (
  variables: Partial<PublicGetHospitalConnectionQueryVariables>
) => void;

export type GetContinuousHospitalConnection = () => void;
