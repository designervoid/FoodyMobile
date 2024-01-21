import React, {useRef, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ExpandableCalendar as ExpandableCalendarBase, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import testIDs from 'utils/testIDs';
import {agendaItems, getMarkedDates} from 'mocks/agendaItems';
import AgendaItem from 'mocks/AgendaItem';
import {getTheme, themeColor, lightThemeColor} from 'mocks/theme';

import './locales';
import { UpdateSources } from 'react-native-calendars/src/expandableCalendar/commons';
import { currentDate as currentDateNS, setCurrentDate } from 'stores';
import { useStore } from '@nanostores/react';

const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
}

const ExpandableCalendar = (props: Props) => {
  const {weekView} = props;
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });
  const currentDate = useStore(currentDateNS)

  const onDateChanged = useCallback((date: string, _: UpdateSources) => {
    setCurrentDate(new Date(date));
  }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  const renderItem = useCallback(({item, index, section}: any) => {
    const isLastSection = ITEMS[ITEMS.length - 1].title === section.title;
    const isLastItemInSection = index === section.data.length - 1;

    const itemStyle = isLastSection && isLastItemInSection ? { marginBottom: 100 } : {};
    
    return (
      <View style={itemStyle}>
        <AgendaItem item={item}/>
      </View>
    );
  }, []);

  return (
    <CalendarProvider
      // work around tests
      date={currentDate.split ? currentDate.split('T')[0] : ''}
      onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      style={{ marginTop: 30 }}
      // disabledOpacity={0.6}
      theme={todayBtnTheme.current}
      // todayBottomMargin={16}
      testID="CalendarProvider"
    >
      {weekView ? (
        <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={marked.current}/>
      ) : (
        <ExpandableCalendarBase
          testID={testIDs.expandableCalendar.CONTAINER}
          // horizontal={false}
          hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          style={{ marginTop: 0, }}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
  );
};

export default ExpandableCalendar;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  }
});