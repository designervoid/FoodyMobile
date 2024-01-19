import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import {RootNavigator} from '../src/navigators/root';
import { expect, jest, describe, test } from '@jest/globals';

import '@testing-library/jest-native/extend-expect'; 
import { HomeScreen } from 'screens';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-calendars', () => {
  return { CalendarList: () => 'CalendarList' };
});

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

    expect(screen.getByText('Home Screen')).toBeOnTheScreen();
  });
});

describe('Testing HomeScreen', () => {
  test('Renders CalendarList', () => {
    waitFor(() => render(<HomeScreen />));

    const calendarList = screen;
    expect(JSON.stringify(calendarList).includes('CalendarList')).toBeTruthy();
  });
});