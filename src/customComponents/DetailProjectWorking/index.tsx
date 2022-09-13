import ButtonCustom from '@components/Button';
import ReactBeautifulDnd from 'customComponents/ReactBeautifulDnd';
import { ClockIconBlue } from '@assets/icons/ClockIconBlue';
import { FilterIcon } from '@assets/icons/FilterIcon';
import { PlusIcon } from '@assets/icons/PlusIcon';
import { itemsFromBackend } from 'customComponents/ReactBeautifulDnd/ReactBeautifulDnd.helper';

const DetailProjectWorking = () => {
  return (
    <>
      <div className="gx-d-flex gx-align-items-center gx-justify-content-between">
        <div>G-off</div>
        <div className="gx-d-flex gx-justify-content-end">
          <ButtonCustom iconLeft={<ClockIconBlue />} value="Còn lại 26 ngày" />
          <ButtonCustom iconLeft={<FilterIcon />} value="Công việc của tôi" />
          <ButtonCustom iconLeft={<PlusIcon />} value="Thêm công việc" />
        </div>
      </div>
      <div>Thương mại hóa phần mềm trước 31/12/2022</div>
      <ReactBeautifulDnd itemsFromBE={itemsFromBackend} />
    </>
  );
};

export default DetailProjectWorking;
