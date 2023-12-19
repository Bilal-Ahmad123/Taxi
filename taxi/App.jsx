import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';

import MyDrawer from './src/navigation/Drawer';
import {ToastProvider} from 'react-native-toast-notifications';

import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {ModalProvider, createModalStack} from 'react-native-modalfy';
import RideRequest from './src/components/Modal/RideRequest';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RideTime from './src/components/Modal/RideTime';
const defaultOptions = {backdropOpacity: 0.6, disableFlingGesture: true};
const modalConfig = {RideRequest, RideTime};
const stack = createModalStack(modalConfig, defaultOptions);
export const navigationRef = createNavigationContainerRef();
const App = () => {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ToastProvider offsetTop={80}>
          <Provider store={store}>
            <ModalProvider stack={stack}>
              <NavigationContainer ref={navigationRef}>
                <MyDrawer />
              </NavigationContainer>
            </ModalProvider>
          </Provider>
        </ToastProvider>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  image: {
    width: 35,
    height: 35,
  },
});

export default App;
