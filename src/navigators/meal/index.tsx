import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {provideOptions} from 'navigators';
import {MealAddScreen, MealEditScreen} from 'screens';

export type MealStackParamList = {
  MealAdd: {date: string};
  MealEdit: {id: string};
};

const MealStack = createStackNavigator<MealStackParamList>();

export function MealNavigator() {
  return (
    <MealStack.Navigator>
      <MealStack.Screen
        name="MealAdd"
        component={MealAddScreen}
        {...provideOptions(undefined, true)}
      />
      <MealStack.Screen
        name="MealEdit"
        component={MealEditScreen}
        {...provideOptions(undefined, true)}
      />
    </MealStack.Navigator>
  );
}
