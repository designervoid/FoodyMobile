import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ExpandableCalendar from 'components/expandable-calendar';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <ExpandableCalendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
