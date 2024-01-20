import useSWR from 'swr';
import Config from "react-native-config";
import { FoodTypes } from './interfaces';


export function useGetFoodTypes() {
    const swrState = useSWR<FoodTypes, any, `${string}/get-food-types`>(`${Config.BASE_URL}/get-food-types`, (endpoint) =>  fetch(endpoint).then((res) => res.json()));

    return swrState;
}