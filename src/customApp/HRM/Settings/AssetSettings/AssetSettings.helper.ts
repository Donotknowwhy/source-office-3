import { TAB_COMMON } from '@constants/commons';

export const tabListAssetSettings = [
  {
    key: TAB_COMMON.TAB1,
    tab: 'Nhóm tài sản cố định'
  },
  {
    key: TAB_COMMON.TAB2,
    tab: 'Nhóm tài sản số'
  }
];

export const EditAssetGroup = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Loại tài sản',
        name: 'branch',
        placeHolder: 'Nhập loại tài sản',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 2,
        label: 'Mô tả',
        placeHolder: 'Nhập mô tả',
        name: 'description',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      }
    ]
  }
];
