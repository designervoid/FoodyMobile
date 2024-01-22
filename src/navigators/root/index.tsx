import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {
  CardStyleInterpolators,
  createStackNavigator,
  StackHeaderProps,
  TransitionSpecs,
} from '@react-navigation/stack';
import {useTypedNavigation} from 'hooks';
import {MealNavigator} from 'navigators/meal';
import {AuthScreen, HomeScreen} from 'screens';
import {RootStackParamList} from 'types';

const Stack = createStackNavigator<RootStackParamList>();

const EmptyHeader = (_: StackHeaderProps) => <View />;

const createEmptyHeader = () => {
  return {
    header: (props: StackHeaderProps) => <EmptyHeader {...props} />,
  };
};

export const provideOptions = (
  payload?: StackHeaderProps['options'],
  withEmptyHeader = false,
) => {
  return {
    options: {
      ...(withEmptyHeader && createEmptyHeader()),
      ...payload,
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  };
};

export function RootNavigator() {
  const navigation = useTypedNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        {...provideOptions(undefined, true)}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        {...provideOptions({
          title: 'Food Diary',
          headerLeft: () => <></>,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        name="Meal"
        component={MealNavigator}
        {...provideOptions({
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{paddingLeft: 20}}>
                <Text>Back</Text>
              </TouchableOpacity>
            );
          },
          gestureEnabled: true,
        })}
      />
    </Stack.Navigator>
  );
}
