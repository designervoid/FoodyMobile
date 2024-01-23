import {FoodItem} from 'repository/get-food-items/interfaces';
import {FoodType} from 'repository/get-food-types/interfaces';

export interface MealItem {
  id: number;
  foodItemIds: number[];
  reminder: Date;
  foodTypeId: number;
  foodType: FoodType;
  foodItems: FoodItem[];
}

export type MealItems = MealItem[];

export enum Name {
  Breakfast = 'Breakfast',
  Dinner = 'Dinner',
  Lunch = 'Lunch',
}
