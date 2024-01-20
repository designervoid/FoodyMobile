import { NavigatorScreenParams } from "@react-navigation/native";
import { MealStackParamList } from "navigators/meal";

export type RootStackParamList = {
    Auth: undefined;
    Home: undefined;
    Meal: NavigatorScreenParams<MealStackParamList> | undefined;
};