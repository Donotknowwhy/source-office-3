import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { setCurrentUser } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
