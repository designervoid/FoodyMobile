import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { AuthScreen } from 'screens/auth';
import { HomeScreen } from 'screens/home';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() { 
    return <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
}