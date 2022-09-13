export const ListOfProductAndServiceTab = [
  {
    key: 'tab1',
    tab: 'Danh sách sản phẩm'
  },
  {
    key: 'tab2',
    tab: 'Danh sách dịch vụ'
  }
];

export const addProduct = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Mã sản phẩm',
        name: 'product_code',
        rulesInput: {
          readOnly: true,
          className: 'gx-input-view-only'
        }
      },
      {
        id: 2,
        label: 'Tên sản phẩm',
        placeHolder: 'Nhập tên sản phẩm',
        name: 'product_name',
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
        label: 'Nhà cung cấp',
        placeHolder: 'Nhập nhà cung cấp',
        name: 'supplier'
      },
      {
        id: 4,
        label: 'Đơn vị tính',
        placeHolder: 'Nhập đơn vị tính',
        type: 'dropdown',
        name: 'unit',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Chai',
            value: 'Chai'
          },
          {
            name: 'Sản phẩm',
            value: 'Sản phẩm'
          },

          {
            name: 'Lọ',
            value: 'Lọ'
          },
          {
            name: 'Khác',
            value: 'Khác'
          }
        ]
      },
      {
        id: 7,
        label: 'Thuế GTGT (%)',
        placeHolder: 'Nhập thuế GTGT',
        name: 'added_value',
        type: 'number'
      },
      {
        id: 5,
        label: 'Đơn giá',
        placeHolder: 'Nhập đơn giá',
        type: 'number',
        name: 'price',
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
        id: 6,
        label: 'Mô tả',
        placeHolder: 'Nhập mô tả',
        name: 'description'
      }
    ]
  }
];

export const addService = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Mã dịch vụ',
        name: 'service_code',
        placeHolder: '',
        rulesInput: {
          readOnly: true,
          className: 'gx-input-view-only'
        }
      },
      {
        id: 2,
        label: 'Tên dịch vụ',
        placeHolder: 'Nhập tên sản phẩm',
        name: 'service_name',
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
        label: 'Nhà cung cấp',
        placeHolder: 'Nhập nhà cung cấp',
        name: 'supplier'
      },
      {
        id: 4,
        label: 'Đơn vị tính',
        placeHolder: 'Nhập đơn vị tính',
        type: 'dropdown',
        name: 'unit',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Chai',
            value: 'Chai'
          },
          {
            name: 'Sản phẩm',
            value: 'Sản phẩm'
          },

          {
            name: 'Lọ',
            value: 'Lọ'
          },
          {
            name: 'Khác',
            value: 'Khác'
          }
        ]
      },
      {
        id: 7,
        label: 'Thuế GTGT (%)',
        placeHolder: 'Nhập thuế GTGT',
        name: 'added_value',
        type: 'number'
      },
      {
        id: 5,
        label: 'Đơn giá',
        placeHolder: 'Nhập đơn giá',
        type: 'number',
        name: 'price',
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
        id: 5,
        label: 'Gia hạn',
        placeHolder: 'Nhập gia hạn',
        type: 'dropdown',
        name: 'extend',
        options: [
          {
            name: 'Có',
            value: 'Có'
          },
          {
            name: 'Không',
            value: 'Không'
          }
        ]
      },
      {
        id: 6,
        label: 'Mô tả',
        placeHolder: 'Nhập mô tả',
        name: 'description'
      }
    ]
  }
];

export const fakeApi = [
  {
    product_name: 'Áo',
    code: 'PD100004',
    unit: '99',
    price: '142000',
    added_value: '10%'
  },
  {
    product_name: 'Tên sản phẩm nè',
    code: 'PD100005',
    unit: 'Đơn vị tính nè',
    price: '111111111111',
    added_value: '10%'
  },
  {
    product_name: 'Tên sản phẩm nè',
    code: 'PD100006',
    unit: 'Đơn vị tính nè',
    price: '1111111',
    added_value: '10%'
  },
  {
    product_name: 'Tên sản phẩm nè1',
    code: 'PD100007',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    product_name: 'Áo',
    code: 'PD100008',
    unit: '99',
    price: '142000',
    added_value: '10%'
  },
  {
    service_name: 'Áo',
    code: 'SV100005',
    unit: '99',
    price: '142000',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100006',
    unit: 'Đơn vị tính nè',
    price: 'Đơn giá nè',
    added_value: '10%'
  },
  {
    service_name: 'Áo',
    code: 'SV100007',
    unit: '99',
    price: '142000',
    added_value: '10%'
  },
  {
    service_name: 'Áo',
    code: 'SV100008',
    unit: '99',
    price: '142000',
    added_value: '10%'
  },
  {
    service_name: 'Áo',
    code: 'SV100009',
    unit: '99',
    price: '142000',
    added_value: '10%'
  },
  {
    service_name: 'Áo',
    code: 'SV100010',
    unit: '99',
    price: '142000',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100011',
    unit: '99',
    price: '111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100012',
    unit: '99',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100013',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100014',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100015',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100016',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100017',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100018',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100019',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100020',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100021',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'tên dịch vụ',
    code: 'SV100022',
    unit: 'Đơn vị tính nè',
    price: '1111111111',
    added_value: '10%'
  },
  {
    service_name: 'Áo',
    code: 'SV100023',
    unit: '99',
    price: '142000',
    added_value: '10%'
  }
];
