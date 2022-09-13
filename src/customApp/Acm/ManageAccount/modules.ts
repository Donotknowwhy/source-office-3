export interface IAccount {
  id?: number;
  account_name: string;
  account_number?: string;
  bank_name: string;
  surplus?: string;
  account_type?: string;
  staff_id?: number;
  delete_at?: any;
  status?: number;
  created_at?: any;
  updated_at?: any;
  bank_code?: string;
}

export interface IDataAccount {
  account_type?: string;
  isAccountBackup: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

export interface IDataAccountDelete {
  accountDeletes: number[];
  isAccountBackup: boolean;
}

export interface IBank {
  id: number;
  bank_name: string;
  bank_code: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}
