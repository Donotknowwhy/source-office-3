export interface IAccount {
  id: number;
  account_name: string;
  account_number: string;
  bank_name: string;
  surplus: string;
  account_type: string;
  staff_id: number;
  delete_at: string;
  company_code: string;
  branch_name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  bank_code?: string;
}

export interface IRevenueExpenditure {
  id?: number;
  type?: string;
  type_revenue_expenditure_id?: number;
  datetime?: string;
  staff_id_created?: any;
  staff_name_created?: any;
  content?: string;
  customer_id?: number;
  customer_name?: string;
  money?: string;
  surplus?: string;
  account_id?: number;
  account_name?: string;
  accounting?: string;
  sale_staff_id?: number;
  sale_staff_name?: string;
  note?: string;
  company_code?: string;
  branch_name?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IDataRevenueExpenditure {
  vote_type?: string;
  account_id?: number;
  since?: Date;
  toDate?: Date;
  page?: number;
  limit?: number;
  customer_name?: string;
}

export interface ISale {
  id: number;
  staff_code: string;
  staff_name: string;
}

export interface ICustomer {
  customer_code: string;
  customer_name: string;
  customer_id: number;
}

export interface IAccounting {
  id: number;
  accounting_name: string;
  created_at?: any;
  updated_at?: any;
}
