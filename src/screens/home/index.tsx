import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ExpandableCalendar from 'components/expandable-calendar';
import { useTypedNavigation } from 'hooks';

export function HomeScreen() {
  const navigation = useTypedNavigation();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <ExpandableCalendar />
      <Button title="+" onPress={() => { navigation.navigate('Meal', { screen: 'MealAdd' }) }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
