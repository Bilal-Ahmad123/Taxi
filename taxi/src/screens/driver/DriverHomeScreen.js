import {View, Text, StyleSheet} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import useContinuousLocation from '../../customHooks/getLocation/getLocation';
import {socket} from '../../navigation/Drawer';
import {useSelector} from 'react-redux';
import DrawerMenuButton from '../../components/buttons/drawerMenuButton';
import {useModal} from 'react-native-modalfy';

const DriverHomeScreen = ({navigation}) => {
  const {openModal} = useModal();
  const [currentLocation, setCurrentLocation] = useState();
  const mapRef = useRef();
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position?.coords);
    });
  }, []);
  const location = useContinuousLocation();
  const uid = useSelector(state => state.User.uid);
  const user = useSelector(state => state.User.user);
  if (mapRef?.current && location) {
    mapRef.current?.animateToRegion(
      {
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.0045,
      },

      3000,
    );
  }

  useEffect(() => {
    if (Object.keys(location).length > 0 && uid) {
      socket.emit('myLocation', {
        location: location?.coords,
        uid,
        userRole: user?._data?.role,
        rideStatus: 'free',
      });
    }

    return () => {
      socket.off('myLocation');
    };
  }, [location?.coords?.latitude, location?.coords?.longitude]);

  useEffect(() => {
    socket.on('getRideRequest', data => {
      openModal('RideRequest', {
        origin: data.origin,
        destination: data.destination,
        location: data.location,
        riderUid: data.riderUid,
      });
    });

    return () => socket.off('getRideRequest');
  }, []);

  return (
    <Fragment>
      <DrawerMenuButton navigation={navigation} />
      <MapView
        style={styles.map}
        mapPadding={{
          top: responsiveHeight(40),
          right: 0,
          bottom: 0,
          left: 0,
        }}
        ref={mapRef}
        mapType="standard"
        showsUserLocation
        zoomEnabled={true}
        tracksViewChanges={false}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: currentLocation?.latitude || 0,
          longitude: currentLocation?.longitude || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      />
    </Fragment>
  );
};

export default DriverHomeScreen;

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
