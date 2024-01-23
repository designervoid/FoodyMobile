import Config from 'react-native-config';
import useSWR, { mutate } from 'swr';

import {MealItems} from './interfaces';

export function useGetMealItems() {
  const key = `${Config.BASE_URL}/get-meal-items`;

  const fetcher = (endpoint: string) => fetch(endpoint, { headers: { 'Content-Type': 'application/json' }}).then(res => res.json());
  const swrState = useSWR<MealItems, any>(key, fetcher);

  const refreshData = () => {
    mutate(key);
  };

  return {...swrState, refreshData};
}