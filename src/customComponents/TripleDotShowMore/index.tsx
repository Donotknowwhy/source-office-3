import cls from 'classnames';
import { TripleDotIcon } from '@assets/icons/TripleDotIcon';
import useComponentVisible from 'customComponents/CustomHook/ComponentVisible';

export interface IDefaultDataTripleDot {
  data: ItemDataTrileDot[];
  getData?: (event, selected, id, dataSelected) => void;
  idUser?: number | string;
  dataSelected?: {
    avatar: string;
    branch_name: string;
    department_name: string;
    phone: string;
    position_name: string;
    staff_code: string | number;
    staff_id: string | number;
    staff_name: string;
    work_status: string;
  }[];
}

export interface ItemDataTrileDot {
  id: string | number;
  name: string;
  value: string;
  text_red: boolean;
}
const TripleDotShowMoreComponent = ({
  data,
  idUser,
  getData,
  dataSelected
}: IDefaultDataTripleDot) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const onClickTripleDot = (e) => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <div
      onClick={onClickTripleDot}
      className="triple-dot-wrapper-component"
      ref={ref}
    >
      {<TripleDotIcon />}
      {isComponentVisible && (
        <div className="body--triple-dot__show-content">
          {data &&
            data.map((item, index) => (
              <div
                className={cls('body--triple-dot__show-content--item', {
                  'gx-text-warning-color': item?.text_red
                })}
                key={index}
                onClick={(e) => {
                  if (getData) {
                    getData(e, item?.value, idUser, dataSelected);
                  }
                }}
              >
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TripleDotShowMoreComponent;
