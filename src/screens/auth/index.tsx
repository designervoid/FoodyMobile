import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTypedNavigation } from 'hooks/useTypedNavigation';

export function AuthScreen() {
  const navigation = useTypedNavigation();

  return (
    <View style={styles.container}>
      <Text>Auth Screen</Text>
      <Button title="On Home" onPress={() => { navigation.navigate('Home') }}></Button>
      <Button title="On Meal Add" onPress={() => { navigation.navigate('Meal', { screen: 'MealAdd' }) }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
