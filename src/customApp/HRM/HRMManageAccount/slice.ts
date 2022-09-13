import {
  openNotificationWithIcon,
  openNotificationWithIconFailed
} from '@constants/commons';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import {
  fetchError,
  fetchStart,
  fetchSuccess
} from '../../../appRedux/CommonSlice';
import UserApi from '../api';
import {
  addAccountHRM,
  addEmployee,
  dataFormTransfer
} from './Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
const handleError = (mess: string) => {
  message.error(mess);
};

// Define a type for the slice state

export const getListHRM = createAsyncThunk(
  'users/HRMManageAccount',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getListUser(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateGenInfo = createAsyncThunk(
  'users/updateGenInfo',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateGenInfo(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getDetailUserHRM = createAsyncThunk(
  'users/HRMManageAccount/detail',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getUserDetail(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getDetailUserInformation = createAsyncThunk(
  'users/HRMManageAccount/detail/information',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getGeneralInfor(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getDetailUserWorkingHistory = createAsyncThunk(
  'users/HRMManageAccount/detail/workingHistory',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getWorkHistory(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateStatusUser = createAsyncThunk(
  'users/HRMManageAccount/updateStatusUser',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateStatusUser(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateStatus = createAsyncThunk(
  'users/HRMManageAccount/updateStatus',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateStatus(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const restoreStaff = createAsyncThunk(
  'users/HRMManageAccount/restoreStaff',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.restoreStaff(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/HRMManageAccount/deleteUser',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deleteUser(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getListStatus = createAsyncThunk(
  'users/HRMManageAccount/getListStatus',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getListStatus(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getAllPosition = createAsyncThunk(
  'users/HRMManageAccount/getAllPosition',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getAllPosition(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getAllUser = createAsyncThunk(
  'users/HRMManageAccount/getAllUser',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getAllUser(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getAllBranch = createAsyncThunk(
  'users/HRMManageAccount/getAllBranch',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getAllBranch(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getAllDepartment = createAsyncThunk(
  'users/HRMManageAccount/getAllDepartment',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getAllDepartment(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createStaffInformation = createAsyncThunk(
  'users/HRMManageAccount/createStaffInformation',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createStaffInformation(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const searchAllListHr = createAsyncThunk(
  'users/searchAllListHr',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.searchAllListHr(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getShift = createAsyncThunk(
  'users/getShift',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getShift(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getAccount = createAsyncThunk(
  'users/getAccount',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getAccount(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateStatusStaff = createAsyncThunk(
  'users/updateStatusStaff',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateStatusStaff(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateAccount = createAsyncThunk(
  'users/updateAccount',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateAccount(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateWorkHistory = createAsyncThunk(
  'users/updateWorkHistory',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateWorkHistory(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteAccountUser = createAsyncThunk(
  'users/deleteAccountUser',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deleteAccountUser(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getListAccountNotUser = createAsyncThunk(
  'users/getListAccountNotUser',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getListAccountNotUser(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateLaborContract = createAsyncThunk(
  'users/updateLaborContract',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateLaborContract(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createLaborContract = createAsyncThunk(
  'users/createLaborContract',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createLaborContract(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getDepartment = createAsyncThunk(
  'users/getDepartment',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getDepartment(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getAllStoresListHr = createAsyncThunk(
  'users/getAllStoresListHr',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getAllStoresListHr(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const jobRotation = createAsyncThunk(
  'users/jobRotation',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.jobRotation(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createWorkingHistory = createAsyncThunk(
  'users/createWorkingHistory',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createWorkHistory(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createAccountNotUser = createAsyncThunk(
  'users/createAccountNotUser',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createAccountNotUser(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const deleteWorkHistory = createAsyncThunk(
  'users/deleteWorkHistory',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deleteWorkHistory(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);

        await thunkapi.dispatch(fetchError(error.code));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

// Define the initial state using that type
const initialState = {
  idEmployee: null,
  getDepartmentData: [],
  getAllPositionData: [],
  allUserData: [],
  shiftData: [],
  getAllBranchData: [],
  createStaffInformation: [],
  data: {
    page: 1,
    limit: 10,
    listHRM: [],
    message: '',
    status: 0,
    count: 0
  },
  dataStorage: {
    page: 1,
    limit: 15,
    listHRM: [],
    message: '',
    status: 0
  },

  laborContract: {
    count: 0,
    data: [],
    message: '',
    status: 0
  },
  information: {
    count: 0,
    data: [],
    message: '',
    status: 0
  },
  workingHistory: {
    count: 0,
    data: [
      {
        attachments: '',
        created_at: '',
        date: '',
        description: '',
        event: '',
        id: 0,
        staff_id: 0,
        updated_at: ''
      }
    ],
    message: '',
    status: 0
  },
  accountGOffice: {
    count: 0,
    data: [],
    message: '',
    status: 0
  },
  addAccountHRM: addAccountHRM,
  message: '',
  status: 0,
  addNewEmployeeForm: addEmployee,
  transferWork: dataFormTransfer,
  discontinue: 1,
  countRelationShip: 0,
  bodyGetListHRM: {},
  resetPassword: {
    status: 0
  },

  //infinity scroll
  listHRMInfinityScroll: [],
  pageCustomer: 1,
  totalCustomer: 0,

  //
  listHRMInfinityScrollStorage: [
    {
      avatar: '',
      branch_name: '',
      department_name: '',
      phone: '',
      position_name: '',
      staff_code: '',
      staff_id: '',
      staff_name: '',
      work_status: ''
    }
  ],
  pageCustomerStorage: 1,
  totalCustomerStorage: 0,
  countStorage: 0
};

export const HRMSlice = createSlice({
  name: 'HRMSlice',
  initialState,
  reducers: {
    clearData: (state, action) => {
      state.data.listHRM = [];
      state.idEmployee = null;
      state.status = 0;
      state.listHRMInfinityScroll = [];
      state.pageCustomer = 1;
      state.totalCustomer = 0;

      // state.listHRMInfinityScrollStorage = [];
    },
    pickEmployeId: (state, action) => {
      state.idEmployee = action.payload;
    },
    saveBodyGetListHRM: (state, action) => {
      state.bodyGetListHRM = action.payload;
    },
    clearIdSelect: (state, action) => {
      state.idEmployee = null;
    },
    setCustomerInfinity: (state, action) => {
      state.listHRMInfinityScroll = action.payload;
      // state.listHRMInfinityScrollStorage = action.payload;
    },
    setPageCustomerScroll: (state, action) => {
      state.pageCustomer = action.payload;
      // state.pageCustomerStorage = action.payload;
    },
    setTotalCustomer: (state, action) => {
      state.totalCustomer = action.payload;
      // state.totalCustomerStorage = action.payload;
    },
    setCustomerInfinityStorage: (state, action) => {
      state.listHRMInfinityScrollStorage = action.payload;
    },
    setPageCustomerScrollStorage: (state, action) => {
      state.pageCustomerStorage = action.payload;
    },
    setTotalCustomerStorage: (state, action) => {
      state.totalCustomerStorage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListHRM.fulfilled, (state, action: any) => {
        if (action.meta.arg?.fetchMore === 'fetch-more') {
          if (action.payload.data.length === 0) {
            state.pageCustomer = 1;
            state.totalCustomer = 0;
            state.data.count = action.payload.count;
            return;
          }
        } else {
          state.listHRMInfinityScroll = action.payload.data;
          state.data = {
            listHRM: action.payload.data,
            limit: action.payload.limit,
            message: action.payload.message,
            status: action.payload.status,
            page: action?.payload?.page,
            count: action.payload.count
          };
        }

        // if (action.payload.data.length === 0) {
        // } else {
        // }
      })
      .addCase(getListHRM.rejected, (state, action: PayloadAction<any>) => {})
      .addCase(
        getDetailUserHRM.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.laborContract = action.payload;
        }
      )
      .addCase(
        getDetailUserHRM.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        getDetailUserInformation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.information = action.payload;
          state.status = action.payload.status;
        }
      )
      .addCase(getDetailUserInformation.rejected, (state, action: any) => {})
      .addCase(getDetailUserWorkingHistory.fulfilled, (state, action) => {
        state.workingHistory = action.payload;
      })
      .addCase(getDetailUserWorkingHistory.rejected, (state, action: any) => {})
      .addCase(deleteUser.fulfilled, (state, action) => {})
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {})
      .addCase(updateGenInfo.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(
        updateGenInfo.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(createStaffInformation.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(
        createStaffInformation.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(jobRotation.fulfilled, (state, action) => {
        openNotificationWithIcon('Cập nhật dữ liệu thành công !');
      })
      .addCase(jobRotation.rejected, (state, action: PayloadAction<any>) => {
        openNotificationWithIconFailed('Cập nhật dữ liệu thất bại');
      })
      .addCase(getListStatus.fulfilled, (state, action) => {})
      .addCase(getListStatus.rejected, (state, action: any) => {})
      .addCase(getDepartment.fulfilled, (state, action: any) => {
        // state.getDepartmentData = action.payload.data;
      })
      .addCase(getDepartment.rejected, (state, action: any) => {
        // state.getDepartmentData = [];
      })
      .addCase(getAllPosition.fulfilled, (state, action: any) => {
        state.getAllPositionData = action.payload.data;
      })
      .addCase(getAllPosition.rejected, (state, action: any) => {
        state.getAllPositionData = [];
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.allUserData = action.payload.data;
      })
      .addCase(getAllUser.rejected, (state, action: any) => {
        state.allUserData = [];
      })
      .addCase(getAllBranch.fulfilled, (state, action) => {
        state.getAllBranchData = action.payload.data;
        state.transferWork[0].detail[0].options = action.payload.data;
      })
      .addCase(getAllBranch.rejected, (state, action: any) => {
        state.getAllBranchData = [];
      })
      .addCase(searchAllListHr.fulfilled, (state, action) => {})
      .addCase(searchAllListHr.rejected, (state, action: any) => {})
      .addCase(updateStatus.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(updateStatus.rejected, (state, action: any) => {})
      .addCase(createLaborContract.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(createLaborContract.rejected, (state, action: any) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(getShift.fulfilled, (state, action) => {
        state.shiftData = action.payload.data;
      })
      .addCase(getShift.rejected, (state, action: any) => {
        state.shiftData = [];
      })
      .addCase(updateStatusStaff.fulfilled, (state, action) => {})
      .addCase(updateStatusStaff.rejected, (state, action: any) => {})
      .addCase(getAllStoresListHr.fulfilled, (state, action) => {
        state.countStorage = action.payload.count;
      })
      .addCase(getAllStoresListHr.rejected, (state, action: any) => {})
      .addCase(deleteWorkHistory.fulfilled, (state, action) => {})
      .addCase(deleteWorkHistory.rejected, (state, action: any) => {})
      .addCase(updateLaborContract.fulfilled, (state, action) => {})
      .addCase(updateLaborContract.rejected, (state, action: any) => {})
      .addCase(restoreStaff.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(restoreStaff.rejected, (state, action: any) => {})
      .addCase(createWorkingHistory.fulfilled, (state, action) => {})
      .addCase(createWorkingHistory.rejected, (state, action: any) => {})
      .addCase(updateWorkHistory.fulfilled, (state, action) => {})
      .addCase(updateWorkHistory.rejected, (state, action: any) => {})
      .addCase(createAccountNotUser.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(createAccountNotUser.rejected, (state, action: any) => {})
      .addCase(getAccount.fulfilled, (state, action) => {
        state.accountGOffice = action.payload;
      })
      .addCase(getAccount.rejected, (state, action: any) => {})
      .addCase(updateAccount.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.resetPassword.status = action.payload.status;

          state.accountGOffice = action.payload.data;
        }
      })
      .addCase(updateAccount.rejected, (state, action: any) => {
        state.resetPassword.status = null;
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {
        state.getDepartmentData = action.payload.data;
      })
      .addCase(getAllDepartment.rejected, (state, action: any) => {
        state.getDepartmentData = [];
      })
      .addCase(deleteAccountUser.fulfilled, (state, action) => {})
      .addCase(deleteAccountUser.rejected, (state, action: any) => {})
      .addCase(getListAccountNotUser.fulfilled, (state, action) => {
        state.addAccountHRM = state.addAccountHRM.map((parent) => {
          return {
            ...parent,
            // eslint-disable-next-line
            ['detail']: parent.detail.map((itemChild) => {
              return {
                ...itemChild,
                // eslint-disable-next-line
                ['options']: action.payload.data
              };
            })
          };
        });
      })
      .addCase(getListAccountNotUser.rejected, (state, action: any) => {});
  }
});

export const {
  clearData,
  pickEmployeId,
  saveBodyGetListHRM,
  clearIdSelect,
  setPageCustomerScroll,
  setCustomerInfinity,
  setTotalCustomer,
  setCustomerInfinityStorage,
  setPageCustomerScrollStorage,
  setTotalCustomerStorage
} = HRMSlice.actions;

export default HRMSlice.reducer;
