import { fetchError, fetchStart, fetchSuccess } from '@appRedux/CommonSlice';
import { openNotificationWithIcon } from '@constants/commons';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import CRMApi from './api';
import { addNewContractCRM } from './ManageContract/ManageContract.helper';
import { addNewQuoteCRM } from './Quote/Quote.helper';

const initialState = {
  listAllData: [],
  //contract
  manageContract: {
    status: 0,
    getAll: [],
    countAddNew: 1,
    data: addNewContractCRM,
    detailInfo: {
      information: {
        data: []
      }
    },
    totalManageContract: 0,
    dataInfinityManageContract: [],
    pageManageContract: 1
  },

  //quote

  quote: {
    statusSuccess: 0,
    countAddnew: 1,
    data: [],
    detailInfor: {
      status: 0,
      data: []
    },
    formAdd: addNewQuoteCRM as any,
    detailed_quotes: [],
    filterQuote: {
      search: null,
      filter_source: null,
      filter_person_in_charge: null,
      filter_data_status: null
    },
    totalQuote: 0,
    dataInfinityQuote: [],
    pageQuote: 1
  },
  ListProduct: {
    total: 0,
    data: []
  },
  ListService: {
    total: 0,
    data: []
  },
  addNewQuoteCRM: {
    test: [],
    allCustomer: [],
    data: [],
    management: []
  },
  // data manage
  dataCommonById: [],
  historySupportData: null,
  filterCrm: {
    search: null,
    filter_source: null,
    filter_person_in_charge: null,
    filter_data_status: null
  },

  //data filter dropdown
  statusData: [],
  sourceData: [],
  allUser: [],
  careProduct: [],
  careHistoryType: [],
  businessData: [],

  //data customer
  listCustomerData: [],
  dataCustomerById: [],
  historySupportCustomer: null,
  contractHistory: [],

  //data infinity scroll
  listData: [],
  page: 2,
  test: 3,
  total: 0,

  listCustomer: [],
  pageCustomer: 2,
  totalCustomer: 0
};

