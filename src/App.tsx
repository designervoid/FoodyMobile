import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from 'navigators';

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
