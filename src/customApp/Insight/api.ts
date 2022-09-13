import { httpClient } from '../../util/Api';

const InsightApi = {
  getLedgerYear: (req: any) => {
    return httpClient.post('insight/getLedgerYear', req);
  },
  getLedgerMonth: (req: any) => {
    return httpClient.post('insight/getLedgerMonth', req);
  },
  getLedger: (req: any) => {
    return httpClient.post('insight/getLedger', req);
  },
  exportLedger: (req: any) => {
    return httpClient.post('insight/exportLedger', req);
  }
};

export default InsightApi;
