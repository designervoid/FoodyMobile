import Config from 'react-native-config';
import useSWR from 'swr';

import {MealItem} from './interfaces';
import { useEffect } from 'react';

export function useGetMealItem(id: string) {
  // <response, error, key> generic
  const swrState = useSWR<MealItem, any, `${string}/get-meal-item/${string}`>(
    `${Config.BASE_URL}/get-meal-item/${id}`,
    endpoint => fetch(endpoint).then(res => res.json()),
  );

  useEffect(() => {
    swrState.mutate();
  }, []);

  return swrState;
}
