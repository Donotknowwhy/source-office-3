export const relationShip = [
  { id: '1', name: 'Bố', value: 'Bố' },
  { id: '2', name: 'Mẹ', value: 'Mẹ' },
  { id: '3', name: 'Vợ/Chồng', value: 'Vợ/Chồng' },
  { id: '4', name: 'Con', value: 'Con' }
];

export const maritalStatus = [
  {
    name: 'Đã kết hôn',
    id: 'Đã kết hôn'
  },
  {
    name: 'Độc thân',
    id: 'Độc thân'
  }
];

export const gender = [
  {
    name: 'Nam',
    id: 'Nam'
  },
  {
    name: 'Nữ',
    id: 'Nữ'
  }
];

export const addEmployee = [
  {
    idParent: 1,
    title: 'Thông tin cá nhân',
    detail: [
      {
        id: 0,
        type: 'img',
        label: '',
        name: 'avatar'
      },
      {
        id: 1,
        label: 'Mã nhân viên',
        name: 'staff_code',
        placeHolder: 'Nhập mã nhân viên'
      },
      {
        id: 2,
        label: 'Họ và tên',
        placeHolder: 'Nhập họ và tên',
        name: 'staff_name',
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
        type: 'dropdown',
        label: 'Giới tính',
        name: 'gender',
        placeHolder: 'Nhập giới tính',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Nam',
            id: 'nam'
          },
          {
            name: 'Nữ',
            id: 'nữ'
          }
        ]
      },
      {
        id: 4,
        type: 'datePicker',
        label: 'Ngày sinh',
        name: 'birth_day',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        placeHolder: 'Nhập ngày sinh'
      },
      {
        id: 5,
        typeInput: 'number',
        label: 'Số điện thoại',
        name: 'phone',
        placeHolder: 'Nhập số điện thoại',
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
        id: 6,
        label: 'Email',
        name: 'email',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        placeHolder: 'Nhập email'
      },
      {
        id: 7,
        label: 'Tình trạng hôn nhân',
        type: 'dropdown',
        name: 'marital_status',
        placeHolder: 'Nhập tình trạng hôn nhân',
        options: [
          {
            name: 'Đã kết hôn',
            id: 'đã kết hôn'
          },
          {
            name: 'Độc thân',
            id: 'độc thân'
          }
        ]
      },
      {
        id: 8,
        label: 'Địa chỉ thường trú',
        name: 'permanent_address',
        placeHolder: 'Nhập địa chỉ thường trú',
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
        id: 9,
        label: 'Địa chỉ tạm trú',
        name: 'temporary_address',
        placeHolder: 'Nhập địa chỉ tạm trú',
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
    title: 'Thông tin pháp lý',
    detail: [
      {
        id: 1,
        label: 'Số CCCD/CMND',
        name: 'id_card',
        placeHolder: 'Nhập số CCCD/CMND',
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
        label: 'Ngày cấp',
        name: 'supply_date',
        type: 'datePicker',
        placeHolder: 'Nhập Ngày cấp',
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
        label: 'Nơi cấp',
        name: 'provide_address',
        placeHolder: 'Nhập nơi cấp',
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
        label: 'Mã số thuế',
        name: 'tax_code',
        type: 'number',
        placeHolder: 'Nhập mã số thuế'
      },
      {
        id: 5,
        label: 'Tệp đính kèm',
        name: 'attachments',
        type: 'upload',
        placeHolder: 'Nhập tệp đính kèm'
      },
      {
        id: 6,
        label: 'Số BHXH',
        name: 'insurance_code',
        type: 'number',
        placeHolder: 'Nhập số BHXH'
      }
    ]
  },
  {
    idParent: 3,
    title: 'Thông tin công việc',
    detail: [
      {
        id: 1,
        type: 'dropdown',
        label: 'Chi nhánh',
        name: 'branch_id',
        placeHolder: 'Nhập chi nhánh',
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
        label: 'Phòng ban',
        type: 'dropdown',
        name: 'department_id',
        typeInput: 'number',
        placeHolder: 'Nhập phòng ban',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'option phòng ban 1'
          },
          {
            name: 'option phòng ban 2'
          }
        ]
      },
      {
        id: 3,
        label: 'Chức vụ',
        type: 'dropdown',
        name: 'position_id',
        typeInput: 'number',
        placeHolder: 'Nhập chức vụ',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'option Chức vụ 1'
          },
          {
            name: 'option Chức vụ 2'
          }
        ]
      },
      {
        id: 4,
        label: 'Quản lý trực tiếp',
        type: 'dropdown',
        name: 'manager_id',
        placeHolder: 'Nhập quản lý trực tiếp',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'giang đẹp trai 1'
          },
          {
            name: 'giang đẹp trai 2'
          }
        ]
      },
      {
        id: 5,
        label: 'Ca làm việc',
        type: 'dropdown',
        name: 'shift_id',
        placeHolder: 'Nhập ca làm việc',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Hành chính'
          },
          {
            name: 'Part-time sáng'
          },
          {
            name: 'Part-time chiều'
          }
        ]
      }
    ]
  },
  {
    idParent: 4,
    title: 'Gia đình và người phụ thuộc',
    detail: [
      {
        id: 1,
        label: 'Mối quan hệ',
        type: 'dropdown',
        name: 'relationship',
        placeHolder: 'Nhập mối quan hệ',
        options: [
          {
            name: 'Bố',
            value: 'Bố'
          },
          {
            name: 'Mẹ',
            value: 'Mẹ'
          },
          {
            name: 'Vợ/Chồng',
            value: 'Vợ/Chồng'
          },
          {
            name: 'Con',
            value: 'Con'
          }
        ]
      },
      {
        id: 2,
        label: 'Họ và tên',
        name: 'relation_name',
        placeHolder: 'Nhập họ và tên'
      },
      {
        id: 3,
        label: 'Năm sinh',
        type: 'number',
        name: 'relation_birth_day',
        placeHolder: 'Nhập năm sinh'
      },
      {
        id: 4,
        label: 'Nghề nghiệp',
        name: 'relation_work',
        placeHolder: 'Nhập nghề nghiệp'
      },
      {
        id: 5,
        label: 'Số điện thoại',
        name: 'relation_phone',
        type: 'number',
        placeHolder: 'Nhập số điện thoại'
      },
      {
        id: 6,
        label: 'Người phụ thuộc',
        type: 'radio',
        name: 'relation_status',
        placeHolder: 'Nhập người phụ thuộc',
        options: [
          {
            name: 'có'
          },
          {
            name: 'không'
          }
        ]
      }
    ]
  }
];

