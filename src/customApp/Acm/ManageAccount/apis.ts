import { httpClient } from '@util/Api';
import { IAccount, IDataAccount } from './modules';

const ManageAccountApi = {
  getBanks: () => {
    return httpClient.get('acm/bank/all');
  },
  getAccounts: (data: IDataAccount) => {
    return httpClient.get('acm/account/all', {
      params: {
        filter: data.account_type,
        page: data.page,
        limit: data.limit,
        search: data.search
      }
    });
  },
  postAccount: (data: IAccount) => {
    return httpClient.post('acm/account/create', data);
  },
  putAccount: (data: IAccount) => {
    return httpClient.put(`acm/account/update/${data.id}`, data);
  },
  deleteAccount: (accountDeletes: number[]) => {
    return httpClient.delete(`acm/account/delete/${accountDeletes}`);
  },
  // ======================== Storage
  getAccountBackups: (data: IDataAccount) => {
    return httpClient.get('acm/account/backup/all', {
      params: {
        filter: data.account_type,
        page: data.page,
        limit: data.limit,
        search: data.search
      }
    });
  },
  putStatusAccount: (accountRestores: number[]) => {
    return httpClient.put(`acm/account/status/${accountRestores}`);
  },
  deleteAccountBackup: (accountDeletes: number[]) => {
    return httpClient.delete(`acm/account/backup/delete/${accountDeletes}`);
  }
};

export default ManageAccountApi;
