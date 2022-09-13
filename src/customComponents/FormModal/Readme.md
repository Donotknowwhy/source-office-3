```js
const handleClick = () => {
  alert('handle after click');
};

<FormModal
  title="thông báo"
  valueBtnClick=""
  valueBtnAccept="Xác nhận"
  valueBtnCancel="Hủy"
  headingContent="Xóa công việc cá nhân"
  mainContent="Công việc bị xóa sẽ chuyển vào mục Lưu trữ. Bạn có chắc chắn xóa công việc?"
  iconPopup={<ModalWarning />}
  iconLeftBtn={<WritingIcon />}
  disableSpacingRight={true}
  handleClickAccept={handleClick}
/>;
```
