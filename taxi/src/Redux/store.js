import {configureStore} from '@reduxjs/toolkit';
import locationSlice from './slices/locationSlice';
import UserSlice from './slices/UserSlice';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    Location: locationSlice,
    User: UserSlice,
  },
});
