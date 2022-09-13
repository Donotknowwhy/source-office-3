import { Layout, Menu } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../appRedux/hooks';
import listMenu from '../../constants/menu';
import CustomScrollbars from '../../util/CustomScrollbars';
import LOGO from '../../assets/img/logo-gemgr.svg';
import LOGO2 from '../../assets/img/logo-g.svg';
import { selectAuthState } from './../../appRedux/Authslice';
import { PATH } from '@constants/urls';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
  const [menus, setMenu] = useState('');
  const pathname = useAppSelector(({ common }) => common.pathname);
  const history = useHistory();
  const { currentUser } = useAppSelector(selectAuthState);

  let isCheckRoleAdmin = currentUser?.user?.groups
    ?.split(',')
    ?.filter((item) => item === 'ADMIN')[0];

  const getMenus = useCallback(() => {
    const currentMenu = listMenu?.[pathname.split('/')?.[1]];
    setMenu(currentMenu);
  }, [pathname]);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  const renderMenus = (menuObject) => {
    return menuObject?.children ? (
      <SubMenu
        icon={menuObject?.icon && <menuObject.icon />}
        key={menuObject?.key}
        title={menuObject?.title}
      >
        {menuObject?.children?.map((item) => {
          if (
            item.key === PATH.HRM_SETTING_ROLE &&
            isCheckRoleAdmin !== 'ADMIN'
          ) {
            return null;
          } else {
            return renderMenus(item);
          }
        })}
      </SubMenu>
    ) : (
      <Menu.Item
        icon={menuObject?.icon && <menuObject.icon />}
        key={menuObject.key}
        onClick={() => history.push(menuObject?.url)}
      >
        {menuObject?.title}
      </Menu.Item>
    );
  };

  return (
    <Sider className={`gx-app-sidebar gx-layout-sider-dark`}>
      <div className="gx-layout-sider-header">
        <img alt="logo" src={LOGO} />
      </div>
      <div className="gx-sidebar-content">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '92vh'
            }}
          >
            <Menu
              mode="inline"
              defaultOpenKeys={[
                'root',
                '/hrm/management',
                '/acm/manage-account'
              ]}
              // defaultSelectedKeys={[pathname]}
              selectedKeys={[pathname]}
              onOpenChange={(keys) => console.log('keys with openKeys', keys)}
            >
              {menus && renderMenus(menus)}
            </Menu>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img alt="logo" src={LOGO2} style={{ width: '50%' }} />
            </div>
          </div>
        </CustomScrollbars>
      </div>
    </Sider>
  );
};
export default Sidebar;
