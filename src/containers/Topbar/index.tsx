import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../appRedux/hooks';
import { routers } from './../../util/routers';
import UserProfile from './UserProfile';

const { Header } = Layout;

const Topbar = () => {
  const pathname = useAppSelector(({ common }) => common.pathname);
  const authState = useAppSelector((state) => state.auth.currentUser.staff);
  const checkCurrentMenu = (menuKey: string) => {
    return menuKey.includes(pathname.split('/')?.[1]);
  };

  return (
    <Header className="nav-header">
      <Menu
        selectedKeys={['1']}
        mode="horizontal"
        className="gx-d-flex"
        style={{ flex: '50%' }}
      >
        {routers.map((item) => (
          <Menu.Item
            key={item.key}
            className={`child-menu-item ${
              checkCurrentMenu(item.key) && 'child-menu-item-active'
            }`}
          >
            <Link to={item.key}>
              <span className="label-sub-menu">{item.label}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className="gx-d-flex gx-align-items-center">
        <Avatar
          size={40}
          src={
            authState?.avatar ? (
              JSON.parse(authState?.avatar).length > 0 ? (
                JSON.parse(authState?.avatar)[0]?.url
              ) : null
            ) : (
              <UserOutlined />
            )
          }
          className="list-icon-navbar"
          style={{ backgroundColor: '#cccccc' }}
        />
        <UserProfile />
      </div>
    </Header>
  );
};

export default Topbar;
