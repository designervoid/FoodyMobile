import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useStore} from '@nanostores/react';
import {AgendaItem} from 'components/ui/calendar/agenda/item/AgendaItem';
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
import {FoodItems} from 'repository/get-food-items/interfaces';
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
  const {data: mealItems, mutate} = useGetMealItems();

  const calculateFoodFat = useCallback((foodItems: FoodItems) => {
    return foodItems.reduce((prev, curr) => prev + curr.fat, 0).toFixed(2);
  }, []);

  const calculateFoodCarbs = useCallback((foodItems: FoodItems) => {
    return foodItems.reduce((prev, curr) => prev + curr.carbohydrates, 0).toFixed(2);
  }, []);

  const calculateFoodSugar = useCallback((foodItems: FoodItems) => {
    return foodItems.reduce((prev, curr) => prev + curr.sugar, 0).toFixed(2);
  }, []);

  const calculateFoodCholesterol = useCallback((foodItems: FoodItems) => {
    return foodItems.reduce((prev, curr) => prev + curr.cholesterol, 0).toFixed(2);
  }, []);

  const agendaItems = useMemo(() => {
    const items = mealItems?.map(item => {
      const date = item.reminder.toString().split('T')[0];
      let data;
      if (item.foodItems && item.foodItems.length > 0) {
        data = [{
          title: (
            <View>
              <View>
                <Text>{item.foodType.name}</Text>
                <Text>{item.id}</Text>
              </View>
            </View>
          ),
          foodType: item.foodType?.name || 'Unknown Type',
          nutrients: `Fat: ${calculateFoodFat(
            item.foodItems,
          )}, Carbs: ${calculateFoodCarbs(
            item.foodItems,
          )}, Sugar: ${calculateFoodSugar(
            item.foodItems,
          )}, Cholesterol: ${calculateFoodCholesterol(item.foodItems)}`,
          imageUrl: '',
          id: item.id,
        }];
      } else {
        data = [
          {
            title: (
              <View>
                <View>
                  <Text>{item.foodType.name}</Text>
                  <Text>{item.id}</Text>
                </View>
              </View>
            ),
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
      (a, b) => a.id - b.id,
    );
    return items;
  }, [
    mealItems,
    calculateFoodFat,
    calculateFoodCarbs,
    calculateFoodSugar,
    calculateFoodCholesterol,
  ]);

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

  useEffect(() => {
    mutate();
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
