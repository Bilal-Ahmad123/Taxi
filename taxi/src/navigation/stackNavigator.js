import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DestinationScreen from '../screens/rider/destinationScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="none">
      <Stack.Screen name="destinationscreen" component={DestinationScreen} />
    </Stack.Navigator>
  );
}
