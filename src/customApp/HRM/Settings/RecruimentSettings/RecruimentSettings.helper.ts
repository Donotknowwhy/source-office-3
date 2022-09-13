import { TAB_COMMON } from '@constants/commons';

export const tabListRecruimentSettings = [
  {
    key: TAB_COMMON.TAB1,
    tab: 'Trạng thái ứng viên'
  }
];

export const EditCandidateStatus = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Tên trạng thái ứng viên',
        name: 'branch',
        placeHolder: 'Nhập tên trạng thái ứng viên',
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
        label: 'Mã màu',
        type: 'pickColor',
        placeHolder: 'Nhập mã màu',
        name: 'description',
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
        id: 3,
        label: 'Mô tả',
        placeHolder: 'Nhập mô tả',
        name: 'phone',
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
