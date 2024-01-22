export interface FoodItem {
  id:            number;
  name:          null | string;
  imageUrl:      null | string;
  foodType:      number;
  fat:           number;
  carbohydrates: number;
  sugar:         number;
  cholesterol:   number;
}

export type FoodItems = FoodItem[];