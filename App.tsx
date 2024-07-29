import React from 'react';

/* 
Docs reference for handling navigation
https://reactnavigation.org/docs/getting-started/
https://reactnavigation.org/docs/native-stack-navigator/
*/
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from '@store/storeConfig';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigators from '@navigators/Navigators';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Navigators />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
