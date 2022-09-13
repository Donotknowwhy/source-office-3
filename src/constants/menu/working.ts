/* eslint-disable import/no-anonymous-default-export */
import { Todo } from '@assets/icons/Todo';
import { Circle } from '@assets/icons/Circle';
import { Vertical } from '@assets/icons/Vertical';
import { PATH } from '../urls';

export default {
  key: 'root',
  title: 'Công việc',
  url: PATH.TODO,
  icon: Todo,
  children: [
    {
      key: PATH.PROJECT,
      title: 'Dự án',
      url: PATH.PROJECT,
      icon: Circle
    },
    {
      key: PATH.PERSONAL,
      title: 'Cá nhân',
      url: PATH.PERSONAL,
      icon: Circle
    },
    {
      key: PATH.STORAGE,
      title: 'Lưu trữ',
      url: PATH.STORAGE,
      icon: Circle
    },
    {
      key: PATH.STATISTIC,
      title: 'Thống kê',
      url: PATH.STATISTIC,
      icon: Circle
    },
    {
      key: PATH.SETTING,
      title: 'Cài đặt',
      url: PATH.SETTING,
      icon: Circle,
      children: [
        {
          key: PATH.PROJECT_STATUS,
          title: 'Trạng thái dự án',
          url: PATH.PROJECT_STATUS,
          icon: Vertical
        },
        {
          key: PATH.PERSONAL_WORK_STATUS,
          title: 'Trạng thái công việc cá nhân',
          url: PATH.PERSONAL_WORK_STATUS,
          icon: Vertical
        },
        {
          key: PATH.TASK_STATUS,
          title: 'Trạng thái task',
          url: PATH.TASK_STATUS,
          icon: Vertical
        },
        {
          key: PATH.PROJECT_LEVEL,
          title: 'Mức độ dự án',
          url: PATH.PROJECT_LEVEL,
          icon: Vertical
        },
        {
          key: PATH.PERSONAL_WORK_LEVEL,
          title: 'Mức độ công việc cá nhân',
          url: PATH.PERSONAL_WORK_LEVEL,
          icon: Vertical
        },
        {
          key: PATH.TASK_LEVEL,
          title: 'Mức độ task',
          url: PATH.TASK_LEVEL,
          icon: Vertical
        }
      ]
    }
  ]
};
