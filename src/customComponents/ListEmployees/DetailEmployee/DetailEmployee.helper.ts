export const detailLaborContract = [
  {
    title: 'hợp đồng lao động 1',
    detail: [
      {
        name: 'Mã hợp đồng',
        value: 'HD01122022'
      },
      {
        name: 'Họ và tên',
        value: 'HD01122022'
      },
      {
        name: 'Mã hợp đồng',
        value: 'HD01122022'
      },
      {
        name: 'Mã hợp đồng',
        value: 'HD01122022'
      },
      {
        name: 'Mã hợp đồng',
        value: 'HD01122022'
      },
      {
        name: 'Mã hợp đồng',
        value: 'HD01122022'
      }
    ]
  },
  {
    title: 'hợp đồng lao động 2',
    detail: [
      {
        name: 'Mã hợp đồng'
      }
    ]
  }
];

export const tabList = [
  {
    key: 'tab1',
    tab: 'Thông tin chung'
  },
  {
    key: 'tab2',
    tab: 'Hợp đồng lao động'
  },
  {
    key: 'tab3',
    tab: 'Lịch sử công tác'
  },
  {
    key: 'tab4',
    tab: 'Tài khoản G-Office'
  }
];

export const dataLaborContract = [
  {
    idParent: 1,
    title: 'Hợp đồng lao động',
    detail: [
      {
        id: 1,
        label: 'Mã hợp đồng',
        name: 'contract_code',
        placeHolder: 'Nhập mã hợp đồng',
        rulesInput: {
          readOnly: true,
          className: 'gx-input-view-only'
        }
      },
      {
        id: 2,
        label: 'Loại hợp đồng',
        placeHolder: 'Nhập loại hợp đồng',
        type: 'dropdown',
        name: 'contract_type',
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
            name: 'Có thời hạn',
            id: 'Có thời hạn',
            value: 'Có thời hạn'
          },
          {
            name: 'Vô thời hạn',
            id: 'Vô thời hạn',
            value: 'Vô thời hạn'
          }
        ]
      },
      {
        id: 3,
        label: 'Ngày bắt đầu',
        name: 'start_date',
        type: 'datePicker',
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
        id: 4,
        label: 'Ngày kết thúc',
        name: 'end_date',
        type: 'datePicker',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        placeHolder: 'Nhập kết thúc'
      },
      {
        id: 6,
        label: 'Trạng thái',
        name: 'work_status',
        type: 'dropdown',
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
            name: 'Chính thức',
            id: 'Chính thức'
          },
          {
            name: 'Thử việc',
            id: 'Thử việc'
          },
          {
            name: 'Thôi việc',
            id: 'Thôi việc'
          }
        ],
        placeHolder: 'Nhập trạng thái'
      },
      {
        id: 5,
        type: 'upload',
        label: 'Tệp đính kèm',
        placeHolder: 'Nhập tệp đính kèm',
        name: 'attachments',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      }
    ]
  },
  {
    idParent: 2,
    title: 'Lương và tài khoản ngân hàng',
    detail: [
      {
        id: 1,
        label: 'Lương cơ bản',
        name: 'basic_salary',
        placeHolder: 'Nhập lương cơ bản',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 2,
        label: 'Phụ cấp',
        name: 'allowance',
        placeHolder: 'Nhập phụ cấp',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 3,
        label: 'Hệ số lương',
        name: 'co_salary',
        placeHolder: 'Nhập hệ số lương',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },

      {
        id: 4,
        label: 'Ngân hàng',
        name: 'bank_name',
        placeHolder: 'Nhập ngân hàng'
      },
      {
        id: 5,
        label: 'Số tài khoản ngân hàng',
        name: 'account_number',
        placeHolder: 'Nhập số tài khoản ngân hàng'
      },
      {
        id: 7,
        label: 'Chi nhánh ngân hàng',
        name: 'bank_branch',
        placeHolder: 'Nhập chi nhánh ngân hàng'
      }
    ]
  }
];

export const viewDataLaborContract = [
  {
    idParent: 1,
    title: 'Hợp đồng lao động',
    detail: [
      {
        id: 1,
        label: 'Mã hợp đồng',
        name: 'contract_code',
        placeHolder: 'Nhập mã hợp đồng',
        rulesInput: {
          readOnly: true,
          className: 'gx-input-view-only'
        }
      },
      {
        id: 2,
        label: 'Loại hợp đồng',
        placeHolder: 'Nhập loại hợp đồng',
        type: 'dropdown',
        name: 'contract_type',
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
            name: 'Ngắn hạn',
            // id: 1,
            value: 'Ngắn hạn'
          },
          {
            name: 'Dài hạn',
            // id: 2,
            value: 'Dài hạn'
          },
          {
            name: 'Không xác định',
            // id: 3,
            value: 'Không xác định'
          }
        ]
      },
      {
        id: 3,
        label: 'Ngày bắt đầu',
        name: 'start_date',
        type: 'datePicker',
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
        id: 4,
        label: 'Ngày kết thúc',
        name: 'end_date',
        type: 'datePicker',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        placeHolder: 'Nhập kết thúc'
      },
      {
        id: 6,
        label: 'Trạng thái',
        name: 'work_status',
        type: 'dropdown',
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
            name: 'Chính thức',
            id: 'Chính thức'
          },
          {
            name: 'Thử việc',
            id: 'Thử việc'
          },
          {
            name: 'Thôi việc',
            id: 'Thôi việc'
          }
        ],
        placeHolder: 'Nhập trạng thái'
      },
      {
        id: 5,
        type: 'upload',
        label: 'Tệp đính kèm',
        placeHolder: 'Nhập tệp đính kèm',
        name: 'attachments',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      }
    ]
  },
  {
    idParent: 2,
    title: 'Lương và tài khoản ngân hàng',
    detail: [
      {
        id: 1,
        label: 'Lương cơ bản',
        name: 'basic_salary',
        placeHolder: 'Nhập lương cơ bản',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 2,
        label: 'Phụ cấp',
        name: 'allowance',
        placeHolder: 'Nhập phụ cấp',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 3,
        label: 'Hệ số lương',
        name: 'co_salary',
        placeHolder: 'Nhập hệ số lương',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },

      {
        id: 4,
        label: 'Ngân hàng',
        name: 'bank_name',
        placeHolder: 'Nhập ngân hàng'
      },
      {
        id: 5,
        label: 'Số tài khoản ngân hàng',
        name: 'account_number',
        placeHolder: 'Nhập số tài khoản ngân hàng'
      },
      {
        id: 7,
        label: 'Chi nhánh ngân hàng',
        name: 'bank_branch',
        placeHolder: 'Nhập chi nhánh ngân hàng'
      }
    ]
  }
];

export const dataWorkingHistoryForm = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Ngày tạo',
        name: 'date',
        type: 'datePicker',
        placeHolder: 'Nhập ngày tạo'
      },
      {
        id: 2,
        label: 'Tên sự kiện',
        placeHolder: 'Nhập tên sự kiện',
        name: 'event',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 3,
        label: 'Mô tả',
        name: 'description',
        placeHolder: 'Nhập mô tả',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 4,
        label: 'File đính kèm',
        name: 'attachments',
        type: 'upload',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        placeHolder: 'Nhập kết thúc'
      }
    ]
  }
];
