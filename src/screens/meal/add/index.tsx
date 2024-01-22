import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useStore} from '@nanostores/react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Clock1 from 'assets/icons/clock-1.svg';
import {Select} from 'components/ui/select';
import {BottomScreenButton} from 'components/wrappers/bottom-screen-button';
import {useTypedNavigation} from 'hooks';
import {MealStackParamList} from 'navigators/meal';
import {useAddMealItem} from 'repository';
import {selectedValueRepository} from 'stores';

type Props = NativeStackScreenProps<MealStackParamList, 'MealAdd'>;

export function MealAddScreen(props: Props) {
  const {date} = props.route.params;
  const {swrState, handleAddMealItem} = useAddMealItem();
  const foodTypeId = useStore(selectedValueRepository);
  const navigation = useTypedNavigation();

  return (
    <View style={styles.container}>
      <View style={{marginTop: 31}}>
        <Select />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderColor: '#D1CEE9',
          borderWidth: 1,
          paddingVertical: 20,
          marginTop: 31,
        }}>
        <View
          style={{paddingLeft: 30.39, display: 'flex', flexDirection: 'row'}}>
          <Clock1 />
          <Text style={{marginHorizontal: 10}}>Meal time</Text>
        </View>
        <View style={{paddingLeft: 52}}>
          <Text>{date}</Text>
        </View>
        <TouchableOpacity
          style={{paddingLeft: 39.39}}
          onPress={() => navigation.goBack()}>
          <Text>Go back</Text>
        </TouchableOpacity>
      </View>
      <BottomScreenButton
        style={[swrState.isMutating && {backgroundColor: 'grey'}]}
        variant="green"
        onPress={() => {
          if (foodTypeId && date) {
            handleAddMealItem({
              FoodTypeId: foodTypeId as 1 | 2 | 3,
              FoodItemIds: [],
              Reminder: date,
            });
          }
        }}
        disabled={swrState.isMutating}>
        {swrState.isMutating ? 'Saving meal...' : swrState.data ?? 'Save'}
      </BottomScreenButton>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: Dimensions.get('window').height,
  },
});
