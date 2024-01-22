import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';

import {useStore} from '@nanostores/react';
import AgendaItem from 'components/ui/calendar/agenda/item/AgendaItem';
import {
  getTheme,
  lightThemeColor,
  themeColor,
} from 'components/ui/calendar/theme';
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar as ExpandableCalendarBase,
  WeekCalendar,
} from 'react-native-calendars';
import {UpdateSources} from 'react-native-calendars/src/expandableCalendar/commons';
import {useGetMealItems} from 'repository';
import {currentDate as currentDateNS, setCurrentDate} from 'stores';
import testIDs from 'utils/testIDs';
import './locales';

interface Props {
  weekView?: boolean;
}

const ExpandableCalendar = (props: Props) => {
  const {weekView} = props;

  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
  const currentDate = useStore(currentDateNS);
  const {data: mealItems} = useGetMealItems();

  const agendaItems = useMemo(() => {
    const items = mealItems?.map(item => {
      const date = item.reminder.toString().split('T')[0];
      let data;
      if (item.foodItems && item.foodItems.length > 0) {
        data = item.foodItems.map(foodItem => ({
          title: foodItem.name || 'No title',
          foodType: item.foodType?.name || 'Unknown Type',
          nutrients: `Fat: ${foodItem.fat}, Carbs: ${foodItem.carbohydrates}, Sugar: ${foodItem.sugar}, Cholesterol: ${foodItem.cholesterol}`,
          imageUrl: foodItem.imageUrl || '',
          id: item.id,
        }));
      } else {
        data = [
          {
            title: 'No Food Items',
            foodType: 'N/A',
            nutrients: 'N/A',
            imageUrl: '',
            id: item.id,
          },
        ];
      }
      const id = item.id;
      return {title: date, data, id};
    });
    items?.sort(
      (a, b) => new Date(a.title).getTime() - new Date(b.title).getTime(),
    );
    return items;
  }, [mealItems]);

  const markedDates = useMemo(() => {
    const marked = {};
    mealItems?.forEach(item => {
      const date = item.reminder.toString().split('T')[0];
      (marked as any)[date] = {marked: true};
    });
    return marked;
  }, [mealItems]);

  const onDateChanged = useCallback((date: string, _: UpdateSources) => {
    setCurrentDate(new Date(date));
  }, []);

  const renderItem = useCallback(({item, _, __}: any) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <CalendarProvider
      date={currentDate.split ? currentDate.split('T')[0] : ''}
      onDateChanged={onDateChanged}
      showTodayButton
      style={{marginTop: 30}}
      theme={todayBtnTheme.current}
      testID="CalendarProvider">
      {weekView ? (
        <WeekCalendar
          testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
          markedDates={markedDates}
        />
      ) : (
        <ExpandableCalendarBase
          testID={testIDs.expandableCalendar.CONTAINER}
          hideArrows
          theme={theme.current}
          firstDay={1}
          markedDates={markedDates}
          style={{marginTop: 0}}
        />
      )}
      <AgendaList
        sections={agendaItems || []}
        renderItem={renderItem}
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

export default ExpandableCalendar;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
});
