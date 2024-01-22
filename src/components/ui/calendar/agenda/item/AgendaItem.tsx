import React, {useCallback, useId} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useTypedNavigation} from 'hooks';
import testIDs from 'utils/testIDs';

interface ItemProps {
  item: any;
}

export const isObjectEmpty = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return true;
  }

  return Object.keys(obj).length === 0;
};

export const AgendaItem = (props: ItemProps) => {
  const navigation = useTypedNavigation();
  const id = useId();
  const {item} = props;

  const itemPressed = useCallback(() => {
    navigation.navigate('Meal', {screen: 'MealEdit', params: {id: item.id}});
  }, [item.id, navigation]);

  return (
    <TouchableOpacity
      onPress={itemPressed}
      style={styles.item}
      testID={testIDs.agenda.ITEM}
      key={id}>
      <View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <Text style={styles.itemTitleText}>{item.nutrients}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    display: 'flex',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});
