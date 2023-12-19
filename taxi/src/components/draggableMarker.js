import {View, Text, Image} from 'react-native';
import React, {useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DraggableMarker() {
  return (
    <View
      style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
        zIndex: 1,
      }}>
      <Icon name="person-pin" size={50} color="#4169e1" />
    </View>
  );
}
