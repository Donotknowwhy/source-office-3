import { notification } from 'antd';
import moment from 'moment';

export const TAB_COMMON = {
  TAB1: 'tab1',
  TAB2: 'tab2',
  TAB3: 'tab3',
  TAB4: 'tab4',
  TAB5: 'tab5'
};

export const NAME_COMMON = {
  NAME1: 'name1',
  NAME2: 'name2',
  NAME3: 'name3',
  NAME4: 'name4',
  NAME5: 'name5',
  NAME6: 'name6'
};

export const DATE_FORMAT = 'DD-MM-YYYY';
export const DATE_FORMAT_EN_GB = 'DD/MM/YYYY';
export const DATE_TIME_HISTORY_FORMAT = 'YYYY-MM-DD hh:mm:ss';
export const DATE_DD_MM_YYYY = 'DD-MM-YYYY';
export const YYYY_MM_DD = 'YYYY-MM-DD';

export const DATE_FORMAT_LTS = 'HH:mm:ss DD-MM-YYYY';
export const TIME_FORMAT = 'hh:mm';

export const formatDateTimeDisplay = (date, format = DATE_FORMAT) => {
  return date ? moment(date).format(format) : null;
};

export const formatDateENGB = (value) => {
  return value ? moment(value).format(DATE_FORMAT_EN_GB) : null;
};

export const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
];

export const openNotificationWithIconFailed = (value: string) => {
  notification.error({
    message: 'Lỗi',
    description: value,
    className: 'messageSuccess',
    placement: 'bottomRight'
  });
};

export const openNotificationWithIcon = (value: string) => {
  notification.success({
    message: 'Thành công',
    description: value,
    className: 'messageSuccess',
    placement: 'bottomRight'
  });
};

export const formatNumber = (value) => {
  if (value) {
    return new Intl.NumberFormat('de-DE').format(value);
  }
};

// export const openNotificationWithIcon = (value: string) => {
//   notification.success({
//     message: 'Success',
//     description: value,
//     className: 'messageSuccess'
//   });
// };

// status:'',
// data:[],
// message:''
