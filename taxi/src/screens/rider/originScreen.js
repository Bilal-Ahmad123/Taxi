import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import {getOriginName} from '../../Redux/actions/locationActions';
import DoneButton from '../../components/buttons/doneButton';
import OriginMarker from '../../components/originMarker';
import Geolocation from 'react-native-geolocation-service';
export default function OriginScreen({navigation}) {
  const [regionLocation, setRegionLocation] = useState();
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position?.coords);
    });
  }, []);

  const setLocation = () => {
    if (regionLocation) {
      dispatch(getOriginName(regionLocation));
    }
  };
  return (
    <View style={{flex: 1}}>
      <OriginMarker />
      <DoneButton navigation={navigation} setLocation={setLocation} />
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
