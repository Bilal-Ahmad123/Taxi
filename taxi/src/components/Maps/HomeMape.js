import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, Fragment, useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirection, {
  markerRef,
} from '../mapviewDirections/mapViewDirection';
import CarMark from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import useContinuousLocation from '../../customHooks/getLocation/getLocation';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {socket} from '../../navigation/Drawer';
import {Host, Portal} from 'react-native-portalize';
import HomeBottomSheet, {bottomSheetRef} from '../bottomSheet/HomeBottomSheet';
const HomeMape = ({navigation}) => {
  const mapRef = useRef();
  const originLatLng = useSelector(state => state.Location.originLatLng);
  const destinationLatLng = useSelector(
    state => state.Location.destinationLatLng,
  );
  const user = useSelector(state => state.User.user);
  const uid = useSelector(state => state.User.uid);
  const markerRefs = useRef([]);

  const location = useContinuousLocation();
  const [currentLocation, setCurrentLocation] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position?.coords);
    });
  }, []);

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (!originLatLng || !destinationLatLng) return;

    setTimeout(() => {
      mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {
          top: 100,
          right: 100,
          left: 100,
          bottom: 100,
          aimated: true,
        },
      });
    }, 50);

    return clearTimeout();
  }, [originLatLng, destinationLatLng]);

  const animateMarker = (index, locat) => {
    markerRefs.current[index].animateMarkerToCoordinate(
      {
        latitude: locat?.latitude,
        longitude: locat?.longitude,
      },
      3000,
    );
  };

  // if (markerRefs?.current[0] > 0 && location) {
  //   if (Object.keys(location).length > 0) {
  //     // mapRef.current?.animateToRegion(
  //     //   {
  //     //     latitude: location.coords?.latitude,
  //     //     longitude: location.coords?.longitude,
  //     //     latitudeDelta: 0.009,
  //     //     longitudeDelta: 0.0045,
  //     //   },

  //     //   3000,
  //     // );
  //     markerRefs.current[0].animateMarkerToCoordinate(
  //       {
  //         latitude: location.coords?.latitude,
  //         longitude: location.coords?.longitude,
  //       },
  //       3000,
  //     );
  //   }
  // }

  useEffect(() => {
    if (Object.keys(location).length > 0 && uid) {
      socket.emit('myLocation', {
        location: location?.coords,
        uid,
        userRole: user?._data?.role,
      });
    }
  }, [location?.coords?.latitude, location?.coords?.longitude]);

  useEffect(() => {
    socket.on('driverLocation', data => {
      setDrivers(prevState => {
        const driver = prevState.find(
          drive => drive.driverUid === data.driverUid,
        );
        if (!driver) {
          return [...prevState, data];
        } else {
          const newCoords = [...prevState];
          let index = newCoords.findIndex(
            obj => obj.driverUid == driver.driverUid,
          );

          newCoords[index] = {
            driverUid: driver.driverUid,

            latitude: data.latitude,
            longitude: data.longitude,
          };

          animateMarker(index, {
            latitude: data.latitude,
            longitude: data.longitude,
          });

          return newCoords;
        }
      });
    });

    return () => {
      socket.off('driverLocation');
    };
  }, []);

  const rideRequest = () => {
    socket.emit('requestRide', {
      origin: originLatLng,
      destination: destinationLatLng,
      location,
      riderUid: uid,
    });
  };

  useEffect(() => {
    socket.on('rideRequestAccepted', data => {
      navigation.navigate('routeMonitor', data);
    });

    return () => socket.off('rideRequestAccepted');
  }, []);

  return (
    <>
      {currentLocation && (
        <Host>
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
            // onUserLocationChange={locationChange => {
            //   setLocation(locationChange.nativeEvent);
            // }}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: currentLocation?.latitude,
              longitude: currentLocation?.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            {originLatLng && destinationLatLng && location && (
              <Fragment>
                <MapViewDirection
                  origin={originLatLng}
                  destination={destinationLatLng}
                  currentLocation={location?.coords}
                />
              </Fragment>
            )}

            {drivers.length > 0 &&
              drivers.map((driver, index) => {
                return (
                  <Marker.Animated
                    zindex={2}
                    key={driver.driverUid}
                    tracksViewChanges={false}
                    ref={ef => (markerRefs.current[index] = ef)}
                    coordinate={{
                      latitude: driver.latitude || 0,
                      longitude: driver.longitude || 0,
                    }}>
                    <CarMark name="car" size={20} color="#808000" />
                  </Marker.Animated>
                );
              })}
          </MapView>

          <Portal>
            <HomeBottomSheet
              navigation={navigation}
              rideRequest={rideRequest}
            />
          </Portal>
        </Host>
      )}
    </>
  );
};

export default HomeMape;

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
