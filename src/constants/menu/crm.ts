/* eslint-disable import/no-anonymous-default-export */
import { Circle } from '@assets/icons/Circle';
import { Crm } from '@assets/icons/Crm';
import { PATH, pathName } from '@constants/urls';

export default {
  key: 'root',
  title: 'CRM',
  url: pathName.CRM,
  icon: Crm,
  children: [
    {
      key: PATH.MANAGE_DATA,
      title: 'Quản lý data',
      url: PATH.MANAGE_DATA,
      icon: Circle
    },
    {
      key: PATH.MANAGE_CUSTOMER,
      title: 'Quản lý khách hàng',
      url: PATH.MANAGE_CUSTOMER,
      icon: Circle
    },
    {
      key: PATH.MANAGE_CONTRACT,
      title: 'Quản lý hợp đồng',
      url: PATH.MANAGE_CONTRACT,
      icon: Circle
    },
    {
      key: PATH.QUOTE,
      title: 'Báo giá',
      url: PATH.QUOTE,
      icon: Circle
    },
    {
      key: PATH.CATEGORY_SERVICE,
      title: 'Danh mục sản phẩm, dịch vụ',
      url: PATH.CATEGORY_SERVICE,
      icon: Circle
    }
  ]
};
