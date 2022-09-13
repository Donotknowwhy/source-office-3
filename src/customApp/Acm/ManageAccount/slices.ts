import { message } from 'antd';
import axios from 'axios';
import { fetchError, fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ManageAccountApi from './apis';
import { IAccount, IDataAccount, IDataAccountDelete, IBank } from './modules';

const success = (mess: string) => {
  message.success(mess);
};

const handleError = (mess: string) => {
  message.error(mess);
};

interface ManageAccountInterface {
  accounts: IAccount[];
  accountDeletes: number[];
  checkBoxes: boolean[];
  checkBoxMulti: boolean;
  banks?: IBank[];
  account_type: string;
  loading: boolean;
  total?: number;
  timeErrorDelete?: any;
  current?: number;
  pageSize?: number;
}

const initialState: ManageAccountInterface = {
  accounts: [],
  accountDeletes: [],
  checkBoxes: [],
  checkBoxMulti: false,
  banks: [],
  account_type: '',
  loading: false,
  total: 0,
  current: 1,
  pageSize: 10
};

export const getBanks = createAsyncThunk(
  'manageAccount/getBanks',
  async (_, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await ManageAccountApi.getBanks();
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

export const getAccounts = createAsyncThunk(
  'manageAccount/getAccounts',
  async (data: IDataAccount, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = data.isAccountBackup
        ? await ManageAccountApi.getAccountBackups(data)
        : await ManageAccountApi.getAccounts(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const postAccount = createAsyncThunk(
  'manageAccount/postAccount',
  async (data: IAccount, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await ManageAccountApi.postAccount(data);
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

export const putAccount = createAsyncThunk(
  'manageAccount/putAccount',
  async (data: IAccount, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      const response = await ManageAccountApi.putAccount(data);
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

export const deleteAccount = createAsyncThunk(
  'manageAccount/deleteAccount',
  async (data: IDataAccountDelete, thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      data.isAccountBackup
        ? await ManageAccountApi.deleteAccountBackup(data.accountDeletes)
        : await ManageAccountApi.deleteAccount(data.accountDeletes);
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

export const putStatusAccount = createAsyncThunk(
  'manageAccount/putStatusAccount',
  async (data: number[], thunkApi) => {
    try {
      await thunkApi.dispatch(fetchStart());
      await ManageAccountApi.putStatusAccount(data);
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

export const ManageAccountSlice = createSlice({
  name: 'manageAccount',
  initialState,
  reducers: {
    selectSingleCheckbox(state, action) {
      const finalDataChecked = state.checkBoxes.map((item, position) => {
        if (position === action.payload.index) return !item;
        return item;
      });

      const finalDataDelete = state.checkBoxes[action.payload.index]
        ? state.accountDeletes.filter((item) => item !== action.payload.id)
        : [...state.accountDeletes, action.payload.id];

      state.accountDeletes = finalDataDelete;
      state.checkBoxes = finalDataChecked;
    },
    selectMultiCheckbox(state) {
      state.checkBoxMulti
        ? (state.accountDeletes = [])
        : (state.accountDeletes = state.accounts.map((item) => item.id));

      state.checkBoxes = state.checkBoxes.map(() => !state.checkBoxMulti);
      state.checkBoxMulti = !state.checkBoxMulti;
    },
    changeFilter(state, action) {
      const arrayFilter = action.payload;
      arrayFilter.length === 1
        ? (state.account_type = action.payload[0])
        : (state.account_type = '');
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
      .addCase(getBanks.fulfilled, (state, action) => {
        state.banks = action.payload;
      })
      // ===============  Get Account
      .addCase(getAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        const listAccount = action.payload.data;
        state.accounts = listAccount;
        state.checkBoxes = listAccount.map(() => false);
        state.total = action.payload.total;
        state.accountDeletes = [];
        state.checkBoxMulti = false;
        state.loading = false;
      })
      .addCase(getAccounts.rejected, (state) => {
        state.loading = false;
      })
      // ===============  Post Account
      .addCase(postAccount.fulfilled, (state, action) => {
        const data = [action.payload.data, ...state.accounts];
        state.accounts = data;
        state.checkBoxes = state.accounts.map(() => false);
        state.accountDeletes = [];
        state.checkBoxMulti = false;
        state.total = state.total + 1;
        success('Thêm tài khoản thành công');
      })
      // ===============  Put Account
      .addCase(putAccount.fulfilled, (state, action) => {
        const finalDataPut = state.accounts.map((item) => {
          if (item.id === action.payload.id) return action.payload;
          return item;
        });

        state.accounts = finalDataPut;
        state.checkBoxes = state.accounts.map(() => false);
        state.accountDeletes = [];
        state.checkBoxMulti = false;
        success('Sửa tài khoản thành công');
      })
      // ===============  Delete Account
      .addCase(deleteAccount.fulfilled, (state) => {
        state.accounts = state.accounts.filter((item) => {
          return !state.accountDeletes.includes(item.id);
        });
        state.total = state.total - state.accountDeletes.length;
        state.accountDeletes = [];
        state.checkBoxes = state.accounts.map(() => false);
        state.checkBoxMulti = false;
        success('Xoá tài khoản thành công');
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.timeErrorDelete = new Date().getTime();
      })
      // ===============  Put Account
      .addCase(putStatusAccount.fulfilled, (state) => {
        state.accounts = state.accounts.filter((item) => {
          return !state.accountDeletes.includes(item.id);
        });
        state.accountDeletes = [];
        state.checkBoxes = state.accounts.map(() => false);
        state.checkBoxMulti = false;
        state.total = state.total - state.accountDeletes.length;
        success('Khôi phục tài khoản thành công');
      })
      .addCase(putStatusAccount.rejected, (state) => {
        state.timeErrorDelete = new Date().getTime();
      });
  }
});

export const {
  selectSingleCheckbox,
  selectMultiCheckbox,
  changeFilter,
  changePageSize,
  changeCurrent
} = ManageAccountSlice.actions;

export default ManageAccountSlice.reducer;
