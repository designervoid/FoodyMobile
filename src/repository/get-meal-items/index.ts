import Config from 'react-native-config';
import useSWR from 'swr';

import {MealItems} from './interfaces';

export function useGetMealItems() {
  // <response, error, key> generic
  const swrState = useSWR<MealItems, any, `${string}/get-meal-items`>(
    `${Config.BASE_URL}/get-meal-items`,
    endpoint => fetch(endpoint).then(res => res.json()),
  );

  return swrState;
}
