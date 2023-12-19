/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const useContinuousLocation = () => {
  // state to hold location
  const [location, setLocation] = useState({});
  // function to check permissions and get Location

  useEffect(() => {
    const result = requestLocationPermission();
    var watchId;
    result.then(res => {
      if (res) {
        watchId = Geolocation.watchPosition(
          position => {
            setLocation(position);
          },
          error => {
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 6000,
            distanceFilter: 0,
          },
        );
      }
    });

    Geolocation.clearWatch(watchId);
  }, []);
  return location;
};
// Function to Send Location to twitter

export default useContinuousLocation;
