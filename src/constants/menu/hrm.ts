/* eslint-disable import/no-anonymous-default-export */
import { Circle } from '@assets/icons/Circle';
import { Vertical } from '@assets/icons/Vertical';
import { PATH } from '../urls';
import { GroupIcon } from '@assets/icons/GroupIcon';

export default {
  key: 'root',
  title: 'HRM',
  url: PATH.HRM,
  icon: GroupIcon,
  children: [
    {
      key: PATH.HRM_MANAGE,
      title: 'Quản lý nhân sự',
      url: PATH.HRM_MANAGE,
      icon: Circle,
      children: [
        {
          key: PATH.HRM_MANAGE_ACCOUNT,
          title: 'Danh sách nhân sự',
          url: PATH.HRM_MANAGE_ACCOUNT,
          icon: Vertical
        },
        {
          key: PATH.HRM_MANAGE_ACCOUNT_STORAGE,
          title: 'Lưu trữ',
          url: PATH.HRM_MANAGE_ACCOUNT_STORAGE,
          icon: Vertical
        },
        {
          key: PATH.HRM_SETTING_ROLE,
          title: 'Cài đặt phân quyền',
          url: PATH.HRM_SETTING_ROLE,
          icon: Vertical
        }
      ]
    },
    // {
    //   key: PATH.HRM_TIMEKEEPING_MANAGEMENT,
    //   title: 'Quản lý chấm công',
    //   url: PATH.HRM_TIMEKEEPING_MANAGEMENT,
    //   icon: Circle,
    //   children: [
    //     {
    //       key: PATH.HRM_TIMEKEEPING,
    //       title: 'Chấm công',
    //       url: PATH.HRM_TIMEKEEPING,
    //       icon: Vertical
    //     },
    //     {
    //       key: PATH.HRM_TIMEKEEPING_SUMMARY,
    //       title: 'Tổng hợp chấm công',
    //       url: PATH.HRM_TIMEKEEPING_SUMMARY,
    //       icon: Vertical
    //     },
    //     {
    //       key: PATH.HRM_PAYROLL,
    //       title: 'Bảng lương',
    //       url: PATH.HRM_PAYROLL,
    //       icon: Vertical
    //     }
    //   ]
    // },
    // {
    //   key: PATH.HRM_PERMISSION_MANAGEMENT,
    //   title: 'Quản lý phép',
    //   url: PATH.HRM_PERMISSION_MANAGEMENT,
    //   icon: Circle
    // },
    // {
    //   key: PATH.HRM_RECRUITMENT_MANAGER,
    //   title: 'Quản lý tuyển dụng',
    //   url: PATH.HRM_RECRUITMENT_MANAGER,
    //   icon: Circle,
    //   children: [
    //     {
    //       key: PATH.HRM_RECRUITMENT_CAMPAIGN,
    //       title: 'Chiến dịch tuyển dụng',
    //       url: PATH.HRM_RECRUITMENT_CAMPAIGN,
    //       icon: Vertical
    //     },
    //     {
    //       key: PATH.HRM_INTERVIEW_SCHEDULE,
    //       title: 'Lịch phỏng vấn',
    //       url: PATH.HRM_INTERVIEW_SCHEDULE,
    //       icon: Vertical
    //     }
    //   ]
    // },
    // {
    //   key: PATH.HRM_ASSET_MANAGEMENT,
    //   title: 'Quản lý tài sản',
    //   url: PATH.HRM_ASSET_MANAGEMENT,
    //   icon: Circle
    // },
    {
      key: PATH.HRM_SETTING,
      title: 'Cài đặt',
      url: PATH.HRM_SETTING,
      icon: Circle,
      children: [
        {
          key: PATH.HRM_ORGANIZATION_SETTINGS,
          title: 'Cài đặt cơ cấu tổ chức',
          url: PATH.HRM_ORGANIZATION_SETTINGS,
          icon: Vertical
        }
        // {
        //   key: PATH.HRM_RECRUITMENT_SETTINGS,
        //   title: 'Cài đặt tuyển dụng',
        //   url: PATH.HRM_RECRUITMENT_SETTINGS,
        //   icon: Vertical
        // },
        // {
        //   key: PATH.HRM_ASSET_SETTINGS,
        //   title: 'Cài đặt tài sản',
        //   url: PATH.HRM_ASSET_SETTINGS,
        //   icon: Vertical
        // },
        // {
        //   key: PATH.HRM_CODE_SETTINGS,
        //   title: 'Cài đặt mã',
        //   url: PATH.HRM_CODE_SETTINGS,
        //   icon: Vertical
        // }
      ]
    }
  ]
};