export const addEmployeeReadOnly = [
  {
    idParent: 1,
    title: 'Thông tin cá nhân',
    detail: [
      {
        id: 0,
        type: 'img',
        label: '',
        name: 'avatar'
      },
      {
        id: 1,
        label: 'Mã nhân viên',
        name: 'staff_code',
        placeHolder: 'Nhập mã nhân viên'
      },
      {
        id: 2,
        label: 'Họ và tên',
        placeHolder: 'Nhập họ và tên 111',
        name: 'staff_name',
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
        type: 'dropdown',
        label: 'Giới tính',
        name: 'gender',
        placeHolder: 'Nhập giới tính',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Nam',
            id: 'nam'
          },
          {
            name: 'Nữ',
            id: 'nữ'
          }
        ]
      },
      {
        id: 4,
        type: 'datePicker',
        label: 'Ngày sinh',
        name: 'birth_day',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        placeHolder: 'Nhập ngày sinh'
      },
      {
        id: 5,
        typeInput: 'number',
        label: 'Số điện thoại',
        name: 'phone',
        placeHolder: 'Nhập số điện thoại',
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
        id: 6,
        label: 'Email',
        name: 'email',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        placeHolder: 'Nhập email'
      },
      {
        id: 7,
        label: 'Tình trạng hôn nhân',
        type: 'dropdown',
        name: 'marital_status',
        placeHolder: 'Nhập tình trạng hôn nhân',
        options: [
          {
            name: 'Đã kết hôn',
            id: 'đã kết hôn'
          },
          {
            name: 'Độc thân',
            id: 'độc thân'
          }
        ]
      },
      {
        id: 8,
        label: 'Địa chỉ thường trú',
        name: 'permanent_address',
        placeHolder: 'Nhập địa chỉ thường trú',
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
        id: 9,
        label: 'Địa chỉ tạm trú',
        name: 'temporary_address',
        placeHolder: 'Nhập địa chỉ tạm trú',
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
    title: 'Thông tin pháp lý',
    detail: [
      {
        id: 1,
        label: 'Số CCCD/CMND',
        name: 'id_card',
        placeHolder: 'Nhập số CCCD/CMND',
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
        label: 'Ngày cấp',
        name: 'supply_date',
        type: 'datePicker',
        placeHolder: 'Nhập Ngày cấp',
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
        label: 'Nơi cấp',
        name: 'provide_address',
        placeHolder: 'Nhập nơi cấp',
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
        label: 'Mã số thuế',
        name: 'tax_code',
        type: 'number',
        placeHolder: 'Nhập mã số thuế'
      },
      {
        id: 5,
        label: 'Tệp đính kèm',
        name: 'attachments',
        type: 'upload',
        placeHolder: 'Nhập tệp đính kèm'
      },
      {
        id: 6,
        label: 'Số BHXH',
        name: 'insurance_code',
        type: 'number',
        placeHolder: 'Nhập số BHXH'
      }
    ]
  },
  {
    idParent: 3,
    title: 'Thông tin công việc',
    detail: [
      {
        id: 1,
        type: 'dropdown',
        label: 'Chi nhánh',
        name: 'branch_id',
        placeHolder: 'Nhập chi nhánh',
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
        label: 'Phòng ban',
        type: 'dropdown',
        name: 'department_name',
        typeInput: 'number',
        placeHolder: 'Nhập phòng ban',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'option phòng ban 1'
          },
          {
            name: 'option phòng ban 2'
          }
        ]
      },
      {
        id: 3,
        label: 'Chức vụ',
        type: 'dropdown',
        name: 'position_name',
        typeInput: 'number',
        placeHolder: 'Nhập chức vụ',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'option Chức vụ 1'
          },
          {
            name: 'option Chức vụ 2'
          }
        ]
      },
      {
        id: 4,
        label: 'Quản lý trực tiếp',
        type: 'dropdown',
        name: 'manager_name',
        placeHolder: 'Nhập quản lý trực tiếp',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'giang đẹp trai 1'
          },
          {
            name: 'giang đẹp trai 2'
          }
        ]
      },
      {
        id: 5,
        label: 'Ca làm việc',
        type: 'dropdown',
        name: 'shift_name',
        placeHolder: 'Nhập ca làm việc',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Hành chính'
          },
          {
            name: 'Part-time sáng'
          },
          {
            name: 'Part-time chiều'
          }
        ]
      }
    ]
  },
  {
    idParent: 4,
    title: 'Gia đình và người phụ thuộc',
    detail: [
      {
        id: 1,
        label: 'Mối quan hệ',
        type: 'dropdown',
        name: 'relationship',
        placeHolder: 'Nhập mối quan hệ',
        options: [
          {
            name: 'Bố'
          },
          {
            name: 'Mẹ'
          },
          {
            name: 'Vợ/Chồng'
          },
          {
            name: 'Con'
          }
        ]
      },
      {
        id: 2,
        label: 'Họ và tên',
        name: 'relation_name',
        placeHolder: 'Nhập họ và tên'
      },
      {
        id: 3,
        label: 'Năm sinh',
        type: 'number',
        name: 'relation_birth_day',
        placeHolder: 'Nhập năm sinh'
      },
      {
        id: 4,
        label: 'Nghề nghiệp',
        name: 'relation_work',
        placeHolder: 'Nhập nghề nghiệp'
      },
      {
        id: 5,
        label: 'Số điện thoại',
        name: 'relation_phone',
        type: 'number',
        placeHolder: 'Nhập số điện thoại'
      },
      {
        id: 6,
        label: 'Người phụ thuộc',
        type: 'radio',
        name: 'relation_status',
        placeHolder: 'Nhập người phụ thuộc',
        options: [
          {
            name: 'có'
          },
          {
            name: 'không'
          }
        ]
      }
    ]
  }
];

