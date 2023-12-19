import {View, Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Marker from 'react-native-maps';
import CarMark from 'react-native-vector-icons/FontAwesome5';
export var markerRef;

const CarMarker = () => {
  markerRef = useRef();

  const [oneTimeLocation, setOneTimeLocation] = useState();
  useEffect(() => {
    var watchId = Geolocation.getCurrentPosition(position => {
      setOneTimeLocation(position?.coords);
    });
    Geolocation.clearWatch(watchId);
  }, []);
  return (
    <Marker.Animated
      zindex={2}
      tracksViewChanges={false}
      ref={markerRef}
      coordinate={{
        latitude: oneTimeLocation?.latitude,
        longitude: oneTimeLocation?.longitude,
      }}>
      <CarMark name="car" size={20} color="black" />
    </Marker.Animated>
  );
};

export default CarMarker;
