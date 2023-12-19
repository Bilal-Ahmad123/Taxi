import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function DrawerMenuButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        width: responsiveWidth(13),
        position: 'absolute',
        top: responsiveHeight(2),
        zIndex: 10,
        left: responsiveWidth(3),
        height: responsiveHeight(6.2),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(4),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="menu" size={25} color="#900" />
    </TouchableOpacity>
  );
}
