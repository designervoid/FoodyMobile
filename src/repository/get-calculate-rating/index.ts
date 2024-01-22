import Config from 'react-native-config';
import useSWR from 'swr';

import {Response} from './interfaces';
import { useEffect } from 'react';

export function useGetCalculateRating(id: string) {
  // <response, error, key> generic
  const swrState = useSWR<
    Response,
    any,
    `${string}/calculate-rating/${string}`
  >(`${Config.BASE_URL}/calculate-rating/${id}`, endpoint =>
    fetch(endpoint).then(res => res.json()),
  );

  useEffect(() => {
    swrState.mutate();
  }, []);

  return swrState;
}
