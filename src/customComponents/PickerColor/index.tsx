import { useState } from 'react';
import { SketchPicker } from 'react-color';

export interface TOfPickerColor {
  getValueColor: (value, name) => void;
  colorDefault?: string;
  name?: string;
}

export const PickerColor = ({
  getValueColor,
  colorDefault,
  name
}: TOfPickerColor) => {
  const [color, setColor] = useState(colorDefault || 'red');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.hex);
    if (getValueColor) {
      getValueColor(color, name);
    }
  };
  return (
    <div className="picker-color-wrapper">
      <div
        className="picker-color-wrapper__box-picker"
        onClick={handleClick}
        style={{
          backgroundColor: color
        }}
      ></div>
      {displayColorPicker ? (
        <div
          className="picker-color-wrapper__display-edit-color"
          onClick={handleClose}
        >
          <div />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};
