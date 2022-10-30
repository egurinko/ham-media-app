import type { Hospital } from '@/services/api/internal_api/types';

export type Name = string;
export type Deleted = boolean;
export type PrefectureId = string;
export type InternalReputationStar = string;
export type Hospitals = Hospital[] | undefined;

export type SetName = UseStateAction<Name>;
export type SetDeleted = UseStateAction<Deleted>;
export type SetPrefectureId = UseStateAction<PrefectureId>;
export type SetInternalReputationStar = UseStateAction<InternalReputationStar>;
export type SearchHospitals = () => void;
