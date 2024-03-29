import {useEffect} from 'react';

import {useTypedNavigation} from 'hooks';
import Config from 'react-native-config';
import {useGetMealItems} from 'repository';
import {setSelectedValueRepository} from 'stores';
import useSWRMutation from 'swr/mutation';

type MealItem = {
  FoodItemIds: number[];
  FoodTypeId: 1 | 2 | 3;
  Reminder: number;
};

async function addMealItem(url: string, {arg}: {arg: MealItem}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export function useAddMealItem() {
  const swrState = useSWRMutation<
    string,
    any,
    `${string}/add-meal-item`,
    MealItem,
    any
  >(`${Config.BASE_URL}/add-meal-item`, addMealItem);
  const navigation = useTypedNavigation();
  const swrState0 = useGetMealItems();

  const {trigger} = swrState;

  useEffect(() => {
    if (!swrState.isMutating && swrState.data) {
      setSelectedValueRepository(null);
      swrState0.refreshData();
      navigation.navigate('Home');
    }
  }, [swrState.isMutating, swrState.data, swrState0, navigation]);

  const handleAddMealItem = async (mealItem: MealItem) => {
    try {
      await trigger({...mealItem});
    } catch (e) {
      console.error(e);
    }
  };

  return {swrState, handleAddMealItem};
}
