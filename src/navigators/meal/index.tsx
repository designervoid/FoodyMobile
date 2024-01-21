import { createStackNavigator } from '@react-navigation/stack';
import { provideOptions } from 'navigators';
import { MealAddScreen, MealConfirmScreen } from 'screens';
import { TransitionSpecs, CardStyleInterpolators} from '@react-navigation/stack';


export type MealStackParamList = {
    MealAdd: { date: string };
    MealConfirm: undefined;
};

const MealStack = createStackNavigator<MealStackParamList>();

export function MealNavigator() {
    return (
        <MealStack.Navigator>
            <MealStack.Screen name="MealAdd" component={MealAddScreen} {...provideOptions(undefined, true)}/>
            <MealStack.Screen name="MealConfirm" component={MealConfirmScreen} {...provideOptions(undefined, true)} />
        </MealStack.Navigator>
    );
}