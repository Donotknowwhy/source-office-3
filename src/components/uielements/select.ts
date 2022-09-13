import { Select, SelectProps } from 'antd';
export type { SelectProps } from 'antd';
export default Select;

const selectDefaultProps: SelectProps<any> = {
  getPopupContainer: (trigger: any) => trigger.parentNode
};

Select['defaultProps'] = selectDefaultProps;
