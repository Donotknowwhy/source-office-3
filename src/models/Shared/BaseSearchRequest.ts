import { SortOrder } from 'antd/lib/table/interface';

export interface BaseSearchRequest {
  page: number;
  pageSize: number;
  sort?: BaseSortRequest[];
  fields?: string[];
}

export interface BaseSortRequest {
  sortDir: SortOrder;
  sortField: string;
}
