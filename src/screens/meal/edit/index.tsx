import React, {useEffect, useMemo} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {useStore} from '@nanostores/react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomScreenButton} from 'components/wrappers/bottom-screen-button';
import {LinearGradient} from 'components/wrappers/linear-gradient';
import {atom} from 'nanostores';
import {MealStackParamList} from 'navigators/meal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useEditMealItem} from 'repository/edit-meal-item';
import {useGetCalculateRating} from 'repository/get-calculate-rating';
import {useGetFoodItems} from 'repository/get-food-items';
import {FoodItem} from 'repository/get-food-items/interfaces';
import {useGetMealItem} from 'repository/get-meal-item';

type Props = NativeStackScreenProps<MealStackParamList, 'MealEdit'>;

function Rating({id}: {id: number | string}) {
  const swrState = useGetCalculateRating(id.toString());

  if (swrState.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <LinearGradient percentage={swrState.data?.rating} />
      <Text>{swrState.data?.rating}</Text>
    </>
  );
}

const ids = atom<number[]>([]);

function setIds(payload: number[]) {
  if (payload.length === 0) {
    ids.set([]);
  }
  ids.set([...ids.get(), ...payload]);
}

const renderFoodItem = ({item}: {item: FoodItem}) => {
  return (
    <View style={styles.foodItemContainer} key={item.id}>
      <View style={styles.imageWrapperFoodItem}>
        {item.imageUrl && <Image src={item.imageUrl} style={styles.image} />}
      </View>
      <View style={styles.foodItemInfo}>
        <Text style={styles.foodItemName}>{item.name ?? 'No title 🙁'}</Text>
        <Text>Id: {item.id}</Text>
        <Rating id={item.id} />
      </View>
    </View>
  );
};

const renderFoodItemCheckbox = (q: FoodItem) => {
  return (
    <View key={q.id} style={styles.foodItemContainer}>
      <View style={styles.imageWrapperFoodItem}>
        {q.imageUrl && <Image src={q.imageUrl} style={styles.image} />}
      </View>
      <View style={styles.foodItemInfo}>
        <Text style={styles.foodItemName}>{q.name ?? 'No title 🙁'}</Text>
        <Text>Id: {q.id}</Text>
        <Rating id={q.id} />
      </View>
      <View style={styles.bouncyCheckboxWrapper}>
        <BouncyCheckbox
          size={30}
          fillColor="#3AC2C3"
          unfillColor="#FFFFFF"
          iconStyle={styles.iconStyle}
          innerIconStyle={styles.innerIconStyle}
          onPress={isChecked => {
            if (isChecked) {
              setIds([q.id]);
            } else {
              ids.set(ids.get().filter(id => id !== q.id));
            }
          }}
        />
      </View>
    </View>
  );
};

export function MealEditScreen(props: Props) {
  const {id} = props.route.params;
  const {swrState: swrState0, refreshData} = useGetMealItem(id);
  const swrState1 = useGetFoodItems();
  const {swrState: swrState2, handleAddMealItem} = useEditMealItem(id);
  const ids0 = useStore(ids);

  const iso8601 = useMemo(() => {
    return swrState0?.data?.reminder.replace('Z', '');
  }, [swrState0?.data?.reminder]);

  const iso8601Splitted = useMemo(() => {
    return iso8601?.split('T');
  }, []);

  const iso8601Date = useMemo(() => {
    return iso8601Splitted?.[0];
  }, []);

  const iso8601Time = useMemo(() => {
    return iso8601Splitted?.[1];
  }, []);

  useEffect(() => {
    refreshData();
    return () => {
      setIds([]);
    };
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Text style={[styles.h1, styles.px20, styles.py20]}>My meal {iso8601Date} {iso8601Time}</Text>
        <View>
          {swrState0.data?.foodItems.map(item => renderFoodItem({item}))}
        </View>
        <Text style={[styles.h1, styles.px20, styles.py20]}>
          Available foods
        </Text>
        <View>{swrState1.data?.map(item => renderFoodItemCheckbox(item))}</View>
      </ScrollView>
      <BottomScreenButton
        disabled={false}
        style={[swrState2.isMutating && {backgroundColor: 'grey'}]}
        variant="green"
        onPress={() => {
          handleAddMealItem({FoodItemIds: ids0});
        }}>
          {swrState2.isMutating ? 'Saving food into meal...' : 'Save'}
      </BottomScreenButton>
    </View>
  );
}

const styles = StyleSheet.create({
  foodItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    height: 102,
    alignItems: 'center',
  },
  foodItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodItemDetail: {
    fontSize: 14,
    color: 'grey',
  },
  image: {
    width: 80,
    height: 80,
    padding: 20,
  },
  imageWrapperFoodItem: {width: 103, display: 'flex', justifyContent: 'center', alignItems: 'center'},
  iconStyle: {borderColor: 'green', borderRadius: 5},
  innerIconStyle: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#3AC2C3',
  },
  bouncyCheckboxWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  foodItemInfo: {marginVertical: 0, paddingBottom: 0},
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  px20: {
    paddingHorizontal: 20,
  },
  py20: {
    paddingVertical: 20,
  },
});
