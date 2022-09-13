import { password } from './patterns';

//-----------------------------Required---------------------------------------
const fieldRequiredRule = () => {
  return {
    required: true,
    message: 'Vui lòng nhập đầy đủ thông tin'
  };
};

//-----------------------------Length rule---------------------------------------
const maxLengthRule = (maxLength: number) => {
  return {
    max: maxLength,
    message: `Vui lòng nhập tối đa ${maxLength} ký tự.`
  };
};

const minLengthRule = (minLength: number) => {
  return {
    min: minLength,
    message: `Vui lòng nhập tối thiểu ${minLength} ký tự.`
  };
};

const rangeLengthRule = (minLength: number, maxLength: number) => {
  return {
    min: minLength,
    max: maxLength,
    message: `Vui lòng nhập trong khoảng ${minLength}-${maxLength} ký tự.`
  };
};
//-----------------------------Format---------------------------------------

const passwordRule = () => ({
  pattern: password,
  message: 'Vui lòng nhập mật khẩu gồm số, chữ và ký tự đặc biệt'
});

const validateRule = {
  maxLengthRule,
  minLengthRule,
  rangeLengthRule,
  passwordRule,
  fieldRequiredRule
};

export default validateRule;
