import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { AuthScreen, HomeScreen } from 'screens';
import { MealNavigator } from 'navigators/meal';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTypedNavigation } from 'hooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

const EmptyHeader = (_: NativeStackHeaderProps) => <View></View>;

const createEmptyHeader = () => {
    return {
        header: (props: NativeStackHeaderProps) => <EmptyHeader {...props} />,
    }
}

export const provideOptions = (payload?: NativeStackHeaderProps['options'], withEmptyHeader = false) => {
    return {
        options: {
            ...(withEmptyHeader && createEmptyHeader()),
            ...payload,
        }
    }
}

export function RootNavigator() { 
    return <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} {...provideOptions(undefined, true)} />
        <Stack.Screen name="Home" component={HomeScreen} {...provideOptions({ title: 'Food Diary', headerLeft: () => <></>, gestureEnabled: false })} />
        <Stack.Screen name="Meal" component={MealNavigator} {...provideOptions({ headerLeft: () => {
            const navigation = useTypedNavigation();

            return <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}><Text>Back</Text></TouchableOpacity>;
        }, gestureEnabled: false })}
        />
    </Stack.Navigator>
}