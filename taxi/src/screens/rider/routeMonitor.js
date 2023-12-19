import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState, useRef, Fragment} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import DriverDetails from '../../components/bottomSheet/DriverDetails';
import CarMarker from 'react-native-vector-icons/FontAwesome5';
import {socket} from '../../navigation/Drawer';
import Person from 'react-native-vector-icons/Ionicons';

const RouteMonitor = ({navigation, route}) => {
  const {time, driverUid} = route.params;
  const isFocused = useIsFocused();
  const [currentLocation, setCurrentLocation] = useState();
  const [driverArrivalTime, setDriverArrivalTime] = useState(time);
  const [driverData, setDriverData] = useState();
  const [driverLocation, setDriverLocation] = useState();
  const mapRef = useRef();
  const carMarker = useRef();
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position?.coords);
    });
  }, []);

  useEffect(() => {
    const fetchDriverName = async () => {
      const driver = await firestore().collection('Users').doc(driverUid).get();
      setDriverData(driver?._data);
    };
    fetchDriverName();
  }, [isFocused]);

  useEffect(() => {
    socket.on('showRouting', data => {
      setDriverLocation(data?.location);
      animateMarker(data.location);
    });
  }, []);

  const animateMarker = location => {
    if (carMarker?.current) {
      carMarker.current.animateMarkerToCoordinate(
        {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
        3000,
      );
    }
  };

  return (
    <Fragment>
      <View style={styles.rideInfoContainer}>
        <View style={styles.rideInfoContent}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(2.5),
                fontWeight: '600',
              }}>
              The driver's on the way
            </Text>
            <Text style={{color: 'grey', fontSize: responsiveFontSize(2.3)}}>
              Please dont be late
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(3.1),
                fontWeight: '700',
              }}>
              {driverArrivalTime} min.
            </Text>
          </View>
        </View>
      </View>
      <MapView
        style={{flex: 1}}
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
        }}>
        {driverLocation && (
          <Marker.Animated
            zindex={3}
            tracksViewChanges={false}
            identifier={'myOrigin'}
            ref={carMarker}
            coordinate={{
              latitude: driverLocation?.latitude,
              longitude: driverLocation?.longitude,
            }}>
            <CarMarker name="car" size={20} color="black" />
          </Marker.Animated>
        )}
      </MapView>
      {driverData && <DriverDetails driverData={driverData} />}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  rideInfoContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 1, // Ensure it's above the map
    elevation: 5, // Android elevation
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  rideInfoContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(2),
  },

  driverDetailsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 1, // Ensure it's above the map
    elevation: 5, // Android elevation
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  driverDetailsContent: {
    alignItems: 'center',
  },
});
export default RouteMonitor;
