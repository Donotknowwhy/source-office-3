import { httpClient } from '../../util/Api';
import { IRequestGetListHRM } from './HRMManageAccount/typeSlice';

const HRMApi = {
  // chi tiet nhan su

  updateGenInfo: (req: any) => {
    return httpClient.post('hrm/updateGenInfo', req);
  },
  getListUser: (req: any) => {
    return httpClient.post('hrm/getListHrm', req);
  },
  getUserDetail: (req: any): any => {
    return httpClient.post('hrm/getLaborContract', req);
  },
  getGeneralInfor: (req: any): any => {
    return httpClient.post('hrm/getGeneralInfor', req);
  },
  getWorkHistory: (req: any): any => {
    return httpClient.post('hrm/getWorkHistory', req);
  },
  updateStatusUser: (req: any): any => {
    return httpClient.put('hrm/update/updateStatusUser', req);
  },
  updateStatus: (req: any): any => {
    return httpClient.put('hrm/updateStatus', req);
  },
  restoreStaff: (req: any): any => {
    return httpClient.put('hrm/restoreStaff', req);
  },

  deleteUser: (req: any): any => {
    return httpClient.put('hrm/deleteUser', req);
  },
  getListStatus: (req: any): any => {
    return httpClient.post('hrm/getListStatus', req);
  },
  getAllPosition: (req: any) => {
    return httpClient.post('hrm/getAllPosition', req);
  },
  getAllUser: (req: any) => {
    return httpClient.post('hrm/getAllUser', req);
  },
  getAllBranch: (req: any) => {
    return httpClient.post('hrm/getAllBranch', req);
  },
  getAllDepartment: (req: any) => {
    return httpClient.post('hrm/getAllDepartment', req);
  },
  createStaffInformation: (req: any) => {
    return httpClient.post('hrm/createStaffInformation', req);
  },
  searchAllListHr: (req: any) => {
    return httpClient.post('hrm/searchAllListHr', req);
  },
  getShift: (req: any) => {
    return httpClient.post('hrm/getShift', req);
  },
  getAccount: (req: any) => {
    return httpClient.post('hrm/getAccount', req);
  },
  updateStatusStaff: (req: any) => {
    return httpClient.put('hrm/updateStatusStaff', req);
  },
  updateAccount: (req: any) => {
    return httpClient.put('hrm/updateAccount', req);
  },
  updateLaborContract: (req: any) => {
    return httpClient.put('hrm/updateLaborContract', req);
  },
  updateWorkHistory: (req: any) => {
    return httpClient.put('hrm/updateWorkHistory', req);
  },
  deleteAccountUser: (req: any) => {
    return httpClient.put('hrm/deleteAccount', req);
  },
  getListAccountNotUser: (req: any) => {
    return httpClient.post('hrm/getListAccountNotUser', req);
  },

  createLaborContract: (req: any) => {
    return httpClient.post('hrm/createLaborContract', req);
  },
  getAllStoresListHr: (req: any) => {
    return httpClient.post('hrm/getAllStoresListHr', req);
  },

  createWorkHistory: (req: any) => {
    return httpClient.post('hrm/createWorkHistory', req);
  },
  jobRotation: (req: any) => {
    return httpClient.post('hrm/jobRotation', req);
  },
  createAccountNotUser: (req: any) => {
    return httpClient.post('hrm/createAccountNotUser', req);
  },

  deleteWorkHistory: (req: any) => {
    return httpClient.put('hrm/deleteWorkHistory', req);
  },

  // cai dat
  getBranch: (req: any) => {
    return httpClient.post('admin/getBranch', req);
  },
  getDepartment: (req: any) => {
    return httpClient.post('admin/getDepartment', req);
  },
  getPosition: (req: any) => {
    return httpClient.post('admin/getPosition', req);
  },
  getIpAccess: (req: any) => {
    return httpClient.post('admin/getIpAccess', req);
  },
  updateIpAccess: (req: any) => {
    return httpClient.post('admin/updateIpAccess', req);
  },
  updateStatusBranch: (req: any) => {
    return httpClient.post('admin/updateStatusBranch', req);
  },
  updateBranch: (req: any) => {
    return httpClient.post('admin/updateBranch', req);
  },
  updateDepartment: (req: any) => {
    return httpClient.post('admin/updateDepartment', req);
  },
  updateStatusDepartment: (req: any) => {
    return httpClient.post('admin/updateStatusDepartment', req);
  },
  updatePosition: (req: any) => {
    return httpClient.post('admin/updatePosition', req);
  },
  updateStatusPosition: (req: any) => {
    return httpClient.post('admin/updateStatusPosition', req);
  },
  createBranch: (req: any) => {
    return httpClient.post('admin/createBranch', req);
  },
  createDepartment: (req: any) => {
    return httpClient.post('admin/createDepartment', req);
  },
  createIpOfDepartment: (req: any) => {
    return httpClient.post('admin/createIpOfDepartment', req);
  },
  createPosition: (req: any) => {
    return httpClient.post('admin/createPosition', req);
  },
  getShiftAdmin: (req: any) => {
    return httpClient.post('admin/getShift', req);
  },
  createIpAccess: (req: any) => {
    return httpClient.post('admin/createIpAccess', req);
  },
  createShift: (req: any) => {
    return httpClient.post('admin/createShift', req);
  },

  updateShift: (req: any) => {
    return httpClient.post('admin/updateShift', req);
  },

  updateStatusIpAccess: (req: any) => {
    return httpClient.post('admin/updateStatusIpAccess', req);
  },
  deleteShift: (req: any) => {
    return httpClient.delete(`admin/deleteShift`, {
      params: req
    });
  },
  deleteIpAccess: (req: any) => {
    return httpClient.delete(`admin/deleteIpAccess`, {
      params: req
    });
  },
  deletePosition: (req: any) => {
    return httpClient.delete(`admin/deletePosition`, {
      params: req
    });
  },
  deleteDepartment: (req: any) => {
    return httpClient.delete(`admin/deleteDepartment`, {
      params: req
    });
  },
  deleteBranch: (req: any) => {
    return httpClient.delete(`admin/deleteBranch`, {
      params: req
    });
  },

  // api permission
  addPermission: (id, data: any) => {
    return httpClient.post(`user/addPermission/${id}`, data);
  },
  getPermission: (id: any) => {
    return httpClient.get(`user/getPermission/${id}`);
  },
  getUserAndPermission: () => {
    return httpClient.get('user/all');
  },
  addPermissionDepartment: (id, data: any) => {
    return httpClient.post(`user/addPermissionDepartment/${id}`, data);
  },
  getPermissionDepartment: (id: any) => {
    return httpClient.get(`user/getPermissionDepartment/${id}`);
  },
  getDepartmentAndPermission: () => {
    return httpClient.get('hrm/department/all');
  }
};

export default HRMApi;
