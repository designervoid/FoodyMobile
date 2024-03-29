/**
 * @jest-environment @shopify/react-native-skia/jestEnv.mjs
 */
import "react-native";
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import {RootNavigator} from '../src/navigators/root';

import '@testing-library/jest-native/extend-expect';

describe('Testing react navigation', () => {
  test('Start page - Auth', async () => {
    const component = (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    waitFor(() => render(component));

    const authText = await screen.findByText('Auth Screen');

    expect(authText).toBeOnTheScreen();
  });

  test('From Auth to Home', async () => {
    const component = (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    waitFor(() => render(component));

    fireEvent.press(screen.getByText('On Home'));

    expect(JSON.stringify(screen).includes('CalendarProvider')).toBeTruthy();
  });
});
