import Config from 'react-native-config';
import useSWR from 'swr';

import {Response} from './interfaces';

export function useGetCalculateRating(id: string) {
  // <response, error, key> generic
  const swrState = useSWR<Response, any, `${string}/calculate-rating/${string}`>(
    `${Config.BASE_URL}/calculate-rating/${id}`,
    endpoint => fetch(endpoint).then(res => res.json()),
  );

  return swrState;
}
