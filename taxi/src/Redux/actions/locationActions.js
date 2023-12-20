import axios from 'axios';
import {locationActions} from '../slices/locationSlice';
import {store} from '../store';
import Polyline from '@mapbox/polyline';
import {Toast} from 'react-native-toast-notifications';
const apiKey = process.env.GOOGLE_MAP_API;

export const getOriginName = data => async dispatch => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data.longitude}&sensor=true&key=${apiKey}`,
    )
    .then(res => {
      dispatch(
        locationActions.saveOriginName({
          address: res.data.results[0].formatted_address,
          latLng: data,
        }),
      );
    })
    .catch(err => {
      console.log(err);
    });
};

export const getDestinationName = data => async dispatch => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data.longitude}&sensor=true&key=${apiKey}`,
    )
    .then(res => {
      dispatch(
        locationActions.saveDestinationName({
          address: res.data.results[0].formatted_address,
          latLng: data,
        }),
      );
    })
    .catch(err => {
      console.log(err);
    });
};

export const distanceCalculate = data => async dispatch => {
  dispatch(locationActions.saveDistance(data));
};

export const getCompleteRoute = (origin, destination) => async dispatch => {
  try {
    Toast.show('Creating Route...', {
      type: 'success',
      placement: 'top',
      animationType: 'zoom-in',
    });
    let route = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?destination=${destination.latitude},${destination.longitude}&origin=${origin.latitude},${origin.longitude}&mode='DRIVING'&key=${apiKey}`,
    );
    const routeArray = [];

    for (let i = 0; i < route.data.routes[0].legs[0].steps.length; i++) {
      routeArray.push(
        ...Polyline.decode(
          route.data.routes[0].legs[0].steps[i].polyline.points,
        ),
      );
    }

    dispatch(locationActions.setRoutePath(routeArray));
    dispatch(
      locationActions.saveDistance(
        route.data.routes[0].legs[0].distance.text.replace(' km', ''),
      ),
    );
    dispatch(
      locationActions.saveRouteTime(route.data.routes[0].legs[0].duration.text),
    );
  } catch (e) {
    console.log(e);
  }
};
export const setRoute = data => async dispatch => {
  dispatch(locationActions.setRoutePath(data));
};
