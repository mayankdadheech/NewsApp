import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';

const SwitchStack = createNativeStackNavigator();
/*
Docs for SplashScreen reference:
https://medium.com/@rafiulansari/building-a-react-native-app-part-iii-app-icon-and-splash-screen-a14505aa9036
https://avishekkumaar.medium.com/how-to-setting-up-a-splash-screen-in-react-native-for-ios-and-android-in-2024-d6edfeb5442d
*/
function MainNavigator() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SwitchStack.Navigator>
      <SwitchStack.Group screenOptions={{headerShown: false}}>
        <SwitchStack.Screen name="AppNavigator" component={AppNavigator} />
      </SwitchStack.Group>
    </SwitchStack.Navigator>
  );
}

export default MainNavigator;