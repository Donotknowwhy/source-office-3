export const REQUEST_STATUS = {
  NOT_STARTED: 'not-started', //Chưa bắt đầu
  PROCESSING: 'processing', //Đang thực hiện
  COMPLETED: 'completed', //Hoàn thành
  PAUSE: 'pause', //Tạm hoãn
  OUT_OF_DATE: 'out-of-date', // Quá hạn
  DELETE: 'delete' //xóa
};

export const REQUEST_STATUS_USER = {
  PROBATION: 'thử việc', //thử việc
  OFFICIAL_STAFF: 'chính thức', //chính thức
  QUIT: 'thôi việc', // thôi việc,
  DELETE: 'delete',
  NEW: 'mới tạo',
  SENT: 'đã gửi',
  CLOSE: 'đã chốt',
  // being accepted
  WAITING_SIGN: 'chờ ký',
  BEING_ACCEPTED: 'đang nghiệm thu',
  PROCESSING: 'đang thực hiện',
  COMPLETED: 'hoàn thành',
  CANCEL: 'đã hủy'
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
