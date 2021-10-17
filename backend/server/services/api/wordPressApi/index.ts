import axios, { AxiosResponse } from 'axios';
import type {
  GetOfferingHamstersResponse,
  GetOfferingHamsterResponse,
} from './types';

const instance = axios.create({
  baseURL: 'https://ham-media.net/wp-json/wp/v2/',
  headers: {
    'content-type': 'application/json',
  },
});

const OFFERING_TAG_ID = 61;
const getOfferingHamsters = (): Promise<
  AxiosResponse<GetOfferingHamstersResponse>
> =>
  instance.get<GetOfferingHamstersResponse>('posts', {
    params: {
      tags: OFFERING_TAG_ID,
    },
  });

export { getOfferingHamsters };
export type { GetOfferingHamstersResponse, GetOfferingHamsterResponse };
