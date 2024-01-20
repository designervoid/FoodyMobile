import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MealAddScreen, MealConfirmScreen } from 'screens';

export type MealStackParamList = {
    MealAdd: undefined;
    MealConfirm: undefined;
};

const MealStack = createNativeStackNavigator<MealStackParamList>();

export function MealNavigator() {
    return (
        <MealStack.Navigator>
            <MealStack.Screen name="MealAdd" component={MealAddScreen} />
            <MealStack.Screen name="MealConfirm" component={MealConfirmScreen} />
        </MealStack.Navigator>
    );
}