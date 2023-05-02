/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CodePush from 'react-native-code-push';

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <GestureHandlerRootView style={styles.screen}>
          <RootStack />
        </GestureHandlerRootView>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default CodePush(App);
