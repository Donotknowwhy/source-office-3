import React, { CSSProperties } from 'react';
import { BarsOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu, DropDownProps } from '../uielements';

export interface DropOptionProps {
  onMenuClick: (key: string) => void;
  menuOptions: { key: string; name: string | React.ReactNode }[];
  buttonStyle?: CSSProperties;
  dropdownProps?: DropDownProps;
}

const DropOption: React.FC<DropOptionProps> = (props) => {
  const menu = props.menuOptions.map((item) => <Menu.Item key={item.key}>{item.name}</Menu.Item>);
  return (
    <Dropdown
      overlay={<Menu onClick={(e) => props.onMenuClick(e.key)}>{menu}</Menu>}
      {...props.dropdownProps}
    >
      <Button style={{ border: 'none', ...props.buttonStyle }} className="gx-mb-0">
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
export default DropOption;
