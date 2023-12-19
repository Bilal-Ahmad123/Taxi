import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function DoneButton({navigation, setLocation}) {
  return (
    <TouchableOpacity
      style={{
        width: responsiveWidth(90),
        position: 'absolute',
        top: responsiveHeight(90),
        zIndex: 10,
        left: responsiveWidth(5),
        height: responsiveHeight(8),
        backgroundColor: '#7fff00',
        borderRadius: responsiveHeight(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        setLocation();
        navigation.navigate('Rider');
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: responsiveFontSize(3),
        }}>
        Done
      </Text>
    </TouchableOpacity>
  );
}
