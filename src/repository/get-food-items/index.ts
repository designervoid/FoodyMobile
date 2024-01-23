import Config from 'react-native-config';
import useSWR from 'swr';

import {FoodItems} from './interfaces';
import { useEffect } from 'react';

export function useGetFoodItems() {
  // <response, error, key> generic
  const swrState = useSWR<FoodItems, any, `${string}/get-food-items`>(
    `${Config.BASE_URL}/get-food-items`,
    endpoint => fetch(endpoint, { headers: { 'Content-Type': 'application/json' }}).then(res => res.json()),
  );

  useEffect(() => {
    swrState.mutate();
  }, []);

  return swrState;
}
