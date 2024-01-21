import { Button } from "components/ui/button";
import { Select } from "components/ui/select";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddMealItem } from "repository/add-meal-item";
import { useStore } from '@nanostores/react';
import { selectedValueRepository } from "stores";
import { useMemo } from "react";

export function MealAddScreen() {
    const insets = useSafeAreaInsets();
    const styles = stylesDynamic(insets);
    const { swrState, handleAddMealItem } = useAddMealItem();
    const foodTypeId = useStore(selectedValueRepository);    

    return <View style={styles.container}>
        <Select />
        <Button style={[(swrState.isMutating) && { backgroundColor: 'grey' }, styles.button]} variant="green" onPress={() => {
            if (foodTypeId) {
                handleAddMealItem({ FoodTypeId: foodTypeId as 1 | 2 | 3, FoodItemIds: [], Reminder: '2021-01-10T10:00:00' })
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