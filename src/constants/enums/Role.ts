export enum Role {
  Admin = 1,
  User = 100
}

export const RoleArray: Array<{ value: number; text: string }> = [
  { value: Role.Admin, text: 'Role.Admin' },
  { value: Role.User, text: 'Role.User' }
];

export const RoleMap = {
  '1': 'Role.Admin',
  '100': 'Role.User'
};

export const REQUEST_STATUS_TABLE = {
  NOT_STARTED: 'not_started', //Chưa bắt đầu
  PROCESSING: 'processcing', //Đang thực hiện
  COMPLETED: 'completed', //Hoàn thành
  SUSPENSE: 'suspense', //Tạm hoãn
  OUT_OF_DATE: 'out_of_date', // Quá hạn
  DELETE: 'delete' //xóa
};

export const ACTION_BUTTON = {
  DELETE: 'btn-delete'
};

export const STATUS_MODAL_BTN = {
  SUCCESS: 'success',
  ERRROR: 'error'
};

export const DataTable = [
  {
    stt: 1,
    status_project: 'Chưa bắt đầu',
    code_color: '9D2222',
    description: 'mô tả 1'
  },
  {
    stt: 2,
    status_project: 'Đang thực hiện',
    code_color: '262626',
    description: 'mô tả 2'
  },
  {
    stt: 3,
    status_project: 'Hoàn thành',
    code_color: '00D16D',
    description: 'mô tả 3'
  },
  {
    stt: 4,
    status_project: 'Tạm hoãn',
    code_color: 'FF7B30',
    description: 'mô tả 4'
  },
  {
    stt: 5,
    status_project: 'Quá hạn',
    code_color: 'B91111',
    description: 'mô tả 5'
  },
  {
    stt: 6,
    status_project: 'xóa',
    code_color: 'FF0000',
    description: 'mô tả 6'
  }
];
