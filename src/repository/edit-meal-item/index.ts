import {useEffect} from 'react';

import {useTypedNavigation} from 'hooks';
import Config from 'react-native-config';
import {useGetMealItems} from 'repository';
import {useGetFoodItems} from 'repository/get-food-items';
import {useGetMealItem} from 'repository/get-meal-item';
import useSWRMutation from 'swr/mutation';

type MealItem = {
  FoodItemIds?: number[];
  FoodTypeId?: 1 | 2 | 3;
  Reminder?: string;
};

async function editMealItem(url: string, {arg}: {arg: MealItem}) {
  const response = await fetch(url, {
    method: 'PUT',
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

export function useEditMealItem(id: string) {
  const navigation = useTypedNavigation();
  const swrState = useSWRMutation<
    string,
    any,
    `${string}/edit-meal-item/${string}`,
    MealItem,
    any
  >(`${Config.BASE_URL}/edit-meal-item/${id}`, editMealItem);
  const {swrState: swrState1} = useGetMealItem(id);
  const swrState2 = useGetFoodItems();
  const swrState3 = useGetMealItems();

  const {trigger} = swrState;

  const handleAddMealItem = async (mealItem: MealItem) => {
    try {
      if (swrState1.data) {
        await trigger({
          ...mealItem,
          FoodTypeId: swrState1.data.foodTypeId as 1 | 2 | 3,
          Reminder: swrState1.data.reminder as unknown as string,
        });
        swrState.reset();
        swrState1.mutate();
        swrState2.mutate();
        swrState3.refreshData();
        navigation.navigate('Home');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {swrState, handleAddMealItem};
}
