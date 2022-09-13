import { useAppSelector } from '@appRedux/hooks';
import {
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Row,
  Select
} from '@components/uielements';
import { selectCrmState } from 'customApp/Crm/slice';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { statusContract } from '../Quote.helper';

const { Option } = Select;

type IProps = {
  children: ReactNode;
  mode?: string;
  getValue?: (listName: [string]) => void;
  defaultValue?: any;
};

const FilterBtn = ({ children, mode, getValue, defaultValue }: IProps) => {
  const { filterCrm, statusData, sourceData, allUser } =
    useAppSelector(selectCrmState);

  const dispatch = useDispatch();

  const onChange = (checkedValues) => {};
  const onChange2 = (checkedValues) => {
    if (getValue) {
      getValue(checkedValues);
    }
  };
  function handleChange(value) {}

  const menu = (
    <>
      <div className="dropdown-filter-btn">
        {mode === 'customer' ? (
          ''
        ) : mode === 'filterQuote' ? (
          <>
            <p>Trạng thái</p>
            <Divider />
            <Checkbox.Group onChange={onChange2}>
              <Row>
                {defaultValue.length > 0
                  ? defaultValue.map((item) => (
                      <Col span={24}>
                        <Checkbox value={item.value}>{item.name}</Checkbox>
                      </Col>
                    ))
                  : null}
              </Row>
            </Checkbox.Group>
          </>
        ) : mode === 'managedContract' ? (
          <div>
            <Divider />
            <Checkbox.Group onChange={onChange2}>
              <Row>
                <Row>
                  {statusContract.length > 0
                    ? statusContract.map((item) => (
                        <Col span={24}>
                          <Checkbox value={item.value}>{item.name}</Checkbox>
                        </Col>
                      ))
                    : null}
                </Row>

                {defaultValue.length > 0
                  ? defaultValue.map((item) => (
                      <Col span={24}>
                        <Checkbox value={item.value}>{item.name}</Checkbox>
                      </Col>
                    ))
                  : null}
              </Row>
            </Checkbox.Group>
          </div>
        ) : (
          <>
            <>
              <p>Trạng thái</p>
              <Divider />
              <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                  <Col span={24}>
                    <Checkbox value="A">Mới</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="B">Đã chia</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="C">Đang chăm sóc</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="D">Có quan tâm</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="E">Không liên lạc được</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>

              <p>Theo nguồn</p>
              <Divider />
              <Checkbox.Group style={{ width: '100%' }} onChange={onChange2}>
                <Row>
                  <Col span={24}>
                    <Checkbox value="facebook">Facebook</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="google">Google</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="website">Website</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="hotline">Hotline</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="intro">Giới thiệu</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
              <p>Người phụ trách</p>
              <Select
                placeholder="Chọn người phụ trách"
                style={{ width: '100%' }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </>
          </>
        )}
      </div>
    </>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      {children}
    </Dropdown>
  );
};

export default FilterBtn;
