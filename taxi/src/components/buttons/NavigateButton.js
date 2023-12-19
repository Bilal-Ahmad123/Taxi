import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NavigateIcon from 'react-native-vector-icons/Ionicons';
const NavigateButton = ({originLatLng, destinationLatLng}) => {
  const showDirections = () => {
    if (originLatLng && destinationLatLng) {
      var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=${originLatLng.latitude},${originLatLng.longitude} &destination=${destinationLatLng.latitude},${destinationLatLng.longitude}`;
      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            console.log("Can't handle url: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  };
  return (
    <TouchableOpacity
      onPress={showDirections}
      style={{
        width: responsiveWidth(30),
        position: 'absolute',
        zIndex: 10,
        left: responsiveWidth(5),
        height: responsiveHeight(6.2),
        top: responsiveHeight(3),
        backgroundColor: '#3457D5',
        borderRadius: responsiveHeight(4),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', marginRight: responsiveWidth(1)}}>
        Navigate
      </Text>
      <NavigateIcon name="navigate" color="white" size={20} />
    </TouchableOpacity>
  );
};

export default NavigateButton;
