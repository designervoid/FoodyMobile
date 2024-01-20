import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ExpandableCalendar from 'components/ui/expandable-calendar';
import { useTypedNavigation } from 'hooks';
import { Button } from 'components/ui/button';
import { stylesDynamic } from 'screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export function HomeScreen() {
  const navigation = useTypedNavigation();
  const insets = useSafeAreaInsets();
  const styles = stylesDynamic(insets);

  return (
    <View style={stylesNonDynamic.container}>
      <Text>Home Screen</Text>
      <ExpandableCalendar />
      <View style={{ position: 'absolute', width: '100%', height: 60, bottom: styles.button.bottom, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => { navigation.navigate('Meal', { screen: 'MealAdd' }) }} style={{ 
          width: 64,
          height: 64,
        }} textStyle={{ padding: 0, margin: 0 }} variant="green">+</Button>
      </View>
    </View>
  );
}

const stylesNonDynamic = StyleSheet.create({
  container: {
    flex: 1,
  },
});
