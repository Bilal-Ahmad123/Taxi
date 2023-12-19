import {createSlice} from '@reduxjs/toolkit';
import {store} from '../store';
const initialState = {
  isUserLoggedIn: false,
  isLoading: false,
  user: null,
  uid: null,
};
const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    loginUser: (state, action) => {
      state.isUserLoggedIn = true;
    },
    logoutUser: (state, action) => {
      state.isUserLoggedIn = false;
      userSlice.caseReducers.setLoader(state, {payload: false});
    },
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      userSlice.caseReducers.setLoader(state, {payload: false});
    },
    setUserId: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export default userSlice.reducer;
export const UserActions = userSlice.actions;
