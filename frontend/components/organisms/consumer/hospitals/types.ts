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

export type GetInitialHospitalConnectionVariables =
  Partial<PublicGetHospitalConnectionQueryVariables>;
export type GetInitialHospitalConnection = (
  variables: GetInitialHospitalConnectionVariables
) => void;

export type PERSISTED = {
  searchText?: SearchText;
  currentLocation?: CurrentLocation;
  reservable?: Reservable;
  nightServiceOption?: NightServiceOption;
  insuranceEnabled?: InsuranceEnabled;
  jsavaOption?: JsavaOption;
  nichijuOption?: NichijuOption;
  recommended?: Recommended;
};

export type GetContinuousHospitalConnection = () => void;
