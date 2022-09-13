export const itemsFromBE = [
  {
    id: 'GO-02',
    content: 'Dựng UI cho home page',
    status: 'not_start',
    priority: 'high',
    created_time: '3',
    cteated_date: '28/01/2022'
  },
  { id: 'GO-03', content: 'Dựng UI forget password', status: 'not_start' },
  { id: 'GO-04', content: 'Tạo color system', status: 'not_start' },
  { id: 'GO-05', content: 'Chọn bảng màu cho sản phẩm', status: 'not_start' },
  { id: 'GO-06', content: 'Tạo font system', status: 'not_start' }
];

export const itemsFromBackend = [
  {
    id: 'GO-02',
    content: 'Dựng UI cho home page',
    status: 'not_start',
    priority: 'high',
    created_time: '3',
    cteated_date: '28/01/2022'
  },
  {
    id: 'GO-03',
    content: 'Dựng UI forget password',
    status: 'not_start',
    priority: 'high',
    created_time: '3',
    cteated_date: '28/01/2022'
  },
  {
    id: 'GO-04',
    content: 'Tạo color system',
    status: 'not_start',
    priority: 'high',
    created_time: '3',
    cteated_date: '28/01/2022'
  },
  {
    id: 'GO-05',
    content: 'Chọn bảng màu cho sản phẩm',
    status: 'not_start',
    priority: 'high',
    created_time: '3',
    cteated_date: '28/01/2022'
  },
  {
    id: 'GO-06',
    content: 'Tạo font system',
    status: 'not_start',
    priority: 'high',
    created_time: '3',
    cteated_date: '28/01/2022'
  }
];

export const columnsFromBackend = {
  test1: {
    name: 'Chưa thực hiện',
    items: itemsFromBackend,
    status: 'not_start'
  },
  test2: {
    name: 'Đang thực hiện',
    items: [],
    status: 'processing'
  },
  test3: {
    name: 'Đề xuất hoàn thành',
    items: [],
    status: 'propose_complete'
  },
  test4: {
    name: 'Phê duyệt hoàn thành',
    items: [],
    status: 'accept_complete'
  }
};