export const viewEmployeeHRM = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 0,
        type: 'img',
        label: '',
        name: 'avatar'
      },
      {
        id: 1,
        label: 'Mã nhân viên',
        name: 'staff_code'
      },
      {
        id: 2,
        label: 'Họ và tên',
        placeHolder: 'Nhập họ và tên',
        name: 'staff_name',
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
        type: 'dropdown',
        label: 'Giới tính',
        name: 'gender',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Nam',
            id: 'nam'
          },
          {
            name: 'Nữ',
            id: 'nữ'
          }
        ]
      },
      {
        id: 4,
        type: 'datePicker',
        label: 'Ngày sinh',
        name: 'birth_day',
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
        id: 5,
        typeInput: 'number',
        label: 'Số điện thoại',
        name: 'phone',
        placeHolder: 'Nhập số điện thoại',
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
        id: 6,
        label: 'Email',
        name: 'email',
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
        id: 7,
        label: 'Tình trạng hôn nhân',
        type: 'dropdown',
        name: 'marital_status',
        options: [
          {
            name: 'Đã kết hôn',
            id: 'đã kết hôn'
          },
          {
            name: 'Độc thân',
            id: 'độc thân'
          }
        ]
      },
      {
        id: 8,
        label: 'Địa chỉ thường trú',
        name: 'permanent_address',
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
        id: 9,
        label: 'Địa chỉ tạm trú',
        name: 'temporary_address',
        placeHolder: 'Nhập địa chỉ tạm trú',
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
    title: 'Thông tin pháp lý',
    detail: [
      {
        id: 1,
        label: 'Số CCCD/CMND',
        name: 'id_card',
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
        label: 'Ngày cấp',
        name: 'supply_date',
        type: 'datePicker',
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
        label: 'Nơi cấp',
        name: 'provide_address',
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
        label: 'Mã số thuế',
        name: 'tax_code',
        type: 'number'
      },
      {
        id: 5,
        label: 'Tệp đính kèm',
        name: 'attachments',
        type: 'upload'
      },
      {
        id: 6,
        label: 'Số BHXH',
        name: 'insurance_code',
        type: 'number'
      }
    ]
  },
  {
    idParent: 3,
    title: 'Thông tin công việc',
    detail: [
      {
        id: 1,
        // type: 'dropdown',
        label: 'Chi nhánh',
        name: 'branch_name',
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
        label: 'Phòng ban',
        type: 'dropdown',
        name: 'department_name',
        typeInput: 'number',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'option phòng ban 1'
          },
          {
            name: 'option phòng ban 2'
          }
        ]
      },
      {
        id: 3,
        label: 'Chức vụ',
        type: 'dropdown',
        name: 'position_name',
        typeInput: 'number',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'option Chức vụ 1'
          },
          {
            name: 'option Chức vụ 2'
          }
        ]
      },
      {
        id: 4,
        label: 'Quản lý trực tiếp',
        type: 'dropdown',
        name: 'manager_name',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'giang đẹp trai 1'
          },
          {
            name: 'giang đẹp trai 2'
          }
        ]
      },
      {
        id: 5,
        label: 'Ca làm việc',
        type: 'dropdown',
        name: 'shift_name',
        rulesItem: {
          rules: [
            {
              required: false,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: [
          {
            name: 'Hành chính'
          },
          {
            name: 'Part-time sáng'
          },
          {
            name: 'Part-time chiều'
          }
        ]
      }
    ]
  },
  {
    idParent: 4,
    title: 'Gia đình và người phụ thuộc',
    detail: [
      {
        id: 1,
        label: 'Mối quan hệ',
        type: 'dropdown',
        name: 'relationship',
        options: [
          {
            name: 'Bố'
          },
          {
            name: 'Mẹ'
          },
          {
            name: 'Vợ/Chồng'
          },
          {
            name: 'Con'
          }
        ]
      },
      {
        id: 2,
        label: 'Họ và tên',
        name: 'relation_name'
      },
      {
        id: 3,
        label: 'Năm sinh',
        type: 'number',
        name: 'relation_birth_day'
      },
      {
        id: 4,
        label: 'Nghề nghiệp',
        name: 'relation_work'
      },
      {
        id: 5,
        label: 'Số điện thoại',
        name: 'relation_phone',
        type: 'number'
      },
      {
        id: 6,
        label: 'Người phụ thuộc',
        type: 'radio',
        name: 'relation_status',
        options: [
          {
            name: 'có'
          },
          {
            name: 'không'
          }
        ]
      }
    ]
  }
];

