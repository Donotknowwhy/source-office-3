import { openNotificationWithIcon } from '@constants/commons';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import { EditAccessPoint } from 'customApp/HRM/HRMManageAccount/Form/HRM/HRMManageAccountAddNew/HRMAddNew.helper';
import {
  fetchError,
  fetchStart,
  fetchSuccess
} from '../../../appRedux/CommonSlice';
import UserApi from '../api';

// Define a type for the slice state

const handleError = (mess: string) => {
  message.error(mess);
};

export const getBranch = createAsyncThunk(
  'users/getBranch',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getBranch(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getAllBranch = createAsyncThunk(
  'users/getAllBranch',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getAllBranch(request);
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
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateStatusBranch = createAsyncThunk(
  'users/updateStatusBranch',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateStatusBranch(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateBranch = createAsyncThunk(
  'users/updateBranch',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateBranch(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateDepartment = createAsyncThunk(
  'users/updateDepartment',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateDepartment(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateStatusDepartment = createAsyncThunk(
  'users/updateStatusDepartment',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateStatusDepartment(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createBranch = createAsyncThunk(
  'users/createBranch',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createBranch(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createDepartment = createAsyncThunk(
  'users/createDepartment',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createDepartment(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createIpOfDepartment = createAsyncThunk(
  'users/createIpOfDepartment',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createIpOfDepartment(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createPosition = createAsyncThunk(
  'users/createPosition',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createPosition(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getPosition = createAsyncThunk(
  'users/getPosition',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getPosition(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updatePosition = createAsyncThunk(
  'users/updatePosition',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updatePosition(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateStatusPosition = createAsyncThunk(
  'users/updateStatusPosition',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateStatusPosition(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateIpAccess = createAsyncThunk(
  'users/updateIpAccess',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateIpAccess(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getIpAccess = createAsyncThunk(
  'users/getIpAccess',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getIpAccess(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
// Define the initial state using that type
export const createIpAccess = createAsyncThunk(
  'users/createIpAccess',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createIpAccess(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateStatusIpAccess = createAsyncThunk(
  'users/updateStatusIpAccess',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateStatusIpAccess(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteShift = createAsyncThunk(
  'users/deleteShift',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deleteShift(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteIpAccess = createAsyncThunk(
  'users/deleteIpAccess',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deleteIpAccess(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deletePosition = createAsyncThunk(
  'users/deletePosition',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deletePosition(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteDepartment = createAsyncThunk(
  'users/deleteDepartment',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deleteDepartment(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteBranch = createAsyncThunk(
  'users/deleteBranch',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.deleteBranch(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createShift = createAsyncThunk(
  'users/createShift',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.createShift(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateShift = createAsyncThunk(
  'users/updateShift',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.updateShift(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getShiftAdmin = createAsyncThunk(
  'users/getShiftAdmin',
  async (request: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getShiftAdmin(request);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

// slice permission

export const addPermission = createAsyncThunk(
  'users/addPermission',
  async (data: { id; payload }, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.addPermission(data?.id, {
        actions: data?.payload
      });
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getPermission = createAsyncThunk(
  'users/getPermission',
  async (id: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getPermission(id);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getUserAndPermission = createAsyncThunk(
  'users/getUserAndPermission',
  async (_, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getUserAndPermission();
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const addPermissionDepartment = createAsyncThunk(
  'users/addPermissionDepartment',
  async (data: { id; payload }, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.addPermissionDepartment(data?.id, {
        actions: data?.payload
      });
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getPermissionDepartment = createAsyncThunk(
  'users/getPermissionDepartment',
  async (id: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getPermissionDepartment(id);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getDepartmentAndPermission = createAsyncThunk(
  'users/getDepartmentAndPermission',
  async (_, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await UserApi.getDepartmentAndPermission();
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.message);
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

const initialState: any = {
  originationSettings: {
    branch: {
      data: []
    },
    department: {
      data: []
    },
    assetPoint: {
      data: []
    },
    position: {
      data: []
    },
    shift: {
      data: []
    }
  },
  editAccessPoint: EditAccessPoint,
  recruitmentSettings: {},
  hrmAssetSettings: {},
  listPermission: [],
  listUserAndPermission: [],
  listDepartmentAndPermission: [],
  listPermissionDepartment: []
};

export const SettingHRM = createSlice({
  name: 'SettingHRM',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranch.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          state.originationSettings.branch = action.payload;
        }
        // openNotificationWithIcon(action.payload.message);
      })
      .addCase(getBranch.rejected, (state, action: PayloadAction<any>) => {});

    builder
      .addCase(getDepartment.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          state.originationSettings.department = action.payload;
        }
      })
      .addCase(
        getDepartment.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(updateStatusBranch.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updateStatusBranch.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(getAllBranch.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          const mergeApi = EditAccessPoint.map((itemParent) => {
            return {
              ...itemParent,
              ['detail']: itemParent.detail.map((itemChild) => {
                if (itemChild.name === 'branch_id') {
                  return {
                    ...itemChild,
                    ['options']: action.payload.data
                  };
                }
                return itemChild;
              })
            };
          });
          state.getAllBranch = mergeApi;

          // openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(getAllBranch.rejected, (state, action: PayloadAction<any>) => {
        state.getAllBranch = [];
      });
    builder
      .addCase(updateBranch.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updateBranch.rejected,
        (state, action: PayloadAction<any>) => {}
      );
    builder
      .addCase(updateDepartment.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updateDepartment.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(updateStatusDepartment.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updateStatusDepartment.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(createDepartment.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        createDepartment.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(createBranch.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        createBranch.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(createIpOfDepartment.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        createIpOfDepartment.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(createPosition.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        createPosition.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(getPosition.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          state.originationSettings.position = action.payload;
        }
      })
      .addCase(getPosition.rejected, (state, action: PayloadAction<any>) => {});

    builder
      .addCase(updatePosition.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updatePosition.rejected,
        (state, action: PayloadAction<any>) => {}
      );
    builder
      .addCase(updateStatusPosition.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updateStatusPosition.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(updateIpAccess.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updateIpAccess.rejected,
        (state, action: PayloadAction<any>) => {}
      );
    builder
      .addCase(createIpAccess.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        createIpAccess.rejected,
        (state, action: PayloadAction<any>) => {}
      );

    builder
      .addCase(getIpAccess.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          state.originationSettings.assetPoint = action.payload;
        }
      })
      .addCase(getIpAccess.rejected, (state, action: PayloadAction<any>) => {});
    builder
      .addCase(updateStatusIpAccess.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        updateStatusIpAccess.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(deleteShift.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(deleteShift.rejected, (state, action: PayloadAction<any>) => {})
      .addCase(deleteBranch.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(deleteBranch.rejected, (state, action: PayloadAction<any>) => {})
      .addCase(deleteDepartment.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        deleteDepartment.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(deletePosition.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        deletePosition.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(deleteIpAccess.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(
        deleteIpAccess.rejected,
        (state, action: PayloadAction<any>) => {}
      );
    builder
      .addCase(getShiftAdmin.fulfilled, (state, action: any) => {
        state.originationSettings.shift = action.payload;
      })
      .addCase(
        getShiftAdmin.rejected,
        (state, action: PayloadAction<any>) => {}
      );
    builder
      .addCase(createShift.fulfilled, (state, action: any) => {
        if (action.payload.status === 200) {
          state.originationSettings.createShift = action.payload;
          openNotificationWithIcon(action.payload.message);
        }
      })
      .addCase(createShift.rejected, (state, action: PayloadAction<any>) => {})
      .addCase(getPermission.fulfilled, (state, action: any) => {
        state.listPermission = action.payload.data;
      })
      .addCase(getPermission.rejected, (state, action: PayloadAction<any>) => {
        state.listPermission = [];
      })
      .addCase(getUserAndPermission.fulfilled, (state, action: any) => {
        state.listUserAndPermission = action.payload.data;
      })
      .addCase(
        getUserAndPermission.rejected,
        (state, action: PayloadAction<any>) => {
          state.listUserAndPermission = [];
        }
      )
      .addCase(getPermissionDepartment.fulfilled, (state, action: any) => {
        state.listPermissionDepartment = action.payload.data;
      })
      .addCase(getPermissionDepartment.rejected, (state, action: any) => {
        state.listPermissionDepartment = [];
      })
      .addCase(getDepartmentAndPermission.fulfilled, (state, action: any) => {
        state.listDepartmentAndPermission = action.payload.data;
      })
      .addCase(
        getDepartmentAndPermission.rejected,
        (state, action: PayloadAction<any>) => {
          state.listDepartmentAndPermission = [];
        }
      );
  }
});

export const {} = SettingHRM.actions;

export default SettingHRM.reducer;
