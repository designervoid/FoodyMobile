import React from 'react';
import {FlatList, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MealStackParamList} from 'navigators/meal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useGetCalculateRating} from 'repository/get-calculate-rating';
import {useGetFoodItems} from 'repository/get-food-items';
import { useEditMealItem } from 'repository/edit-meal-item';
import { BottomScreenButton } from 'components/wrappers/bottom-screen-button';

type Props = NativeStackScreenProps<MealStackParamList, 'MealEdit'>;

function Rating({id}: {id: number | string}) {
  const swrState = useGetCalculateRating(id.toString());

  console.log(swrState.error);

  if (swrState.isLoading) {
    return <Text>Loading...</Text>;
  }

  return <Text>{swrState.data?.rating}</Text>;
}

export function MealEditScreen(props: Props) {
  const {id} = props.route.params;
  const swrState1 = useGetFoodItems();
  const {swrState: swrState2, handleAddMealItem} = useEditMealItem(id);

  return (
    <>
      <FlatList
        data={swrState1.data || []}
        renderItem={q => {
          return (
            <View
              style={{
                height: 103.29,
                paddingHorizontal: 20,
                paddingVertical: 13,
                borderRadius: 10,
                backgroundColor: '#fff',
                marginTop: 17,
                marginHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <BouncyCheckbox
                size={30}
                fillColor="#3AC2C3"
                unfillColor="#FFFFFF"
                iconStyle={{borderColor: 'green', borderRadius: 5}}
                innerIconStyle={{
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: '#3AC2C3',
                }}
              />
              <View style={{}}>
                <Rating id={q.item.id} />
                <Text style={{marginLeft: 5}}>Id: {q.item.id}</Text>
                <Text style={{marginLeft: 5}}>{`Fat: ${q.item.fat}`}</Text>
                <Text
                  style={{
                    marginLeft: 5,
                  }}>{`Carbs: ${q.item.carbohydrates}`}</Text>
                <Text style={{marginLeft: 5}}>{`Sugar: ${q.item.sugar}`}</Text>
                <Text
                  style={{
                    marginLeft: 5,
                  }}>{`Cholesterol: ${q.item.cholesterol}`}</Text>
              </View>
            </View>
          );
        }}
      />
      <BottomScreenButton style={[swrState2.isMutating && {backgroundColor: 'grey'}]}
        variant="green" onPress={() => {
          // handleAddMealItem({ FoodItemIds: finalIds })
        }}>Save</BottomScreenButton>
    </>
  );
}