export const addRelationShip = [
  {
    idParent: 5,
    title: 'Gia đình và người phụ thuộc',
    detail: [
      {
        id: 1,
        label: 'Mối quan hệ',
        type: 'dropdown',
        name: `relationship`,
        placeHolder: 'Nhập mối quan hệ',
        options: [
          {
            name: 'Bố'
          },
          {
            name: 'Mẹ'
          },
          {
            name: 'Vợ/Chồng'
          },
          {
            name: 'Con'
          }
        ]
      },
      {
        id: 2,
        label: 'Họ và tên',
        name: `relation_id`,
        placeHolder: 'Nhập họ và tên'
      },
      {
        id: 3,
        label: 'Năm sinh',
        type: 'number',
        name: `relation_birth_day`,
        placeHolder: 'Nhập năm sinh'
      },
      {
        id: 4,
        label: 'Nghề nghiệp',
        name: `relation_work`,
        placeHolder: 'Nhập nghề nghiệp'
      },
      {
        id: 5,
        label: 'Số điện thoại',
        name: `relation_phone`,
        type: 'number',
        placeHolder: 'Nhập số điện thoại'
      },
      {
        id: 6,
        label: 'Người phụ thuộc',
        type: 'radio',
        name: `relation_status`,
        placeHolder: 'Nhập người phụ thuộc',
        options: [
          {
            name: 'có'
          },
          {
            name: 'không'
          }
        ]
      }
    ]
  }
];

