import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-calendars', () => {
  return {
    CalendarList: () => 'CalendarList',
    ExpandableCalendar: () => 'ExpandableCalendar',
    AgendaList: () => 'AgendaList',
    CalendarProvider: () => 'CalendarProvider',
    WeekCalendar: () => 'WeekCalendar',
    LocaleConfig: {
      locales: {},
      defaultLocale: '',
    },
  };
});
jest.mock('@nanostores/react', () => ({
  useStore: jest.fn(() => ({})),
}));

jest.mock('nanostores', () => ({
  atom: jest.fn(() => ({})),
}));

jest.mock('react-native-config', () => ({}));
