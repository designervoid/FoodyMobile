import {useEffect} from 'react';

import Config from 'react-native-config';
import useSWR, {mutate} from 'swr';

import {MealItem} from './interfaces';

export function useGetMealItem(id: string) {
  const key = `${Config.BASE_URL}/get-meal-item/${id}`;

  const fetcher = (endpoint: string) =>
    fetch(endpoint, {headers: {'Content-Type': 'application/json'}}).then(res =>
      res.json(),
    );
  const swrState = useSWR<MealItem, any, `${string}/get-meal-item/${string}`>(
    key as `${string}/get-meal-item/${string}`,
    fetcher,
  );

  const refreshData = () => {
    mutate(key);
  };

  useEffect(() => {
    swrState.mutate();
  }, []);

  return {swrState, refreshData};
}
