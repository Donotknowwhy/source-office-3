import { httpClient } from '@util/Api';

const CRMApi = {
  // manage data
  getAllDataQuote: (req) => {
    return httpClient.post(`crm/getAllData`, req);
  },
  sendEmail: (req) => {
    return httpClient.post(`crm/declaration/sendEmail`, req);
  },

  getAllData: (data) => {
    return httpClient.post('crm/getAllData', data);
  },
  getAllProduct: (data) => {
    return httpClient.post('crm/product/getAllProduct', data);
  },
  getAllService: (data) => {
    return httpClient.post('crm/service/getAllService', data);
  },
  deleteProduct: (data) => {
    return httpClient.post('crm/product/deleteProduct', data);
  },
  deleteService: (data) => {
    return httpClient.post('crm/service/deleteService', data);
  },
  createProduct: (data) => {
    return httpClient.post('crm/product/createProduct', data);
  },
  createContract: (data) => {
    return httpClient.post('crm/contract/createContract', data);
  },
  createPriceDeclaration: (data) => {
    return httpClient.post('crm/declaration/createPriceDeclaration', data);
  },
  deletePriceDeclaration: (data) => {
    return httpClient.delete('crm/declaration/deletePriceDeclaration', {
      params: data
    });
  },
  createService: (data) => {
    return httpClient.post('crm/service/createService', data);
  },
  getAllPriceDeclaration: (data) => {
    return httpClient.post('crm/declaration/getAllPriceDeclaration', data);
  },
  getPriceDeclarationById: (data) => {
    return httpClient.post('crm/declaration/getPriceDeclarationById', data);
  },
  updateStatusPriceDeclaration: (data) => {
    return httpClient.post(
      'crm/declaration/updateStatusPriceDeclaration',
      data
    );
  },
  updatePriceDeclaration: (data) => {
    return httpClient.post('crm/declaration/updatePriceDeclaration', data);
  },
  getProductService: (data) => {
    return httpClient.post('crm/getProductService', data);
  },
  getCommonDataById: (data) => {
    return httpClient.post('crm/getDataById', data);
  },
  getHistorySupport: (data) => {
    return httpClient.post('crm/getCareHistoryById', data);
  },
  updateCommonDataById: (data) => {
    return httpClient.put('crm/updateData', data);
  },
  updateHistorySupportById: (data) => {
    return httpClient.put('crm/updateCareHistory', data);
  },
  createHistorySupportById: (data) => {
    return httpClient.post('crm/createCareHistory', data);
  },
  deleteHistorySupportById: (data) => {
    return httpClient.delete(`crm/deleteCareHistory?care_history_id=${data}`);
  },
  deleteCommonDataById: (data) => {
    return httpClient.put('crm/updateStatusManagement', data);
  },
  createCommonData: (data) => {
    return httpClient.post('crm/createData', data);
  },
  getCareHistoryType: (data) => {
    return httpClient.post('crm/getCareType', data);
  },
  switchData: (data) => {
    return httpClient.put('crm/changeDataManagement', data);
  },

  // get filter common
  getStatusData: (data) => {
    return httpClient.post('crm/getStatusData', data);
  },
  getSourceData: (data) => {
    return httpClient.post('crm/getSourceData', data);
  },
  getAllUser: (data) => {
    return httpClient.post('hrm/getAllUser', data);
  },
  getDataByBranch: (data) => {
    return httpClient.post('crm/declaration/getDataByBranch', data);
  },
  getProductServiceByOne: (data) => {
    return httpClient.post('crm/getProductServiceByOne', data);
  },
  getCareProduct: (data) => {
    return httpClient.post('crm/getProductService', data);
  },
  getBusiness: () => {
    return httpClient.post('crm/getBusinessAreas');
  },

  //manage customer
  getAllCustomer: (data) => {
    return httpClient.post('crm/getAllCustomer', data);
  },
  getCustomerById: (data) => {
    return httpClient.post('crm/getCustomerById', data);
  },
  getHistorySupportCustomer: (data) => {
    return httpClient.post('crm/getCareHistoryById', data);
  },
  createCustomerData: (data) => {
    return httpClient.post('crm/createCustomer', data);
  },
  getContractHistory: (data) => {
    return httpClient.post('crm/getContractHistory', data);
  },

  //  declaration
  pdfExport: (data) => {
    return httpClient.post('crm/declaration/pdfExport', data);
  },

  // contract
  getAllContract: (data) => {
    return httpClient.post('crm/contract/getAllContract', data);
  },
  updateContract: (data) => {
    return httpClient.post('crm/contract/updateContract', data);
  },
  getContractById: (data) => {
    return httpClient.post('crm/contract/getContractById', data);
  },
  updateStatusContract: (data) => {
    return httpClient.post('crm/contract/updateStatusContract', data);
  },
  //service
  updateService: (data) => {
    return httpClient.post('crm/service/updateService', data);
  },
  //product
  updateProduct: (data) => {
    return httpClient.post('crm/product/updateProduct', data);
  },

  //update api customer
  updateCommonCustomerById: (data) => {
    return httpClient.put('crm/updateCustomer', data);
  },
  deleteCommonCustomerById: (data) => {
    return httpClient.put('crm/updateStatusCustomer', data);
  }
};

export default CRMApi;
