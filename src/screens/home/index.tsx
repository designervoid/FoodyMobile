import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useStore} from '@nanostores/react';
import {Button} from 'components/ui/button';
import ExpandableCalendar from 'components/ui/expandable-calendar';
import {useTypedNavigation} from 'hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {stylesDynamic} from 'screens';
import {currentDate as currentDateNS} from 'stores';

export function HomeScreen() {
  const navigation = useTypedNavigation();
  const insets = useSafeAreaInsets();
  const styles = stylesDynamic(insets);
  const currentDate = useStore(currentDateNS);

  return (
    <View style={stylesNonDynamic.container}>
      <ExpandableCalendar />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: 60,
          bottom: styles.button.bottom,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={() => {
            currentDate &&
              navigation.navigate('Meal', {
                screen: 'MealAdd',
                params: {date: currentDate.split('T')[0]},
              });
          }}
          style={{
            width: 64,
            height: 64,
          }}
          textStyle={{padding: 0, margin: 0}}
          variant="green">
          +
        </Button>
      </View>
    </View>
  );
}

const stylesNonDynamic = StyleSheet.create({
  container: {
    flex: 1,
  },
});