export const getAllData = createAsyncThunk(
  'crm/getAll',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllData(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getAllDataQuote = createAsyncThunk(
  'crm/getAllDataQuote',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllDataQuote(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const sendEmail = createAsyncThunk(
  'crm/sendEmail',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.sendEmail(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getAllProduct = createAsyncThunk(
  'crm/getAllProduct',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllProduct(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getAllService = createAsyncThunk(
  'crm/getAllService',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllService(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteService = createAsyncThunk(
  'crm/deleteService',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.deleteService(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'crm/deleteProduct',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.deleteProduct(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  'crm/createProduct',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.createProduct(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createContract = createAsyncThunk(
  'crm/createContract',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.createContract(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createPriceDeclaration = createAsyncThunk(
  'crm/createPriceDeclaration',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.createPriceDeclaration(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const deletePriceDeclaration = createAsyncThunk(
  'crm/deletePriceDeclaration',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.deletePriceDeclaration(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const createService = createAsyncThunk(
  'crm/createService',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.createService(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getAllPriceDeclaration = createAsyncThunk(
  'crm/getAllPriceDeclaration',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllPriceDeclaration(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getPriceDeclarationById = createAsyncThunk(
  'crm/getPriceDeclarationById',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getPriceDeclarationById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateStatusPriceDeclaration = createAsyncThunk(
  'crm/updateStatusPriceDeclaration',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateStatusPriceDeclaration(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updatePriceDeclaration = createAsyncThunk(
  'crm/updatePriceDeclaration',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updatePriceDeclaration(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getProductService = createAsyncThunk(
  'crm/getProductService',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getProductService(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getAllUser = createAsyncThunk(
  'crm/getAllUser',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllUser(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getDataByBranch = createAsyncThunk(
  'crm/getDataByBranch',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getDataByBranch(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getProductServiceByOne = createAsyncThunk(
  'crm/getProductServiceByOne',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getProductServiceByOne(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getCommonDataById = createAsyncThunk(
  'crm/getCommonDataById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getCommonDataById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getHistorySupport = createAsyncThunk(
  'crm/getHistorySupport',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getHistorySupport(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateCommonDataById = createAsyncThunk(
  'crm/updateCommonDataById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateCommonDataById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const updateHistorySupportById = createAsyncThunk(
  'crm/updateHistorySupportById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateHistorySupportById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createHistorySupportById = createAsyncThunk(
  'crm/createHistorySupportById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.createHistorySupportById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const deleteCommonDataById = createAsyncThunk(
  'crm/deleteCommonDataById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.deleteCommonDataById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const deleteHistorySupportById = createAsyncThunk(
  'crm/deleteHistorySupportById',
  async (data: any, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.deleteHistorySupportById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createCommonData = createAsyncThunk(
  'crm/createCommonData',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.createCommonData(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getCareHistoryType = createAsyncThunk(
  'crm/getCareHistoryType',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getCareHistoryType(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const switchData = createAsyncThunk(
  'crm/switchData',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.switchData(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

//filter slice
export const getStatusData = createAsyncThunk(
  'crm/getStatusData',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getStatusData(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getSourceData = createAsyncThunk(
  'crm/getSourceData',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getSourceData(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getCareProduct = createAsyncThunk(
  'crm/getCareProduct',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getCareProduct(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getBusiness = createAsyncThunk(
  'crm/getBusiness',
  async (_, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getBusiness();
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

// get customer

export const getAllCustomer = createAsyncThunk(
  'crm/getAllCustomer',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllCustomer(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getCustomerById = createAsyncThunk(
  'crm/getCustomerById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getCustomerById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getHistorySupportCustomer = createAsyncThunk(
  'crm/getHistorySupportCustomer',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getHistorySupportCustomer(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const createCustomerData = createAsyncThunk(
  'crm/createCustomerData',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.createCustomerData(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const getContractHistory = createAsyncThunk(
  'crm/getContractHistory',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getContractHistory(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getAllContract = createAsyncThunk(
  'crm/getAllContract',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getAllContract(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const pdfExport = createAsyncThunk(
  'crm/pdfExport',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.pdfExport(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateContract = createAsyncThunk(
  'crm/updateContract',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateContract(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const getContractById = createAsyncThunk(
  'crm/getContractById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.getContractById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateStatusContract = createAsyncThunk(
  'crm/updateStatusContract',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateStatusContract(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateService = createAsyncThunk(
  'crm/updateService',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateService(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);
export const updateProduct = createAsyncThunk(
  'crm/updateProduct',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateProduct(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

//update slice customer
export const updateCommonCustomerById = createAsyncThunk(
  'crm/updateCommonCustomerById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.updateCommonCustomerById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const deleteCommonCustomerById = createAsyncThunk(
  'crm/deleteCommonCustomerById',
  async (data: {}, thunkapi) => {
    try {
      await thunkapi.dispatch(fetchStart());
      const response = await CRMApi.deleteCommonCustomerById(data);
      await thunkapi.dispatch(fetchSuccess());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await thunkapi.dispatch(fetchError(error.response?.data?.message));
      } else if (error instanceof Error) {
        await thunkapi.dispatch(fetchError(error.message));
      }
      return thunkapi.rejectWithValue(error);
    }
  }
);

export const CRMSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    clearTest: (state, data) => {
      state.addNewQuoteCRM.test = [];
    },
    resetFilter: (state) => {
      state.filterCrm.filter_data_status = null;
      state.filterCrm.filter_person_in_charge = null;
      state.filterCrm.filter_source = null;
      state.filterCrm.search = null;
    },
    filterChange: (state, action) => {
      state.filterCrm.filter_data_status = action.payload?.filter_data_status;
      state.filterCrm.filter_person_in_charge =
        action.payload?.filter_person_in_charge;
      state.filterCrm.filter_source = action.payload?.filter_source;
      state.filterCrm.search = action.payload?.search;
    },
    clearDataForm: (state, action) => {
      // state.quote.detailed_quotes = [];
    },
    setDataInfinity: (state, action) => {
      state.listData = action.payload;
    },
    setDataInfinityQuote: (state, action) => {
      state.quote.dataInfinityQuote = action.payload;
    },
    setPageScroll: (state, action) => {
      state.page = action.payload;
    },
    setPageQuote: (state, action) => {
      state.quote.pageQuote = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setTotalQuote: (state, action) => {
      state.quote.totalQuote = action.payload;
    },
    setCustomerInfinity: (state, action) => {
      state.listCustomer = action.payload;
    },
    setPageCustomerScroll: (state, action) => {
      state.pageCustomer = action.payload;
    },
    setTotalCustomer: (state, action) => {
      state.totalCustomer = action.payload;
    },

    // managecontract infinity  scroll
    setTotalManageContact: (state, action) => {
      state.manageContract.totalManageContract = action.payload;
    },
    setPageManageContract: (state, action) => {
      state.manageContract.pageManageContract = action.payload;
    },
    setDataInfinityManageContract: (state, action) => {
      state.manageContract.dataInfinityManageContract = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.listAllData = action.payload.data;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.listAllData = [];
      })
      .addCase(getCommonDataById.fulfilled, (state, action) => {
        state.dataCommonById = action.payload.data;
      })
      .addCase(getCommonDataById.rejected, (state, action) => {
        state.dataCommonById = [];
      })
      .addCase(getHistorySupport.fulfilled, (state, action) => {
        state.historySupportData = action.payload.data;
      })
      .addCase(getHistorySupport.rejected, (state, action) => {
        state.historySupportData = null;
      })
      .addCase(getStatusData.fulfilled, (state, action) => {
        state.statusData = action.payload.data;
      })
      .addCase(getStatusData.rejected, (state, action) => {
        state.statusData = null;
      })
      .addCase(getSourceData.fulfilled, (state, action) => {
        state.sourceData = action.payload.data;
      })
      .addCase(getSourceData.rejected, (state, action) => {
        state.sourceData = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.allUser = action.payload.data;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.allUser = [];
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.businessData = action.payload.data;
      })
      .addCase(getBusiness.rejected, (state, action) => {
        state.businessData = null;
      })
      .addCase(getAllCustomer.fulfilled, (state, action) => {
        state.listCustomerData = action.payload.data;
      })
      .addCase(getAllCustomer.rejected, (state, action) => {
        state.listCustomerData = [];
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.dataCustomerById = action.payload.data;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.dataCustomerById = [];
      })
      .addCase(getHistorySupportCustomer.fulfilled, (state, action) => {
        state.historySupportCustomer = action.payload.data;
      })
      .addCase(getHistorySupportCustomer.rejected, (state, action) => {
        state.historySupportCustomer = null;
      })
      .addCase(getCareProduct.fulfilled, (state, action) => {
        state.careProduct = action.payload.data;
      })
      .addCase(getCareProduct.rejected, (state, action) => {
        state.careProduct = [];
      })
      .addCase(getCareHistoryType.fulfilled, (state, action) => {
        state.careHistoryType = action.payload.data;
      })
      .addCase(getCareHistoryType.rejected, (state, action) => {
        state.careHistoryType = [];
      })
      .addCase(getContractHistory.fulfilled, (state, action) => {
        state.contractHistory = action.payload.data;
      })
      .addCase(getContractHistory.rejected, (state, action) => {
        state.contractHistory = [];
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.listAllData = action.payload.data;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.listAllData = [];
      })
      .addCase(deleteService.fulfilled, (state, action) => {})
      .addCase(deleteService.rejected, (state, action) => {})
      .addCase(getAllProduct.fulfilled, (state, action) => {
        action.payload.data = action.payload.data.map((itemBranch, index) => {
          return { ...itemBranch, stt: index + 1 };
        });
        state.ListProduct.data = action.payload.data;
      })
      .addCase(
        getAllProduct.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(getAllService.fulfilled, (state, action) => {
        action.payload.data = action.payload.data.map((itemBranch, index) => {
          return { ...itemBranch, stt: index + 1 };
        });
        state.ListService.data = action.payload.data;
      })
      .addCase(
        getAllService.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(createProduct.fulfilled, (state, action) => {})
      .addCase(
        createProduct.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(createService.fulfilled, (state, action) => {})
      .addCase(
        createService.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(getAllPriceDeclaration.fulfilled, (state, action) => {
        // if(action.meta.arg.search !== '' || action.meta.arg.length)
        // state.quote.data = action.payload.data;
      })
      .addCase(
        getAllPriceDeclaration.rejected,
        (state, action: PayloadAction<any>) => {
          state.quote.dataInfinityQuote = [];
        }
      )
      .addCase(getPriceDeclarationById.fulfilled, (state, action) => {
        state.quote.detailInfor = action.payload;
      })
      .addCase(
        getPriceDeclarationById.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(deletePriceDeclaration.fulfilled, (state, action) => {
        // openNotificationWithIcon(action.payload.message);
      })
      .addCase(
        deletePriceDeclaration.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(sendEmail.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(sendEmail.rejected, (state, action: PayloadAction<any>) => {})
      .addCase(updateStatusPriceDeclaration.fulfilled, (state, action) => {
        state.quote.statusSuccess = action.payload.status;
        openNotificationWithIcon(action.payload.message);
        state.quote.detailInfor.data = [];
      })
      .addCase(
        updateStatusPriceDeclaration.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(updatePriceDeclaration.fulfilled, (state, action) => {})
      .addCase(
        updatePriceDeclaration.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(getDataByBranch.fulfilled, (state, action) => {
        if (action.payload.data) {
          const handleData = action.payload.data.map((item) => {
            return {
              ...item,
              ['name']: item.data_name
            };
          });
          state.addNewQuoteCRM.allCustomer = handleData;
        }
      })
      .addCase(
        getDataByBranch.rejected,
        (state, action: PayloadAction<any>) => {
          state.addNewQuoteCRM.allCustomer = [];
        }
      )
      .addCase(createPriceDeclaration.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(
        createPriceDeclaration.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(createContract.fulfilled, (state, action) => {
        openNotificationWithIcon(action.payload.message);
      })
      .addCase(
        createContract.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(pdfExport.fulfilled, (state, action) => {})
      .addCase(pdfExport.rejected, (state, action: PayloadAction<any>) => {})
      .addCase(getProductServiceByOne.fulfilled, (state, action) => {
        // if (action.payload.data.length === 0) {
        //   return;
        // }
        // const newData = action.payload.data.map((item) => {
        //   return {
        //     ...item,
        //     quantity: 1,
        //     discount: 0
        //   };
        // });
        state.addNewQuoteCRM.test = action.payload.data;
      })
      .addCase(
        getProductServiceByOne.rejected,
        (state, action: PayloadAction<any>) => {
          state.addNewQuoteCRM.test = [];
        }
      )
      .addCase(getAllDataQuote.fulfilled, (state, action) => {
        // state.quote.formAdd[0].detail[3].options = action.payload.data;
        state.addNewQuoteCRM.management = action.payload.data;
      })
      .addCase(
        getAllDataQuote.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(updateProduct.fulfilled, (state, action) => {})
      .addCase(
        updateProduct.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(getAllContract.fulfilled, (state, action) => {
        state.manageContract.getAll = action.payload.data;
      })
      .addCase(getAllContract.rejected, (state, action: PayloadAction<any>) => {
        state.manageContract.dataInfinityManageContract = [];
      })
      .addCase(updateContract.fulfilled, (state, action) => {})
      .addCase(
        updateContract.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(updateService.fulfilled, (state, action) => {})
      .addCase(
        updateService.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(getContractById.fulfilled, (state, action) => {
        // state.quote.formAdd[0].detail[3].options = action.payload.data;
        state.manageContract.detailInfo.information.data = action.payload.data;
      })
      .addCase(
        getContractById.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(updateStatusContract.fulfilled, (state, action) => {
        state.manageContract.detailInfo.information.data = action.payload.data;
      })
      .addCase(
        updateStatusContract.rejected,
        (state, action: PayloadAction<any>) => {
          state.manageContract.detailInfo.information.data = [];
        }
      )
      .addCase(getProductService.fulfilled, (state: any, action) => {
        const dataGetProductService = action.payload.data;

        state.addNewQuoteCRM.data = action.payload.data;

        const dataGetProductServiceHandle = dataGetProductService.map(
          (item) => {
            return {
              ...item,
              ['name']: item.product_name,
              ['id']: item.code
            };
          }
        );

        state.quote.formAdd[1].detail[0].options = dataGetProductServiceHandle;
      })
      .addCase(
        getProductService.rejected,
        (state, action: PayloadAction<any>) => {
          state.quote.formAdd[1].detail[0].options = [];
        }
      );
  }
});

export const selectCrmState = (state) => state.crm;

export const {
  filterChange,
  clearTest,
  resetFilter,
  clearDataForm,
  setDataInfinity,
  setPageScroll,
  setTotal,
  setCustomerInfinity,
  setPageCustomerScroll,
  setTotalCustomer,
  setPageQuote,
  setDataInfinityQuote,
  setTotalQuote,
  setTotalManageContact,
  setPageManageContract,
  setDataInfinityManageContract
} = CRMSlice.actions;

export default CRMSlice.reducer;
