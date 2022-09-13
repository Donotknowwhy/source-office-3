```js
export interface TOfPickerColor {
  getValueColor: (value) => void;
  colorDefault?: string;
}

<PickerColor colorDefault="red" getValueColor={handleGetValueColor} />;
```
