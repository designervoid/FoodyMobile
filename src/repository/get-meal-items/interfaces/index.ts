export interface MealItem {
    id:          number;
    foodItemIds: number[];
    reminder:    Date;
    foodTypeId:  number;
    foodType:    FoodType;
    foodItems:   FoodItem[];
}

export type MealItems = MealItem[];

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

export interface FoodType {
    id:          number;
    name:        Name;
    description: string;
}

export enum Name {
    Breakfast = "Breakfast",
    Dinner = "Dinner",
    Lunch = "Lunch",
}