import Config from 'react-native-config';
import useSWR from 'swr';

import {FoodItems} from './interfaces';

export function useGetFoodItems() {
  // <response, error, key> generic
  const swrState = useSWR<FoodItems, any, `${string}/get-food-items`>(
    `${Config.BASE_URL}/get-food-items`,
    endpoint => fetch(endpoint).then(res => res.json()),
  );

  return swrState;
}
