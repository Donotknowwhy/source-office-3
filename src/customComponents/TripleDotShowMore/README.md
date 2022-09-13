```js
export interface IDefaultDataTripleDot {
  data: ItemDataTrileDot[];
}

export interface ItemDataTrileDot {
  id: string | number;
  name: string;
  value: string;
  text_red: boolean;
}

<TripleDotShowMoreComponent data={dataTripledot} />;
```
