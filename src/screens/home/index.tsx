import { CalendarList } from 'components/calendar-list';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <CalendarList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
