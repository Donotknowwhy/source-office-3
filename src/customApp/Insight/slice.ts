import { fetchError, fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import {
  openNotificationWithIcon,
  openNotificationWithIconFailed
} from '@constants/commons';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import InsightApi from './api';

const initialState: any = {
  incomeStatements: {
    table: {
      data: []
    },
    chart: {
      data: []
    }
  },
  expenseReport: {
    table: {
      data: []
    },
    chart: {
      data: []
    }
  }
};

export const getLedgerYear = createAsyncThunk(
  'users/getLedgerYear',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await InsightApi.getLedgerYear(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getLedger = createAsyncThunk(
  'users/getLedger',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await InsightApi.getLedger(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getLedgerMonth = createAsyncThunk(
  'users/getLedgerMonth',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await InsightApi.getLedgerMonth(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const exportLedger = createAsyncThunk(
  'users/exportLedger',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await InsightApi.exportLedger(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const Insight = createSlice({
  name: 'Insight',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLedgerYear.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          state.incomeStatements.chart = action.payload;
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        getLedgerYear.rejected,
        (state, action: PayloadAction<any>) => {}
      );
    builder
      .addCase(getLedgerMonth.fulfilled, (state, action: any) => {
        if (action.meta.arg.type === 'Phiếu thu') {
          state.incomeStatements.chart = action.payload;
          openNotificationWithIcon(action.payload.message);
        } else {
          state.expenseReport.chart = action.payload;
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        getLedgerMonth.rejected,
        (state, action: PayloadAction<any>) => {}
      );
    builder
      .addCase(getLedger.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          if (action.meta.arg.type === 'Phiếu thu') {
            state.incomeStatements.table = action.payload;
            // openNotificationWithIcon(action.payload.message);
          } else {
            state.expenseReport.table = action.payload;
            // openNotificationWithIcon(action.payload.message);
          }
        }
      })
      .addCase(getLedger.rejected, (state, action: PayloadAction<any>) => {});
    builder
      .addCase(exportLedger.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        exportLedger.rejected,
        (state, action: PayloadAction<any>) => {}
      );
  }
});

export default Insight.reducer;
