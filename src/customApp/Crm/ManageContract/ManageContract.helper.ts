export const addNewContractCRM = [
  {
    idParent: 1,
    title: 'Thông tin chung',
    detail: [
      {
        id: 1,
        label: 'Mã hợp đồng',
        name: 'staff_id',
        placeHolder: 'Nhập mã hợp đồng',
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
        label: 'Tên hợp đồng',
        placeHolder: 'Nhập tên tên hợp đồng',
        name: 'username',
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
        label: 'Loại hợp đồng',
        placeHolder: 'Nhập Loại hợp đồng',
        type: 'dropdown',
        name: 'password',
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
        label: 'Tên khách hàng',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập tên khách hàng',
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
        label: 'Ngày ký',
        placeHolder: 'Nhập ngày ký',
        type: 'datePicker',
        name: 'username',
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
        label: 'Người phụ trách',
        placeHolder: 'Nhập Loại hợp đồng',
        type: 'dropdown',
        name: 'password',
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
        id: 7,
        label: 'Hiệu lực hợp đồng từ ngày',
        name: 'staff_id',
        type: 'datePicker',
        placeHolder: 'Nhập hiệu lực hợp đồng từ ngày',
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
        id: 8,
        label: 'Đến ngày',
        name: 'staff_id',
        type: 'datePicker',
        placeHolder: 'Nhập đến ngày',
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
        id: 9,
        label: 'Trạng thái',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập trạng thái',
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
        id: 10,
        label: 'Hình thức thanh toán',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập hình thức thanh toán',
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
        id: 11,
        label: 'Ngân hàng',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập ngân hàng',
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
        id: 11,
        label: 'Số tài khoản',
        name: 'staff_id',
        typeInput: 'number',
        placeHolder: 'Nhập ngân hàng',
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
        id: 12,
        label: 'Ghi chú',
        name: 'staff_id',
        type: 'fullWidth',
        placeHolder: 'Nhập ghi chú',
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
  },
  {
    idParent: 2,
    title: 'Chi tiết hợp đồng',
    detail: [
      {
        id: 1,
        label: 'Sản phẩm dịch vụ',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập sản phẩm dịch vụ',
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
            name: 'option 1',
            value: 'option 1'
          },
          {
            name: 'option 2'
          }
        ]
      },
      {
        id: 2,
        label: 'Đơn vị tính',
        placeHolder: 'Nhập đơn vị tính',
        name: 'username',
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
        label: 'Đơn giá',
        placeHolder: 'Nhập đơn giá',
        name: 'password',
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
        label: 'Số lượng',
        name: 'staff_id',
        placeHolder: 'Nhập số lượng',
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
        label: 'Chiết khấu (%)',
        placeHolder: 'Nhập chiết khấu (%)',
        name: 'username',
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
        label: 'Thành tiền ( đơn vị VNĐ) ',
        placeHolder: 'Nhập thành tiền ( đơn vị VNĐ)',
        type: 'number',
        name: 'password',
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
        id: 7,
        label: 'Thuế GTGT(%)',
        placeHolder: 'Nhập thành tiền ( đơn vị VNĐ)',
        type: 'number',
        name: 'password',
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
        id: 8,
        label: 'Thêm sản phẩm dịch vụ',
        name: 'addServiceProduct',
        type: 'button-duplicate',
        placeHolder: 'Nhập thêm sản phẩm dịch vụ'
      }
    ]
  },
  {
    idParent: 3,
    title: 'Thông tin thanh toán',
    detail: []
  },
  {
    idParent: 4,
    title: 'Đợt 1',
    detail: [
      {
        id: 1,
        label: 'Ngày thanh toán',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập ngày thanh toán',
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
        label: 'Số tiền thanh toán ( đơn vị VNĐ)',
        placeHolder: 'Nhập số tiền thanh toán ( đơn vị VNĐ)',
        name: 'username',
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
        label: 'Nội dung',
        placeHolder: 'Nhập nội dung',
        name: 'password',
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
        label: 'Trạng thái',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập Trạng thái',
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
        label: 'Hình thức thanh toán',
        placeHolder: 'Nhập hình thức thanh toán',
        type: 'dropdown',
        name: 'username',
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
        label: 'Hình thức thanh toán',
        placeHolder: 'Nhập hình thức thanh toán',
        type: 'button-duplicate',
        name: 'username',
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
        id: 7,
        label: 'Thành tiền ( đơn vị VNĐ) ',
        placeHolder: 'Nhập thành tiền ( đơn vị VNĐ)',
        type: 'fileList',
        name: 'password',
        options: [
          {
            id: 6,
            label: 'Hình thức thanh toán',
            placeHolder: 'Nhập hình thức thanh toán',
            type: 'button-duplicate',
            name: 'username',
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
            id: 7,
            label: 'Hình thức thanh toán',
            placeHolder: 'Nhập hình thức thanh toán',
            type: 'button-duplicate',
            name: 'username',
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
    ]
  }
];

export const cloneAddNewCRM = [
  {
    idParent: 1,
    title: 'Chi tiết hợp đồng',
    delete: true,
    detail: [
      {
        id: 1,
        label: 'Sản phẩm dịch vụ',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập sản phẩm dịch vụ',
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
            name: 'option  1'
          },
          {
            name: 'option  2'
          }
        ]
      },
      {
        id: 2,
        label: 'Đơn vị tính',
        placeHolder: 'Nhập đơn vị tính',
        name: 'username',
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
        label: 'Đơn giá',
        placeHolder: 'Nhập đơn giá',
        name: 'password',
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
        label: 'Số lượng',
        name: 'staff_id',
        placeHolder: 'Nhập số lượng',
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
        label: 'Chiết khấu (%)',
        placeHolder: 'Nhập chiết khấu (%)',
        name: 'username',
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
        label: 'Thành tiền ( đơn vị VNĐ) ',
        placeHolder: 'Nhập thành tiền ( đơn vị VNĐ)',
        type: 'number',
        name: 'password',
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
