import { useAppSelector } from '@appRedux/hooks';
import { GroupDownArrow } from '@assets/icons/GroupDownArrow';
import { Avatar, Popover } from '@components/uielements';
import { useAuth } from 'authentication';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
  const authState = useAppSelector((state) => state.auth.currentUser.staff);

  const { userSignOut } = useAuth();
  const history = useHistory();

  const onLogoutClick = async () => {
    await userSignOut();
    await history.push('/signin');
  };

  const userMenuOptions = (
    <ul className="gx-user-popover">
      {/* <li onClick={onLogoutClick}>Đăng xuất</li> */}
      <li onClick={onLogoutClick}>Đăng xuất</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar
          size={40}
          src={<GroupDownArrow />}
          className="list-icon-navbar"
        />
      </Popover>
    </div>
  );
};

export default UserProfile;
