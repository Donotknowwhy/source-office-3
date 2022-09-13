export const PATH = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNIN_TRIAL: '/signin-trial',
  SIGNIN_CONSULTATION: '/signin-consultation',
  // ================== working
  TODO: '/todo',
  PROJECT: '/todo/project',
  PERSONAL: '/todo/personal',
  STORAGE: '/todo/storage',
  STATISTIC: '/todo/statistic',
  SETTING: '/todo/setting',
  PROJECT_STATUS: '/todo/setting/status-project',
  PERSONAL_WORK_STATUS: '/todo/personal-work-status',
  TASK_STATUS: '/todo/task-status',
  PROJECT_LEVEL: '/todo/project-level',
  PERSONAL_WORK_LEVEL: '/todo/personal-work-level',
  TASK_LEVEL: '/todos/task-level',

  // ================== hrm

  HRM: '/hrm',
  HRM_MANAGE: '/hrm/management',
  HRM_MANAGE_ACCOUNT: '/hrm/management-of-employee-list',
  HRM_MANAGE_ACCOUNT_STORAGE: '/hrm/storage',
  HRM_TIMEKEEPING_MANAGEMENT: '/hrm/timekeeping-management',
  HRM_TIMEKEEPING: '/hrm/timekeeping-management/timekeeping',
  HRM_TIMEKEEPING_SUMMARY: '/hrm/timekeeping-management/timekeeping-summary',
  HRM_PAYROLL: '/hrm/timekeeping-management/payroll',
  HRM_PERMISSION_MANAGEMENT: '/hrm/permission-management',
  HRM_RECRUITMENT_MANAGER: '/hrm/recruiment-manager',
  HRM_RECRUITMENT_CAMPAIGN: '/hrm/recruiment-manager/recruiment-campaign',
  HRM_INTERVIEW_SCHEDULE: '/hrm/interview/recruiment-manager/schedule',
  HRM_ASSET_MANAGEMENT: '/hrm/asset-management',
  HRM_SETTING: '/hrm/settings',
  HRM_ORGANIZATION_SETTINGS: '/hrm/settings/organization-settings',
  HRM_RECRUITMENT_SETTINGS: '/hrm/settings/recruiment-settings',
  HRM_ASSET_SETTINGS: '/hrm/settings/asset-settings',
  HRM_CODE_SETTINGS: '/hrm/settings/code-settings',
  HRM_SETTING_ROLE: '/hrm/settings/role',
  // LIST_ACCOUNT: '/acm/list-account',
  // STORAGE_ACM: '/acm/storage',
  // REVENUE_EXPENDITURE: '/acm/manage-revenue-expenditure',
  // REQUEST_PAYMENT_ADVANCE: '/acm/request-payment-advance',
  // ================== acm
  ACM: '/acm',
  MANAGE_ACCOUNT: '/acm/manage-account',
  LIST_ACCOUNT: '/acm/list-account',
  STORAGE_ACM: '/acm/storage',
  REVENUE_EXPENDITURE: '/acm/manage-revenue-expenditure',
  CASH_FLOW_FORECAST: '/acm/cash-flow-forecast',

  // ================== crm
  MANAGE_DATA: '/crm/manage-data',
  MANAGE_CUSTOMER: '/crm/manage-customer',
  MANAGE_CONTRACT: '/crm/manage-contract',
  QUOTE: '/crm/quote',
  CATEGORY_SERVICE: '/crm/category-service',

  //insight
  INSIGHT: '/insight',
  INCOME_STATEMENTS: '/insight/income-statements',
  EXPENSE_REPORT: '/insight/expense-report',
  CASHFLOW_STATEMENTS: '/insight/cashflow-statement',
  INVENTORY_REPORT: '/insight/inventory-report',
  CONTRACT_REPORT: '/insight/contract-report'
};

export const enum pathName {
  NEW_FEEDS = '/new-feeds',
  CALENDAR = '/calendar',
  TODO = '/todo',
  HRM = '/hrm',
  CRM = '/crm',
  ACM = '/acm',
  TICKET = '/ticket',
  REPO = '/repo',
  INSIGHT = '/insight'
}

export const enum defaultPathChosen {
  DEFAULT_NEW_FEEDS = '/new-feeds',
  DEFAULT_CALENDAR = '/calendar',
  DEFAULT_TODO = '/todo/project',
  DEFAULT_HRM = '/hrm/management-of-employee-list',
  DEFAULT_CRM = '/crm/manage-data',
  DEFAULT_ACM = '/acm/list-account',
  DEFAULT_TICKET = '/ticket',
  DEFAULT_REPO = '/repo',
  DEFAULT_INSIGHT = '/insight/income-statements'
}
