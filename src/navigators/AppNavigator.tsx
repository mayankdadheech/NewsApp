import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import MainScreen from '@screens/MainScreen';
import {SCREENS} from '@constants/index';

const Stack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.MAIN} component={MainScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
