import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth);
      return {
        user: parsedAuth.user,
        isAuthenticated: parsedAuth.isAuthenticated,
        loading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error('Error loading auth from localStorage:', error);
  }
  return {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      
      // Save to localStorage
      try {
        localStorage.setItem('auth', JSON.stringify({
          user: action.payload,
          isAuthenticated: true,
        }));
      } catch (error) {
        console.error('Error saving auth to localStorage:', error);
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      // Remove from localStorage
      try {
        localStorage.removeItem('auth');
      } catch (error) {
        console.error('Error removing auth from localStorage:', error);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
