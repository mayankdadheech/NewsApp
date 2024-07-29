import React from 'react';

// import {StyleSheet} from 'react-native';
/* 
Docs reference for handling navigation
https://reactnavigation.org/docs/getting-started/
https://reactnavigation.org/docs/native-stack-navigator/
*/
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './src/store/storeConfig';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
