import { Button } from "components/ui/button";
import { Select } from "components/ui/select";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddMealItem } from "repository";
import { useStore } from '@nanostores/react';
import { selectedValueRepository } from "stores";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MealStackParamList } from "navigators/meal";
import Clock1 from 'assets/icons/clock-1.svg';
import { useTypedNavigation } from "hooks";

type Props = NativeStackScreenProps<MealStackParamList, "MealAdd">;

export function MealAddScreen(props: Props) {
    const { date } = props.route.params;
    
    const insets = useSafeAreaInsets();
    const styles = stylesDynamic(insets);
    const { swrState, handleAddMealItem } = useAddMealItem();
    const foodTypeId = useStore(selectedValueRepository);
    const navigation = useTypedNavigation();

    return <View style={styles.container}>
        <View style={{ marginTop: 31 }}>
            <Select />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', borderColor: '#D1CEE9', borderWidth: 1, paddingVertical: 20, marginTop: 31 }}>
            <View style={{ paddingLeft: 30.39, display: 'flex', flexDirection: 'row' }}>
                <Clock1 />
                <Text style={{ marginHorizontal: 10 }}>Meal time</Text>
            </View>
            <View style={{ paddingLeft: 52 }}>
                <Text>{date}</Text>
            </View>
            <TouchableOpacity style={{ paddingLeft: 39.39 }} onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
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