import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import common from './CommonSlice';
import settings from './SettingSlice';
import auth from './Authslice';
import crm from '../customApp/Crm/slice';
import ManageAccount from '../customApp/Acm/ManageAccount/slices';
import RevenueExpenditureSlice from '../customApp/Acm/ManageRevenueExpenditure/slices';
import HRMSlice from '../customApp/HRM/HRMManageAccount/slice';
import SettingHRM from '../customApp/HRM/Settings/slice';
import Insight from '../customApp/Insight/slice';

const createBrowserHistory = require('history').createBrowserHistory;

export const history = createBrowserHistory();
// ...

export const store = configureStore({
  reducer: {
    Insight,
    HRMSlice,
    SettingHRM,
    router: connectRouter(history),
    common,
    settings,
    auth,
    crm,
    ManageAccount,
    RevenueExpenditureSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
