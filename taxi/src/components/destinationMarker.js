import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {styles1} from './originMarker';
export default function DestinationMarker() {
  return (
    <View
      style={{
        position: 'absolute',
        left: '43%',
        top: '44%',
        zIndex: 1,
      }}>
      <View style={styles.markerContainer}>
        <View style={styles.markerCircle}>
          <View
            style={{
              backgroundColor: 'white',
              width: responsiveWidth(3),
              height: responsiveHeight(1.5),
              borderRadius: responsiveWidth(1.5),
            }}></View>
        </View>
        <View style={styles.markerPin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  markerCircle: {
    width: responsiveWidth(12),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(6),
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerPin: {
    width: 4,
    height: 16,
    backgroundColor: 'green',
  },
});
