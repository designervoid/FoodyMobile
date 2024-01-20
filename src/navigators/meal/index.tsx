import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { provideOptions } from 'navigators';
import { MealAddScreen, MealConfirmScreen } from 'screens';

export type MealStackParamList = {
    MealAdd: undefined;
    MealConfirm: undefined;
};

const MealStack = createNativeStackNavigator<MealStackParamList>();

export function MealNavigator() {
    return (
        <MealStack.Navigator>
            <MealStack.Screen name="MealAdd" component={MealAddScreen} {...provideOptions(undefined, true)} />
            <MealStack.Screen name="MealConfirm" component={MealConfirmScreen} {...provideOptions(undefined, true)} />
        </MealStack.Navigator>
    );
}