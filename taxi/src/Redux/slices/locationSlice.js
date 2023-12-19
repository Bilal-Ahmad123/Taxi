import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  originName: null,
  destinationName: null,
  originLatLng: null,
  destinationLatLng: null,
  time: null,
  routeDistance: null,
  routePath: [],
  riderOriginName: null,
  riderDestinationName: null,
};
const locationSlice = createSlice({
  initialState,
  name: 'location',
  reducers: {
    saveOriginName: (state, action) => {
      state.originName = action.payload.address;
      state.originLatLng = action.payload.latLng;
    },
    saveDestinationName: (state, action) => {
      state.destinationName = action.payload.address;
      state.destinationLatLng = action.payload.latLng;
    },
    saveRouteTime: (state, action) => {
      console.log(action.payload);
      state.time = action.payload;
    },
    saveDistance: (state, action) => {
      console.log(action.payload);
      state.routeDistance = action.payload;
    },
    setRoutePath: (state, action) => {
      state.routePath = action.payload;
    },
    saveRiderOriginName: (state, action) => {
      state.riderOriginName = action.payload;
    },
    saveRiderDestinationName: (state, action) => {
      state.riderDestinationName = action.payload;
    },
  },
});

export default locationSlice.reducer;
export const locationActions = locationSlice.actions;
