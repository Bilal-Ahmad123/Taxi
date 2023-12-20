import {View, Text, StyleSheet} from 'react-native';
import React, {Fragment, useMemo, useRef} from 'react';
import {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {styles1} from '../originMarker';
import CarMarker from 'react-native-vector-icons/FontAwesome5';
import A from 'react-native-vector-icons/FontAwesome6';
import B from 'react-native-vector-icons/MaterialCommunityIcons';
import {locationActions} from '../../Redux/slices/locationSlice';

export var markerRef;
export default function RiderToDestination({
  origin,
  destination,
  currentLocation,
  color = '#6488ea',
}) {
  markerRef = useRef();
  const dispatch = useDispatch();
  const apiKey = process.env.GOOGLE_MAP_API;

  return (
    <Fragment>
      <Marker.Animated
        zindex={2}
        tracksViewChanges={false}
        identifier={'riderOrigin'}
        coordinate={{
          latitude: origin.latitude,
          longitude: origin.longitude,
        }}>
        <A name="adn" size={20} color="blue" />
      </Marker.Animated>
      <MapViewDirections
        onReady={e => {
          dispatch(
            locationActions.saveRiderOriginName(e.legs[0].start_address),
          );
          dispatch(
            locationActions.saveRiderDestinationName(e.legs[0].end_address),
          );
        }}
        origin={origin}
        destination={destination}
        apikey={apiKey}
        strokeColor={color}
        strokeWidth={3}
        precision="high"
      />
      <Marker.Animated
        zindex={2}
        tracksViewChanges={false}
        identifier={'riderDestination'}
        coordinate={{
          latitude: destination.latitude,
          longitude: destination.longitude,
        }}>
        <B name="alpha-b-circle" size={20} color="brown" />
      </Marker.Animated>
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
