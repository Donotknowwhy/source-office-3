```js
export interface IFilterOption {
  itemSelected: string;
  data: any | [];
  iconLeft: ReactNode;
  valueBtn: string;
  valueSelected: (e) => void;
}

const [itemSelected, setItemSelected] =
  useState < any > dataSelect[0].radio_group[0].value;

const handleGetValueSelect = (selected) => {
  const listOptionFilter = selected === 'month' ? testDataMonth : testDataYears;
  setItemSelected(selected);
  setListItem(listOptionFilter);
};

<FilterOption
  valueBtn="Lọc"
  itemSelected={itemSelected}
  data={dataSelect}
  iconLeft={<FilterIcon />}
  valueSelected={handleGetValueSelect}
/>;
```
