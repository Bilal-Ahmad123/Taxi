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
import {locationActions} from '../../Redux/slices/locationSlice';
import DestinationMarker from 'react-native-vector-icons/MaterialCommunityIcons';

export var markerRef;
export default function MapViewDirection({
  origin,
  destination,
  currentLocation,
  color = '#6488ea',
}) {
  const dispatch = useDispatch();
  markerRef = useRef();
  // useEffect(() => {
  //   dispatch(getCompleteRoute(origin, destination));
  // }, [origin, destination]);

  const memo = useMemo(() => <CarMarker />);
  // var routePath = useSelector(state => state.Location.routePath);
  // const updateRoute = () => {
  //   var distance = geolib.getDistance(currentLocation, {
  //     latitude: routePath.length > 0 ? routePath[0][0] : 0,
  //     longitude: routePath.length > 0 ? routePath[0][1] : 0,
  //   });

  //   if (distance < 20) {
  //     const newArray = [...routePath];
  //     newArray.shift();
  //     dispatch(setRoute(newArray));
  //   }
  // };

  // useEffect(() => {
  //   updateRoute();
  // }, [currentLocation?.latitude, currentLocation?.longitude]);

  // const [oneTimeLocation, setOneTimeLocation] = useState();
  // useEffect(() => {
  //   var watchId = Geolocation.getCurrentPosition(position => {
  //     setOneTimeLocation(position?.coords);
  //   });
  //   Geolocation.clearWatch(watchId);
  // }, []);

  return (
    <Fragment>
      <Marker.Animated
        zIndex={1}
        identifier={'origin'}
        tracksViewChanges={false}
        coordinate={{
          latitude: origin.latitude,
          longitude: origin.longitude,
        }}>
        <View style={styles1.markerContainer}>
          <View style={styles1.markerCircle}>
            <View
              style={{
                backgroundColor: 'white',
                width: responsiveWidth(2),
                height: responsiveHeight(1),
              }}></View>
          </View>
          <View style={styles1.markerPin} />
        </View>
      </Marker.Animated>

      {/* {routePath.length > 0 && (
        <Polyline
          coordinates={routePath.map(loc => {
            return {
              latitude: loc[0] || 0,
              longitude: loc[1] || 0,
            };
          })}
          strokeColor="blue"
          strokeWidth={3}
        />
      )} */}
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey="AIzaSyDeBrkSyDJ3rqjxYxfGTfGXbis5KdGZ9Ks"
        strokeColor={color}
        strokeWidth={3}
        precision="high"
        onReady={e => {
          dispatch(locationActions.saveRouteTime(e.duration));
          dispatch(locationActions.saveDistance(e.distance));
        }}
      />

      <Marker.Animated
        identifier={'destination'}
        tracksViewChanges={false}
        zIndex={3}
        coordinate={{
          latitude: destination.latitude,
          longitude: destination.longitude,
        }}>
        <DestinationMarker name="record-circle" color="black" size={25} />
      </Marker.Animated>
      <Marker.Animated
        zindex={2}
        tracksViewChanges={false}
        ref={markerRef}
        coordinate={{
          latitude: 0,
          longitude: 0,
        }}>
        <CarMarker name="car" size={20} color="black" />
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
    width: responsiveWidth(10),
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
