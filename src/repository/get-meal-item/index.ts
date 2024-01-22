import Config from 'react-native-config';
import useSWR from 'swr';

import {MealItem} from './interfaces';

export function useGetMealItem(id: string) {
  // <response, error, key> generic
  const swrState = useSWR<MealItem, any, `${string}/get-meal-item/${string}`>(
    `${Config.BASE_URL}/get-meal-item/${id}`,
    endpoint => fetch(endpoint).then(res => res.json()),
  );

  return swrState;
}
