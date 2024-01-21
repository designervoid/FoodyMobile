import { Button } from "components/ui/button";
import { Select } from "components/ui/select";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddMealItem } from "repository/add-meal-item";
import { useStore } from '@nanostores/react';
import { selectedValueRepository } from "stores";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MealStackParamList } from "navigators/meal";

type Props = NativeStackScreenProps<MealStackParamList, "MealAdd">;

export function MealAddScreen(props: Props) {
    const { date } = props.route.params;

    console.log(date);
    
    const insets = useSafeAreaInsets();
    const styles = stylesDynamic(insets);
    const { swrState, handleAddMealItem } = useAddMealItem();
    const foodTypeId = useStore(selectedValueRepository);    

    return <View style={styles.container}>
        <Select />
        <Button style={[(swrState.isMutating) && { backgroundColor: 'grey' }, styles.button]} variant="green" onPress={() => {
            if (foodTypeId && date) {
                handleAddMealItem({ FoodTypeId: foodTypeId as 1 | 2 | 3, FoodItemIds: [], Reminder: date })
            }
        }} disabled={swrState.isMutating}>{swrState.isMutating ? 'Saving meal...' : swrState.data ?? 'Save'}</Button>
    </View>;
}

export const stylesDynamic = ({ bottom }: EdgeInsets) => StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        height: Dimensions.get('window').height,
    },
    button: { 
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? bottom : 10,
        width: Dimensions.get('window').width - (30 * 2), 
    }
});