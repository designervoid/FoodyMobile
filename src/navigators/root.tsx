import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { AuthScreen } from 'screens/Auth';
import { HomeScreen } from 'screens/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() { 
    return <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
}