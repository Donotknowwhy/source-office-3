import { message } from 'antd';
import axios from 'axios';
import { fetchError, fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RevenueExpenditureApi from './apis';
import {
  IDataRevenueExpenditure,
  ISale,
  ICustomer,
  IAccount,
  IAccounting,
  IRevenueExpenditure
} from './modules';

const success = (mess: string) => {
  message.success(mess);
};

const handleError = (mess: string) => {
  message.error(mess);
};

interface RevenueExpenditureInterface {
  revenueExpenditures: IRevenueExpenditure[];
  revenueExpendituresDeletes: number[];
  checkBoxes: boolean[];
  customers?: ICustomer[];
  sales?: ISale[];
  checkBoxMulti: boolean;
  account_id?: number;
  surplus?: string;
  loading: boolean;
  total?: number;
  since?: Date;
  toDate?: Date;
  accounts?: IAccount[];
  accounting?: IAccounting[];
  vote_type?: string;
  timeErrorDelete?: any;
  current?: number;
  pageSize?: number;
}

const initialState: RevenueExpenditureInterface = {
  revenueExpenditures: [],
  revenueExpendituresDeletes: [],
  checkBoxes: [],
  customers: [],
  sales: [],
  checkBoxMulti: false,
  loading: false,
  total: 0,
  accounts: [],
  accounting: [],
  vote_type: '',
  current: 1,
  pageSize: 10
};

export const getAccounts = createAsyncThunk(
  'revenueExpenditure/getAccounts',
  async (_, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await RevenueExpenditureApi.getAccounts();
      await thunkApi.dispatch(fetchSuccess());
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAccounting = createAsyncThunk(
  'revenueExpenditure/getAccounting',
  async (_, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await RevenueExpenditureApi.getAccounting();
      await thunkApi.dispatch(fetchSuccess());
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCustomers = createAsyncThunk(
  'revenueExpenditure/getCustomers',
  async (_, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await RevenueExpenditureApi.getCustomers();
      await thunkApi.dispatch(fetchSuccess());
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSales = createAsyncThunk(
  'revenueExpenditure/getSales',
  async (_, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await RevenueExpenditureApi.getSales();
      await thunkApi.dispatch(fetchSuccess());
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getRevenueExpenditures = createAsyncThunk(
  'revenueExpenditure/getRevenueExpenditures',
  async (data: IDataRevenueExpenditure, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await RevenueExpenditureApi.getRevenueExpenditures(data);
      await thunkApi.dispatch(fetchSuccess());
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postRevenueExpenditures = createAsyncThunk(
  'revenueExpenditure/postRevenueExpenditure',
  async (data: IRevenueExpenditure, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await RevenueExpenditureApi.postRevenueExpenditure(data);
      await thunkApi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const putRevenueExpenditures = createAsyncThunk(
  'revenueExpenditure/putRevenueExpenditure',
  async (data: IRevenueExpenditure, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await RevenueExpenditureApi.putRevenueExpenditure(data);
      await thunkApi.dispatch(fetchSuccess());
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteRevenueExpenditure = createAsyncThunk(
  'revenueExpenditure/deleteRevenueExpenditure',
  async (data: number[], thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      await RevenueExpenditureApi.deleteRevenueExpenditure(data);
      await thunkApi.dispatch(fetchSuccess());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkApi.dispatch(fetchError(error.message));
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RevenueExpenditureSlice = createSlice({
  name: 'revenueExpenditure',
  initialState,
  reducers: {
    selectSingleCheckbox(state, action) {
      const finalDataChecked = state.checkBoxes.map((item, position) => {
        if (position === action.payload.index) return !item;
        return item;
      });

      const finalDataDelete = state.checkBoxes[action.payload.index]
        ? state.revenueExpendituresDeletes.filter(
            (item) => item !== action.payload.id
          )
        : [...state.revenueExpendituresDeletes, action.payload.id];

      state.revenueExpendituresDeletes = finalDataDelete;
      state.checkBoxes = finalDataChecked;
    },
    selectMultiCheckbox(state) {
      state.checkBoxMulti
        ? (state.revenueExpendituresDeletes = [])
        : (state.revenueExpendituresDeletes = state.revenueExpenditures.map(
            (item) => item.id
          ));

      state.checkBoxes = state.checkBoxes.map(() => !state.checkBoxMulti);
      state.checkBoxMulti = !state.checkBoxMulti;
    },
    changeFilter(state, action) {
      const arrayFilter = action.payload;
      arrayFilter.length === 1
        ? (state.vote_type = action.payload[0])
        : (state.vote_type = '');
    },
    changeAccountId(state, action) {
      const accountSelect = state.accounts.filter(
        (item) => item.id === action.payload
      );
      state.surplus = accountSelect[0]?.surplus || '0';
      state.account_id = action.payload;
    },
    changeAccountUpdate(state, action) {
      const accountSelect = state.accounts.filter(
        (item) => item.id === action.payload
      );

      state.surplus =
        (accountSelect[0]?.surplus as unknown as number) > 0
          ? accountSelect[0]?.surplus
          : '0';
    },
    changeRevenueExpenditureSelect(state, action) {
      state.surplus = action.payload;
    },
    changeSinceDate(state, action) {
      state.since = action.payload;
    },
    changeToDate(state, action) {
      state.toDate = action.payload;
    },
    changePageSize(state, action) {
      state.pageSize = action.payload;
    },
    changeCurrent(state, action) {
      state.current = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // ===============  Get account,accounting,customers, sale
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
      })
      .addCase(getAccounting.fulfilled, (state, action) => {
        state.accounting = action.payload;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.sales = action.payload;
      })
      // ===============  Get all Revenue Expenditures
      .addCase(getRevenueExpenditures.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRevenueExpenditures.fulfilled, (state, action) => {
        const listRevenueExpenditure = action.payload;
        state.revenueExpenditures = listRevenueExpenditure;
        state.checkBoxes = listRevenueExpenditure.map(() => false);
        state.total = action.payload.total;
        state.revenueExpendituresDeletes = [];
        state.checkBoxMulti = false;
        state.loading = false;
      })
      .addCase(getRevenueExpenditures.rejected, (state, action) => {
        state.loading = false;
      })
      // ===============  Post Revenue Expenditures
      .addCase(postRevenueExpenditures.fulfilled, (state, action) => {
        if (state.account_id === action.payload.data.account_id) {
          const data = [action.payload.data, ...state.revenueExpenditures];
          state.revenueExpenditures = data;
          state.total = state.total + 1;
          state.checkBoxes = state.revenueExpenditures.map(() => false);
        }

        state.revenueExpendituresDeletes = [];
        state.checkBoxMulti = false;
        success('Thêm phiếu thành công');
      })
      // ===============  Put Revenue Expenditures
      .addCase(putRevenueExpenditures.fulfilled, (state, action) => {
        state.timeErrorDelete = new Date().getTime();
        state.surplus = action.payload.surplus;
        success('Sửa phiếu thành công');
      })
      .addCase(putRevenueExpenditures.rejected, (state, action) => {
        state.timeErrorDelete = new Date().getTime();
      })
      // ===============  Delete Revenue Expenditures
      .addCase(deleteRevenueExpenditure.fulfilled, (state, action) => {
        state.revenueExpenditures = state.revenueExpenditures.filter((item) => {
          return !state.revenueExpendituresDeletes.includes(item.id);
        });
        state.total = state.total - state.revenueExpendituresDeletes.length;
        state.revenueExpendituresDeletes = [];
        state.checkBoxes = state.revenueExpenditures.map(() => false);
        state.checkBoxMulti = false;
        success('Xoá phiếu thành công');
      })
      .addCase(deleteRevenueExpenditure.rejected, (state, action) => {
        state.timeErrorDelete = new Date().getTime();
      });
  }
});

export const {
  changeAccountId,
  changeAccountUpdate,
  changeSinceDate,
  changeToDate,
  changeFilter,
  selectSingleCheckbox,
  selectMultiCheckbox,
  changeCurrent,
  changePageSize,
  changeRevenueExpenditureSelect
} = RevenueExpenditureSlice.actions;

export default RevenueExpenditureSlice.reducer;
