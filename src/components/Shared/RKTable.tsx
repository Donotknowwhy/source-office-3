import { Table, PaginationConfig, TableProps } from '../uielements';
import {
  FilterValue,
  SorterResult,
  SortOrder,
  TableRowSelection
} from 'antd/lib/table/interface';
import {
  BaseSearchRequest,
  BaseSortRequest
} from '../../models/Shared/BaseSearchRequest';
import { useMemo } from 'react';

export interface RKTableProps<T = any> extends TableProps<T> {
  rowSelection?: TableRowSelection<T>;
  pagination?: PaginationConfig;
  onTableChange: (data: BaseSearchRequest) => void;
  sorter?:
    | BaseSortRequest[]
    | {
        [key: string]: SortOrder;
      };
}

function RKTable<T extends object = any>({
  ...props
}: RKTableProps<T>): JSX.Element {
  const defaultPagination: PaginationConfig = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100']
    // onChange: onChange,
    // onShowSizeChange: onChange
  };

  const pagination = {
    ...defaultPagination,
    ...props.pagination
  };

  function onChange(pagination, sorter: SorterResult<T>[]) {
    let sort: BaseSortRequest[] = sorter.map((item) => {
      return { sortField: item.field.toString(), sortDir: item.order };
    });
    props.onTableChange({
      pageSize: pagination.pageSize,
      page: pagination.current,
      sort
    });
  }

  function getSorter(sorter: BaseSortRequest[]) {
    let result: {
      [key: string]: SortOrder;
    } = {};
    sorter?.forEach((item) => (result[item.sortField] = item.sortDir));
    return result;
  }

  const columns = useMemo(() => {
    const sorter = Array.isArray(props.sorter)
      ? getSorter(props.sorter)
      : props.sorter;
    return props.columns.map((col) => ({
      ...col,
      sortOrder:
        col.sorter && !col.sortOrder && sorter ? sorter[col['dataIndex']] : null
    }));
  }, [props.columns, props.sorter]);

  return (
    <div>
      <Table<T>
        bordered
        {...props}
        columns={columns}
        pagination={pagination.total > 0 ? pagination : false}
        onChange={(
          pagination: PaginationConfig,
          filters: Record<string, FilterValue>,
          sorter: SorterResult<T> | SorterResult<T>[]
        ) => {
          if (Array.isArray(sorter)) {
            onChange(pagination, sorter);
          } else {
            onChange(pagination, [sorter]);
          }
        }}
      />
    </div>
  );
}

export default RKTable;
