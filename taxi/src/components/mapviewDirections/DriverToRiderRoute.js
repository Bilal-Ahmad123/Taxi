import {View, Text, StyleSheet} from 'react-native';
import React, {Fragment, useEffect, useMemo, useRef} from 'react';
import {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {styles1} from '../originMarker';
import CarMarker from 'react-native-vector-icons/FontAwesome5';
import {locationActions} from '../../Redux/slices/locationSlice';
import useContinuousLocation from '../../customHooks/getLocation/getLocation';
import {socket} from '../../navigation/Drawer';
export var markerRef;
export default function DriverToRiderRoute({
  origin,
  destination,
  color = '#6488ea',
}) {
  markerRef = useRef();
  const dispatch = useDispatch();
  const apiKey = process.env.GOOGLE_MAP_API;
  const continuousLocation = useContinuousLocation();

  markerRef = useRef();

  return (
    <Fragment>
      {Object.keys(continuousLocation).length > 0 && (
        <Marker.Animated
          zindex={3}
          ref={markerRef}
          tracksViewChanges={false}
          identifier={'myOrigin'}
          coordinate={{
            latitude: continuousLocation.coords.latitude,
            longitude: continuousLocation.coords.longitude,
          }}>
          <CarMarker name="car" size={20} color="black" />
        </Marker.Animated>
      )}
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={apiKey}
        strokeColor={color}
        strokeWidth={3}
        precision="high"
      />
    </Fragment>
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
