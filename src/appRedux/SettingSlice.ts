import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LAYOUT_TYPE_FULL,
  NAV_STYLE_FIXED,
  THEME_COLOR,
  THEME_TYPE_DARK
} from '../constants/ThemeSetting';
import ILanguage from '../models/Language';
import { GetCurrentLocate } from '../util/LanguageService';
import type { RootState } from './store';

// Define a type for the slice state
export interface CommonState {
  navStyle?: string;
  layoutType?: string;
  themeType?: string;
  colorSelection?: string;
  pathname?: string;
  width?: number;
  isDirectionRTL?: boolean;
  locale?: ILanguage;
  themeColor?: string;
  initURL?: string;
}

// Define the initial state using that type
const initialState: CommonState = {
  navStyle: NAV_STYLE_FIXED,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_DARK,
  themeColor: THEME_COLOR,

  isDirectionRTL: false,
  locale: GetCurrentLocate(),
  initURL: ''
};

export const counterSlice = createSlice({
  name: 'setting',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInitUrl: (state, action: PayloadAction<string>) => {
      state.initURL = action.payload;
    },
    setThemeType: (state, action: PayloadAction<string>) => {
      state.themeType = action.payload;
    },
    onNavStyleChange: (state, action: PayloadAction<string>) => {
      state.navStyle = action.payload;
    },
    onLayoutTypeChange: (state, action: PayloadAction<string>) => {
      state.layoutType = action.payload;
    },
    switchLanguage: (state, action: PayloadAction<ILanguage>) => {
      localStorage.setItem('lang', action.payload.locale);
      state.locale = action.payload;
    },
    setDirectionRTL: (state, action: PayloadAction<boolean>) => {
      state.isDirectionRTL = action.payload;
    }
  }
});

export const {
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  switchLanguage,
  setDirectionRTL,
  setInitUrl
} = counterSlice.actions;

export const selectSettingState = (state: RootState) => state.settings;

export default counterSlice.reducer;
