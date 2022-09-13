/* eslint-disable import/no-anonymous-default-export */
import { Circle } from '@assets/icons/Circle';
import { Money } from '@assets/icons/Money';
import { PATH } from '../urls';

export default {
  key: 'root',
  title: 'INSIGHT',
  url: PATH.INSIGHT,
  icon: Money,
  children: [
    {
      key: PATH.INCOME_STATEMENTS,
      title: 'Báo cáo doanh thu',
      url: PATH.INCOME_STATEMENTS,
      icon: Circle
    },
    {
      key: PATH.EXPENSE_REPORT,
      title: 'Báo cáo chi phí',
      url: PATH.EXPENSE_REPORT,
      icon: Circle
    }
    // {
    //   key: '1-3',
    //   title: 'Báo cáo dòng tiền',
    //   url: PATH.CASHFLOW_STATEMENTS,
    //   icon: Circle
    // },
    // {
    //   key: '1-4',
    //   title: 'Báo cáo hàng tồn kho',
    //   url: PATH.INVENTORY_REPORT,
    //   icon: Circle
    // },
    // {
    //   key: '1-5',
    //   title: 'Báo cáo hợp đồng',
    //   url: PATH.CONTRACT_REPORT,
    //   icon: Circle
    // }
  ]
};
