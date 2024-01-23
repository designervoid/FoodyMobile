import React, { useEffect, useId } from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Canvas,
  Rect,
  LinearGradient as LinearGradientBase,
  Skia,
  Shader,
  vec
} from "@shopify/react-native-skia";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MealStackParamList} from 'navigators/meal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useGetCalculateRating} from 'repository/get-calculate-rating';
import {useGetFoodItems} from 'repository/get-food-items';
import { useEditMealItem } from 'repository/edit-meal-item';
import { BottomScreenButton } from 'components/wrappers/bottom-screen-button';
import { useGetMealItem } from 'repository/get-meal-item';
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { FoodItem } from 'repository/get-food-items/interfaces';
import { LinearGradient } from 'components/wrappers/linear-gradient';

type Props = NativeStackScreenProps<MealStackParamList, 'MealEdit'>;

function Rating({id}: {id: number | string}) {
  const swrState = useGetCalculateRating(id.toString());

  if (swrState.isLoading) {
    return <Text>Loading...</Text>;
  }

  return <Text>{swrState.data?.rating}</Text>;
}

const ids = atom<number[]>([]);

function setIds(payload: number[]) {
  if (payload.length === 0) ids.set([]);
  ids.set([...ids.get(), ...payload]);
}

export function MealEditScreen(props: Props) {
  const {id} = props.route.params;
  const {swrState: swrState0, refreshData} = useGetMealItem(id);
  const swrState1 = useGetFoodItems();
  const {swrState: swrState2, handleAddMealItem} = useEditMealItem(id);
  const ids0 = useStore(ids);

  const renderFoodItem = ({ item }: any) => {
    return <View style={styles.foodItemContainer} key={item.id}>
      <Text style={styles.foodItemName}>{item.name}</Text>
      <Text style={styles.foodItemDetail}>Type: {item.foodType}</Text>
      <Text style={styles.foodItemDetail}>Fat: {item.fat}</Text>
      <Text style={styles.foodItemDetail}>Carbs: {item.carbohydrates}</Text>
      <Text style={styles.foodItemDetail}>Sugar: {item.sugar}</Text>
      <Text style={styles.foodItemDetail}>Cholesterol: {item.cholesterol}</Text>
    </View>
  };
  
  const renderFoodItemCheckbox = (q: FoodItem) => {
    return (
      <View
        key={q.id}
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
          onPress={(isChecked) => {
            if (isChecked) {
              setIds([q.id]);
            } else {
              ids.set(ids.get().filter((id) => id !== q.id));
            }
          }}
        />
        <View style={{}}>
          <LinearGradient />
          <Rating id={q.id} />
          <Text style={{marginLeft: 5}}>Id: {q.id}</Text>
          <Text style={{marginLeft: 5}}>{`Fat: ${q.fat}`}</Text>
          <Text
            style={{
              marginLeft: 5,
            }}>{`Carbs: ${q.carbohydrates}`}</Text>
          <Text style={{marginLeft: 5}}>{`Sugar: ${q.sugar}`}</Text>
          <Text
            style={{
              marginLeft: 5,
            }}>{`Cholesterol: ${q.cholesterol}`}</Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    refreshData();
    return () => {
      setIds([]);
    }
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
        {swrState0.data?.foodItems.map(item => renderFoodItem({item}))}
        </View>
        <View>
          {swrState1.data?.map((item) => (
            renderFoodItemCheckbox(item)
          ))}
        </View>
      </ScrollView>
      <BottomScreenButton disabled={false} style={[swrState2.isMutating && {backgroundColor: 'grey'}]}
      variant="green" onPress={() => {
        handleAddMealItem({ FoodItemIds: ids0 })
      }}>Save</BottomScreenButton>
    </View>
  );
}

const styles = StyleSheet.create({
  foodItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  foodItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodItemDetail: {
    fontSize: 14,
    color: 'grey',
  },
});