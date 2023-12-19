import {View, Text} from 'react-native';
import React, {Fragment, useRef, useState, useEffect} from 'react';
import A from 'react-native-vector-icons/FontAwesome6';
import B from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import DriverToRiderRoute, {
  markerRef,
} from '../../components/mapviewDirections/DriverToRiderRoute';
import RiderToDestination from '../../components/mapviewDirections/RiderToDestination';
import Geolocation from '@react-native-community/geolocation';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import useContinuousLocation from '../../customHooks/getLocation/getLocation';
import {socket} from '../../navigation/Drawer';
import NavigateButton from '../../components/buttons/NavigateButton';
import HereSheet from '../../components/bottomSheet/IAmHere';

const RouteOverview = ({navigation, route}) => {
  const [currentLocation, setCurrentLocation] = useState();
  const [toggleRoute, setToggleRoute] = useState(false);

  var {
    time,
    riderOriginLatLng,
    riderDestinationLatLng,
    riderUid,
    origin,
    destination,
  } = route.params;
  riderOriginLatLng = JSON.parse(riderOriginLatLng);
  riderDestinationLatLng = JSON.parse(riderDestinationLatLng);
  const mapRef = useRef();
  const continuousLocation = useContinuousLocation();

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position?.coords);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(continuousLocation).length > 0) {
      socket.emit('startRouting', {
        location: continuousLocation?.coords,
        riderUid,
      });
      animateMarker(continuousLocation?.coords);
    }
  }, [
    continuousLocation?.coords?.latitude,
    continuousLocation?.coords?.longitude,
  ]);

  const animateMarker = location => {
    if (markerRef?.current) {
      markerRef.current.animateMarkerToCoordinate(
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
      <MapView
        style={{
          flex: 1,
        }}
        ref={mapRef}
        mapPadding={{
          top: responsiveHeight(40),
          right: 0,
          bottom: 0,
          left: 0,
        }}
        mapType="standard"
        onMapReady={() => {
          setTimeout(() => {
            mapRef.current?.fitToSuppliedMarkers(['myOrigin', 'riderOrigin'], {
              animated: true,

              edgePadding: {
                top: 100,
                right: 100,
                left: 100,
                bottom: 100,
              },
            });
          }, 50);
        }}
        zoomEnabled={true}
        tracksViewChanges={false}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: currentLocation?.latitude || 0,
          longitude: currentLocation?.longitude || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        {!toggleRoute && (
          <Marker.Animated
            zindex={2}
            tracksViewChanges={false}
            identifier={'riderOrigin'}
            coordinate={{
              latitude: riderOriginLatLng.latitude,
              longitude: riderOriginLatLng.longitude,
            }}>
            <A name="adn" size={20} color="blue" />
          </Marker.Animated>
        )}
        {currentLocation && !toggleRoute && (
          <DriverToRiderRoute
            origin={currentLocation}
            destination={riderOriginLatLng}
            color="black"
          />
        )}
        {toggleRoute && (
          <RiderToDestination
            origin={riderOriginLatLng}
            destination={riderDestinationLatLng}
          />
        )}
      </MapView>
      <HereSheet
        riderUid={riderUid}
        origin={origin}
        destination={destination}
        setToggleRoute={setToggleRoute}
        toggleRoute={toggleRoute}
      />
      <NavigateButton
        originLatLng={!toggleRoute ? currentLocation : riderOriginLatLng}
        destinationLatLng={
          !toggleRoute ? riderOriginLatLng : riderDestinationLatLng
        }
      />
    </Fragment>
  );
};

export default RouteOverview;
