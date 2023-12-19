import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import DestinationMarker from '../../components/destinationMarker';
import {useDispatch} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {getDestinationName} from '../../Redux/actions/locationActions';
import DoneButton from '../../components/buttons/doneButton';
export default function DestinationScreen({navigation}) {
  const [regionLocation, setRegionLocation] = useState();
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position?.coords);
    });
  }, []);

  const destinationLocation = () => {
    if (regionLocation) {
      dispatch(getDestinationName(regionLocation));
    }
  };
  return (
    <View style={{flex: 1}}>
      <DestinationMarker />
      <DoneButton navigation={navigation} setLocation={destinationLocation} />
      {currentLocation && (
        <MapView
          style={styles.map}
          showsUserLocation
          onRegionChange={() => {}}
          onRegionChangeComplete={e => {
            setRegionLocation(e);
          }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  image: {
    width: 35,
    height: 35,
  },
});
