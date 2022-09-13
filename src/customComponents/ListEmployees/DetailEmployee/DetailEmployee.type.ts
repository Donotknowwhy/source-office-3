export interface IDataWorking {
  dataWorking: {
    count: number;
    data: {
      attachments?: string | null;
      created_at?: string | null;
      date: string;
      description: string;
      event: string;
      id: number | string;
      staff_id: number | string;
      updated_at?: string | null;
    }[];
    message: string;
    status: number;
  };
}

export interface IParseJSON {
  data: {
    name: string;
    status: string;
    uid: string;
    url: string;
  }[];
}

export interface IInformation {
  dataInformation: {
    data: {
      attachments: string;
      avatar: string;
      birth_day: string;
      branch_id: number;
      branch_name: string;
      company_id: number;
      company_name: string;
      created_at: string;
      department_id: number;
      department_name: string;
      email: string;
      gender: string;
      id: number;
      id_card: string | number;
      insurance_code: string;
      manager_id: number;
      manager_name: string;
      marital_status: string;
      permanent_address: string;
      phone: string | number;
      position_id: number;
      position_name: string;
      provide_address: string;
      relationship: string;
      shift_id: number;
      shift_name: string;
      staff_code: string;
      staff_name: string;
      status: number;
      supply_date: string;
      tax_code: string;
      temporary_address: string;
      updated_at: string;
      work_status: string;
    }[];
    message: string;
    status: number;
  };
}

export interface IGOfficeAccount {
  dataAccount: {
    count: number;
    message: string;
    data: {
      id: number | string;
      username: string;
    }[];
    status: number;
  };
}
