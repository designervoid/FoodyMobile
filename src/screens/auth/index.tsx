import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {useTypedNavigation} from 'hooks/useTypedNavigation';

export function AuthScreen() {
  const navigation = useTypedNavigation();

  return (
    <View style={styles.container}>
      <Text>Auth Screen</Text>
      <Button
        title="On Home"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
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
