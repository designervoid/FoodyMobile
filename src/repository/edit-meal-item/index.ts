import {useEffect} from 'react';

import {useTypedNavigation} from 'hooks';
import Config from 'react-native-config';
import {useGetMealItems} from 'repository';
import useSWRMutation from 'swr/mutation';
import { useGetMealItem } from 'repository/get-meal-item';

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
  const swrState = useSWRMutation<
    string,
    any,
    `${string}/edit-meal-item/${string}`,
    MealItem,
    any
  >(`${Config.BASE_URL}/edit-meal-item/${id}`, editMealItem);
  const swrState1 = useGetMealItem(id);

  const {trigger} = swrState;

  const handleAddMealItem = async (mealItem: MealItem) => {
    try {
      if (swrState1.data) await trigger({...mealItem, FoodTypeId: swrState1.data.foodTypeId as 1 | 2 | 3, Reminder: swrState1.data.reminder as unknown as string });
    } catch (e) {
      console.error(e);
    }
  };

  return {swrState, handleAddMealItem};
}
