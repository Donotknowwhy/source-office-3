import ButtonCustom from '@components/Button';
import { Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import useComponentVisible from 'customComponents/CustomHook/ComponentVisible';
import { PickerColor } from 'customComponents/PickerColor';
import { ReactNode, useState } from 'react';

export interface IFormModalPickColor {
  valueBtnClick: string;
  valueBtnCancel: string;
  valueBtnAccept: string;
  iconLeftBtn?: ReactNode;
  disableSpacingRight?: boolean;
  handleClickAcceptModal: () => void;
  onClick?: () => void | Function;
  title: string;
}

const FormModalPickColor = ({
  title,
  iconLeftBtn,
  valueBtnClick,
  valueBtnAccept,
  valueBtnCancel,
  disableSpacingRight,
  handleClickAcceptModal
}: IFormModalPickColor) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [color, setColor] = useState('red');
  const [form] = useForm();

  const handleGetValueColor = (color) => {
    setColor(color.hex);
  };

  const handleClick = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <div>
      <ButtonCustom
        onClick={handleClick}
        value={valueBtnClick}
        iconLeft={iconLeftBtn}
        disableSpacingRight={disableSpacingRight}
      />

      {isComponentVisible && (
        <div className="dialog-popup-modal">
          <div
            className="dialog-popup-modal__container gx-text-center"
            ref={ref}
          >
            <h3 className="dialog-popup-modal__container--title ">{title}</h3>
            <div className="dialog-popup-modal__container--body gx-pt-5">
              <Form
                className="gx-form-inline-label-up gx-ml-0-75 gx-mr-0-75"
                form={form}
              >
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item
                      label="Tên trạng thái công việc cá nhân"
                      required
                    >
                      <Input placeholder="---" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mã màu" required>
                      <Input
                        value={color}
                        suffix={
                          <PickerColor
                            colorDefault="red"
                            getValueColor={handleGetValueColor}
                          />
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mô tả" required>
                      <Row>
                        <Input placeholder="---" />
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div className="gx-d-flex gx-justify-content-center gx-pt-5 gx-pb-5">
                <ButtonCustom
                  value={valueBtnCancel}
                  className="btn-cancel"
                  onClick={handleClick}
                />
                <ButtonCustom
                  value={valueBtnAccept}
                  className="btn-accept"
                  onClick={handleClickAcceptModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModalPickColor;
