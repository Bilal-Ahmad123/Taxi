import {locationActions} from '../slices/locationSlice';

export const setTime = data => async dispatch => {
  dispatch(locationActions.saveRouteTime(data));
};
