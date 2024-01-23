import {useEffect} from 'react';

import Config from 'react-native-config';
import {useGetFoodItems} from 'repository/get-food-items';
import useSWR from 'swr';

import {Response} from './interfaces';

export function useGetCalculateRating(id: string) {
  // <response, error, key> generic
  const swrState = useSWR<
    Response,
    any,
    `${string}/calculate-rating/${string}`
  >(`${Config.BASE_URL}/calculate-rating/${id}`, endpoint =>
    fetch(endpoint, {headers: {'Content-Type': 'application/json'}}).then(res =>
      res.json(),
    ),
  );
  const swrState1 = useGetFoodItems();

  useEffect(() => {
    swrState.mutate();
  }, [swrState1.isLoading]);

  return swrState;
}
