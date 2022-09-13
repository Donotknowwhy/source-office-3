import ButtonCustom from '@components/Button';
import Modal from 'antd/lib/modal/Modal';
import { ReactNode } from 'react';

export interface IButtonAction {
  valueBtnCancel: string;
  valueBtnAccept: string;
  headingContent: string;
  mainContent: string;
  handleClickAccept: (name) => void;
  onClick?: () => void | Function;
  handleClickCancel?: (e) => void;
  title?: string;
  iconPopup: ReactNode;
  open: boolean;
  idUser?: number | string;
  name?: string;
  widthModal?: number;
}

export default function FormModal({
  name,
  idUser,
  title = 'Thông báo',
  valueBtnAccept,
  valueBtnCancel,
  headingContent,
  mainContent,
  iconPopup,
  open,
  widthModal,
  handleClickAccept,
  handleClickCancel
}: IButtonAction) {
  return (
    <Modal
      title={title}
      visible={open}
      width={widthModal}
      className="form-task-modal"
      footer={null}
      onCancel={handleClickCancel}
      closable={false}
      bodyStyle={{ paddingRight: 'initial', paddingLeft: 'initial' }}
    >
      <div className="dialog-popup-modal">
        <div className="dialog-popup-modal__container gx-text-center">
          <div className="dialog-popup-modal__container--body">
            <div className="container--body__icon  gx-pt-2 gx-pb-4">
              {iconPopup}
            </div>
            <div className="dialog-popup-modal__container--body container--body__heading-content gx-pb-2">
              {headingContent}
            </div>
            <div className="dialog-popup-modal__container--body container--body__main-content ">
              {mainContent}
            </div>
            <div className="gx-d-flex gx-justify-content-center gx-pt-5 gx-pb-5">
              <ButtonCustom
                maxWidth={'116px'}
                value={valueBtnCancel}
                className="btn-cancel"
                onClick={handleClickCancel}
                MarginLeftButton={false}
              />

              <ButtonCustom
                maxWidth={'116px'}
                value={valueBtnAccept}
                className="btn-accept"
                onClick={() => handleClickAccept(name)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
