import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { AuthScreen, HomeScreen } from 'screens';
import { MealNavigator } from 'navigators/meal';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() { 
    return <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Meal" component={MealNavigator} />
    </Stack.Navigator>
}