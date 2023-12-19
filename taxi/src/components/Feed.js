import {Button, Text, View} from 'react-native';
import React from 'react';
import {DrawerActions} from '@react-navigation/native';

export const Feed = ({navigation}) => {
  return (
    <View>
      <Text style={{color: 'black'}}></Text>
      <Button
        title="click"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </View>
  );
};
