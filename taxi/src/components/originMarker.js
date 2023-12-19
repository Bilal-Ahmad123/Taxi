import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';

export default function OriginMarker() {
  const originName = useSelector(state => state.Location.originName);
  return (
    <View
      style={{
        position: 'absolute',
        left: '43%',
        top: '46%',
        zIndex: 1,
      }}>
      <View style={styles1.markerContainer}>
        <View style={styles1.markerCircle}>
          <View
            style={{
              backgroundColor: 'white',
              width: responsiveWidth(2),
              height: responsiveHeight(1),
            }}></View>
        </View>
        <View style={styles1.markerPin} />
      </View>
    </View>
  );
}

export const styles1 = StyleSheet.create({
  markerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  markerCircle: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
    borderRadius: responsiveWidth(4),
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerPin: {
    width: 4,
    height: 16,
    backgroundColor: 'black',
  },
});
