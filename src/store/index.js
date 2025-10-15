import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import tasksSlice from './slices/tasksSlice';
import clientsSlice from './slices/clientsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: tasksSlice,
    clients: clientsSlice,
  },
});

export default store;