export const dataFormTransfer = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Chi nhánh',
        type: 'dropdown',
        name: 'branch_id',
        placeHolder: 'Nhập chi nhánh',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        },
        options: []
      },
      {
        id: 2,
        label: 'Chọn ngày',
        type: 'datePicker',
        placeHolder: 'Nhập ngày',
        name: 'date',
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
        label: 'Tệp đính kèm',
        placeHolder: 'Nhập tệp đính kèm',
        type: 'upload',
        name: 'attachments',
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

export const dataFormDiscontinue = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Ngày tạo',
        type: 'datePicker',
        name: 'date',
        placeHolder: 'Nhập ngày tạo',
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
        label: 'Lý do thôi việc',
        placeHolder: 'Nhập lý do thôi việc',
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

export const EditInforBranch = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Tên chi nhánh',
        name: 'branch_name',
        placeHolder: 'Nhập tên chi nhánh',
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
        label: 'Địa chỉ',
        placeHolder: 'Nhập địa chỉ',
        name: 'address',
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
        typeInput: 'number',
        id: 3,
        label: 'Số điện thoại',
        placeHolder: 'Nhập số điện thoại',
        name: 'branch_phone',
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

export const EditAccessPoint = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Tên chi nhánh',
        name: 'branch_id',
        type: 'dropdown',
        placeHolder: 'Nhập tên chi nhánh',
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
        label: 'Tên điểm truy cập',
        placeHolder: 'Nhập tên điểm truy cập',
        name: 'ip_access_location',
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
        label: 'Địa chỉ IP',
        placeHolder: 'Nhập địa chỉ IP',
        name: 'ip_name',
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

export const EditDepartment = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Tên phòng ban',
        name: 'department_name',
        placeHolder: 'Nhập tên phòng ban',
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

export const editShift = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Ca làm việc',
        type: 'timePicker',
        name: 'branch',
        placeHolder: 'Nhập ca làm việc',
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
        label: 'Giờ bắt đầu',
        type: 'timePicker',
        placeHolder: 'Nhập giờ bắt đầu',
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
        label: 'Giờ kết thúc',
        type: 'timePicker',
        placeHolder: 'Nhập giờ kết thúc',
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

export const EditPosition = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Tên chức vụ',
        name: 'position_name',
        placeHolder: 'Nhập tên chức vụ',
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

export const addWorkHistory = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Ngày tạo',
        name: 'branch',
        placeHolder: 'Nhập ngày tạo',
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
        label: 'Tên sự kiện',
        placeHolder: 'Nhập tên sự kiện',
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
      },
      {
        id: 4,
        label: 'Tệp đính kèm',
        type: 'upload',
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

export const addAccountHRM = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Nhân sự',
        name: 'staff_id',
        type: 'dropdown',
        placeHolder: 'Nhập nhân sự',
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
        label: 'Tên Đăng nhập',
        placeHolder: 'Nhập tên Đăng nhập',
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
        label: 'Mật khẩu',
        placeHolder: 'Nhập mật khẩu',
        name: 'password',
        type: 'password',
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

export const managementAccount = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Tài khoản',
        name: 'username',
        placeHolder: 'Nhập tài khoản',
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
        label: 'Mật khẩu',
        placeHolder: 'Nhập mật khẩu',
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
