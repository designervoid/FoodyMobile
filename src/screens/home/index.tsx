import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useStore} from '@nanostores/react';
import ExpandableCalendar from 'components/ui/expandable-calendar';
import {BottomScreenButton} from 'components/wrappers/bottom-screen-button';
import {useTypedNavigation} from 'hooks';
import {currentDate as currentDateNS} from 'stores';

export function HomeScreen() {
  const navigation = useTypedNavigation();
  const currentDate = useStore(currentDateNS);

  return (
    <View style={stylesNonDynamic.container}>
      <ExpandableCalendar />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: 60,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BottomScreenButton
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
        </BottomScreenButton>
      </View>
    </View>
  );
}

const stylesNonDynamic = StyleSheet.create({
  container: {
    flex: 1,
  },
});
