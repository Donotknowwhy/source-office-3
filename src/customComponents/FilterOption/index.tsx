import { Radio, Space } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import ButtonCustom from '@components/Button';
import useComponentVisible from 'customComponents/CustomHook/ComponentVisible';

export interface IFilterOption {
  itemSelected: string;
  data: any | [];
  iconLeft: ReactNode;
  valueBtn: string;
  valueSelected: (e) => void;
}

export default function FilterOption(props: IFilterOption) {
  const { valueBtn, data, itemSelected, valueSelected, iconLeft } = props;
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const [defaultValueOption, setDefaultValueOption] = useState('');

  useEffect(() => {
    setDefaultValueOption(itemSelected);
  }, [itemSelected]);

  const handleClick = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const radioSelected = (e) => {
    if (valueSelected) {
      valueSelected(e.target.value);
    }
    setDefaultValueOption(e.target.value);
    handleClick();
  };
  return (
    <>
      <ButtonCustom
        value={valueBtn}
        iconLeft={iconLeft}
        onClick={handleClick}
      />

      {isComponentVisible && (
        <>
          {data.map((item) => (
            <div
              className="card-multi-filter-wrapper"
              ref={ref}
              key={item.idParent}
            >
              <div className="card-multi-filter-wrapper__body">
                <p className="card-multi-filter-wrapper__body--title gx-d-flex gx-pb-1">
                  {item.title}
                </p>
                <Radio.Group
                  value={defaultValueOption}
                  onChange={radioSelected}
                  className="gx-mb-3"
                >
                  <Space direction="vertical">
                    {item.radio_group.map((item) => (
                      <>
                        <Radio value={item.value} key={item.id}>
                          {item.name}
                        </Radio>
                      </>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
