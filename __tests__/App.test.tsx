import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import {RootNavigator} from '../src/navigators/root';

import '@testing-library/jest-native/extend-expect'; 

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-calendars', () => {
  return { CalendarList: () => 'CalendarList', ExpandableCalendar: () => 'ExpandableCalendar', AgendaList: () => 'AgendaList', CalendarProvider: () => 'CalendarProvider', WeekCalendar: () => 'WeekCalendar', LocaleConfig: {
    locales: {},
    defaultLocale: ''
  }
};
});
jest.mock('@nanostores/react', () => ({
  useStore: jest.fn(() => ({}))
}));

jest.mock('nanostores', () => ({
  atom: jest.fn(() => ({}))
}));

jest.mock('react-native-config', () => ({}));

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
  test('Renders ExpandableCalendar (wrapped in CalendarProvider)', () => {
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