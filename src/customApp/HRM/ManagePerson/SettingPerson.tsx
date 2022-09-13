import { useAppSelector } from '@appRedux/hooks';
import { Button, notification, Select, Tree } from '@components/uielements';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPermission, getPermission } from '../Settings/slice';
import { getUserAndPermission } from './../Settings/slice';

const { Option } = Select;

const openNotificationSuccess = () => {
  notification.success({
    message: 'Thành công'
  });
};

const openNotificationFailed = () => {
  notification.success({
    message: 'Thất bại'
  });
};
const SettingPerson = ({ treeData, expandKeysDefault }) => {
  const [expandedKeys, setExpandedKeys] = useState<any>(expandKeysDefault);
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const dispatch = useDispatch();
  const selectHrmState = useAppSelector((state) => state.SettingHRM);
  const [currentId, setCurrentId] = useState<any>('');

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  function handleChange(id) {
    dispatch(getPermission(id));
    setCurrentId(id);
  }

  useEffect(() => {
    selectHrmState?.listPermission?.actions &&
      setCheckedKeys(selectHrmState?.listPermission?.actions);
  }, [selectHrmState?.listPermission?.actions]);

  useEffect(() => {
    dispatch(getUserAndPermission());
  }, [dispatch]);
  return (
    <div style={{ padding: '16px' }}>
      <Select
        style={{ width: '100%' }}
        onChange={handleChange}
        placeholder="Chọn nhân sự"
      >
        {selectHrmState?.listUserAndPermission &&
          selectHrmState?.listUserAndPermission?.map((item) => {
            return (
              <Option key={item?.id} value={item?.id}>
                {item?.username}
              </Option>
            );
          })}
      </Select>
      <br />
      <br />
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
      <div className="gx-d-flex gx-justify-content-center btn-footer">
        <Button
          className="btn-cancel"
          onClick={() => {
            setCheckedKeys(selectHrmState?.listPermission?.actions);
          }}
        >
          Hủy
        </Button>
        <Button
          type="primary"
          className="btn-ok"
          disabled={!currentId}
          onClick={async () => {
            const res: any = await dispatch(
              addPermission({
                id: currentId,
                payload: checkedKeys
              })
            );

            if (res.type.endsWith('/rejected')) {
              openNotificationFailed();
            } else {
              openNotificationSuccess();
            }
          }}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default SettingPerson;
