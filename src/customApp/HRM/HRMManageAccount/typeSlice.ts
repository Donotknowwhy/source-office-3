export interface IActionPayLoad {
  data: any;
  status: number;
  message: string;
}

// getList HRM

export interface IActionPayloadGetListHRM {
  count: number;
  data: IDataGetListHRM[];
  message: string;
  status: number;
}

export interface IDataGetListHRM {
  id: number;
  phone: string;
  position_name: string;
  staff_code: string;
  staff_name: string;
  work_status: string;
}

export interface IRequestGetListHRM {
  page: number;
  limit: number;
}

// export interface IinitialState {
//   data: IdataListEmployee;
//   dataStorage: {
//     page: 1;
//     limit: 15;
//     listHRM: [];
//     message: '';
//     status: 0;
//   };

//   detailUser: {
//     count: 0;
//     data: [];
//     message: '';
//     status: 0;
//   };
//   information: {
//     count: 0;
//     data: [];
//     message: '';
//     status: 0;
//   };
//   workingHistory: {
//     count: 0;
//     data: [];
//     message: '';
//     status: 0;
//   };
//   message: '';
//   status: 0;
//   addNewEmployeeForm: addEmployee;
//   transferWork: dataFormTransfer;
//   discontinue: 1;
//   countRelationShip: 0;
// }

export interface IdataListEmployee {
  page: number;
  limit: number;
  listHRM: [];
  message: string;
  status: number;
}
