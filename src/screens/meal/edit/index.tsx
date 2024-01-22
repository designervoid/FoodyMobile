import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MealStackParamList} from 'navigators/meal';
import { useGetMealItem } from 'repository/get-meal-item';
import { FlatList, Text, View } from 'react-native';
import { useGetFoodItems } from 'repository/get-food-items';
import { useGetCalculateRating } from 'repository/get-calculate-rating';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Props = NativeStackScreenProps<MealStackParamList, 'MealEdit'>;

function Rating({ id }: { id: number | string }) {
    const swrState = useGetCalculateRating(id.toString());

    if (swrState.isLoading) {
        return <Text>Loading...</Text>;
    }

    return <Text>{swrState.data?.rating}</Text>;
}

export function MealEditScreen(props: Props) {
  const {id} = props.route.params;
  const swrState0 = useGetMealItem(id);
  const swrState1 = useGetFoodItems();

  return <>
    <FlatList data={swrState1.data || []} renderItem={(q) => {
        return <View style={{ height: 103.29, paddingHorizontal: 20, paddingVertical: 13, borderRadius: 10, backgroundColor: '#fff', marginTop: 17, marginHorizontal: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <BouncyCheckbox size={25}
                    fillColor="#3AC2C3"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "green", borderRadius: 5 }}
                    innerIconStyle={{ borderWidth: 2, borderRadius: 5, borderColor: '#3AC2C3' }}
                    isChecked={swrState0.data?.foodItemIds.includes(Number(q.item.id))} 
                />
            <Rating id={q.item.id} />
            <Text style={{ marginLeft: 5 }}>{JSON.stringify(q.item.id)}</Text>
        </View>;
        }}
        />
    </>;
}
