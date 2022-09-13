/* eslint-disable import/no-anonymous-default-export */
import { Money } from '@assets/icons/Money';
import { Circle } from '@assets/icons/Circle';
import { Vertical } from '@assets/icons/Vertical';
import { PATH } from '../urls';

export default {
  key: 'root',
  title: 'ACM',
  url: PATH.ACM,
  icon: Money,
  children: [
    {
      key: PATH.MANAGE_ACCOUNT,
      title: 'Quản lý tài khoản',
      url: PATH.MANAGE_ACCOUNT,
      icon: Circle,
      children: [
        {
          key: PATH.LIST_ACCOUNT,
          title: 'Danh sách tài khoản',
          url: PATH.LIST_ACCOUNT,
          icon: Vertical
        },
        {
          key: PATH.STORAGE_ACM,
          title: 'Lưu trữ',
          url: PATH.STORAGE_ACM,
          icon: Vertical
        }
      ]
    },
    {
      key: PATH.REVENUE_EXPENDITURE,
      title: 'Quản lý thu chi',
      url: PATH.REVENUE_EXPENDITURE,
      icon: Circle
    }
    // {
    //   key: PATH.CASH_FLOW_FORECAST,
    //   title: 'Dự báo dòng tiền',
    //   url: PATH.CASH_FLOW_FORECAST,
    //   icon: Circle
    // }
  ]
};
