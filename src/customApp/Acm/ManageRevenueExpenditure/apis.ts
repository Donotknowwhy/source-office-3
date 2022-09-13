import { httpClient } from '@util/Api';
import { IDataRevenueExpenditure, IRevenueExpenditure } from './modules';

const RevenueExpenditureApi = {
  getCustomers: () => {
    return httpClient.get('acm/ledger/listCustomer');
  },
  getSales: () => {
    return httpClient.get('acm/ledger/listSale');
  },
  getAccounts: () => {
    return httpClient.get('acm/ledger/getAccount');
  },
  getAccounting: () => {
    return httpClient.get('acm/ledger/getAccounting');
  },
  getExportExcel: () => {
    return httpClient.get('acm/ledger/export');
  },
  getRevenueExpenditures: (data: IDataRevenueExpenditure) => {
    return httpClient.get(`acm/ledger/all/${data.account_id}`, {
      params: {
        filter: data.vote_type,
        since: data.since,
        to_date: data.toDate,
        page: data.page,
        limit: data.limit,
        customer_name: data.customer_name
      }
    });
  },
  postRevenueExpenditure: (data: IRevenueExpenditure) => {
    return httpClient.post('acm/ledger/create', data);
  },
  putRevenueExpenditure: (data: IRevenueExpenditure) => {
    return httpClient.put(`acm/ledger/update/${data.id}`, data);
  },
  deleteRevenueExpenditure: (revenueExpenditureDeletes: number[]) => {
    return httpClient.delete(`acm/ledger/delete/${revenueExpenditureDeletes}`);
  }
};

export default RevenueExpenditureApi;
