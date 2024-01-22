import React, {useRef, useCallback, useMemo, useId} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ExpandableCalendar as ExpandableCalendarBase, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import testIDs from 'utils/testIDs';
import AgendaItem from 'components/ui/calendar/agenda/item/AgendaItem';
import {getTheme, themeColor, lightThemeColor} from 'components/ui/calendar/theme';
import './locales';
import { UpdateSources } from 'react-native-calendars/src/expandableCalendar/commons';
import { currentDate as currentDateNS, setCurrentDate } from 'stores';
import { useStore } from '@nanostores/react';
import { useGetMealItems } from 'repository';

interface Props {
  weekView?: boolean;
}

const ExpandableCalendar = (props: Props) => {
  const {weekView} = props;

  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });
  const currentDate = useStore(currentDateNS)
  const { data: mealItems } = useGetMealItems();

  const agendaItems = useMemo(() => {
    const items = mealItems?.map(item => {
      const date = item.reminder.toString().split('T')[0];
      let data;
  
      if (item.foodItems && item.foodItems.length > 0) {
        data = item.foodItems.map(foodItem => ({
          title: foodItem.name || 'No title',
          foodType: item.foodType?.name || 'Unknown Type',
          nutrients: `Fat: ${foodItem.fat}, Carbs: ${foodItem.carbohydrates}, Sugar: ${foodItem.sugar}, Cholesterol: ${foodItem.cholesterol}`,
          imageUrl: foodItem.imageUrl || 'default_image_url',
        }));
      } else {
        data = [{
          title: 'No Food Items',
          foodType: 'N/A',
          nutrients: 'N/A',
          imageUrl: 'default_image_url',
        }];
      }
      
      const id = item.id;
  
      return { title: date, data, id };
    });
  
    items?.sort((a, b) => new Date(a.title).getTime() - new Date(b.title).getTime());
  
    return items;
  }, [mealItems]);
  

  const markedDates = useMemo(() => {
    const marked = {};
    mealItems?.forEach(item => {
      const date = item.reminder.toString().split('T')[0];
      (marked as any)[date] = { marked: true };
    });
    return marked;
  }, [mealItems]);

  const onDateChanged = useCallback((date: string, _: UpdateSources) => {
    setCurrentDate(new Date(date));
  }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  const renderItem = useCallback(({item, _, __}: any) => {
    return (
      <AgendaItem item={item} />
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
        <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={markedDates}/>
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
          markedDates={markedDates}
          style={{ marginTop: 0, }}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={agendaItems || []}
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