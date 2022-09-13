import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
export interface CommonState {
  error?: string;
  loading?: boolean;
  message?: string;
  navCollapsed: boolean;
  width: number;
  pathname: string;
}

// Define the initial state using that type
const initialState: CommonState = {
  error: '',
  loading: false,
  message: '',
  navCollapsed: false,
  width: window.innerWidth,
  pathname: '/'
};

export const counterSlice = createSlice({
  name: 'common',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = '';
      state.message = '';
    },
    fetchSuccess: (state) => {
      state.loading = false;
      state.error = '';
      state.message = '';
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.message = '';
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    showMessage: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
      state.error = '';
    },
    hideMessage: (state) => {
      state.loading = false;
      state.error = '';
      state.message = '';
    },
    updateWindowWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    locationChange: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
      state.navCollapsed = false;
    },
    toggleCollapsedSideNav: (state, action: PayloadAction<boolean>) => {
      state.navCollapsed = action.payload;
    }
  }
});

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  showMessage,
  hideMessage,
  updateWindowWidth,
  locationChange,
  toggleCollapsedSideNav
} = counterSlice.actions;

export const selectCommonState = (state: RootState) => state.common;

export default counterSlice.reducer;
