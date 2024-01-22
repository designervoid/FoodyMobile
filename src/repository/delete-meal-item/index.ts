import {useEffect} from 'react';

import {useTypedNavigation} from 'hooks';
import Config from 'react-native-config';
import {useGetMealItems} from 'repository';
import useSWRMutation from 'swr/mutation';

type MealItem = {
  FoodItemIds: number[];
  FoodTypeId: 1 | 2 | 3;
  Reminder: string;
};

async function deleteMealItem(url: string) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export function useDeleteMealItem(id: string) {
  const swrState = useSWRMutation<
    string,
    any,
    `${string}/edit-delete-item/${string}`,
    MealItem,
    any
  >(`${Config.BASE_URL}/edit-delete-item/${id}`, deleteMealItem);
  const navigation = useTypedNavigation();
  const swrState0 = useGetMealItems();

  const {trigger} = swrState;

  useEffect(() => {
    if (!swrState.isMutating && swrState.data) {
      swrState0.mutate();
    }
  }, [swrState.isMutating, swrState.data, swrState0, navigation]);

  const handleDeleteMealItem = async (mealItem: MealItem) => {
    try {
      await trigger({...mealItem});
    } catch (e) {
      console.error(e);
    }
  };

  return {swrState, handleDeleteMealItem};
}
