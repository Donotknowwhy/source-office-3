import { Modal } from '@components/uielements';
import { useState } from 'react';

const MobileUI = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChooseImg, setIsChooseImg] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (isChooseImg === 'App Store') {
      window.location.href =
        'https://apps.apple.com/vn/app/g-office/id1601483155?l=vi';
    } else {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.gemstech.g_office';
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="mobile-ui"
      style={{ backgroundImage: 'url(/assets/images/Reponsive.png)' }}
    >
      <div>
        <div style={{ textAlign: 'center' }}>
          <img alt="logo" src={'/assets/images/g-logo-2.png'} />
        </div>

        <p style={{ fontSize: '24px' }}>Tải app ngay</p>
        <div className="gx-d-flex gx-justify-content-center">
          <img
            alt="logo"
            src={'/assets/images/app-store.png'}
            style={{ marginRight: '24px' }}
            onClick={() => {
              showModal();
              setIsChooseImg('App Store');
            }}
          />
          <img
            alt="logo"
            src={'/assets/images/google-store.png'}
            onClick={() => {
              showModal();
              setIsChooseImg('CH Play');
            }}
          />
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        centered
        className="modal-download"
      >
        <p>Tải app G-Office trên {isChooseImg}</p>
        <div className="gx-d-flex gx-justify-content-end">
          <span style={{ marginRight: '24px' }} onClick={handleCancel}>
            Đóng
          </span>
          <span onClick={handleOk}>Mở</span>
        </div>
      </Modal>
    </div>
  );
};

export default MobileUI;
