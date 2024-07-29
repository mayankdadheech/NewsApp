import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREENS} from '../constants';
import MainScreen from '../screens/MainScreen';

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
