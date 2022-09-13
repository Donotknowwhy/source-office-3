import cls from 'classnames';
import { ReactNode } from 'react';

//button to callback

export interface IButtonCustom {
  value: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  disableSpacingRight?: boolean;
  onClick?: (e, idUser, name) => void | Function | Promise<any>;
  name?: string;
  MarginLeftButton?: boolean;
  idUser?: string | number;
  background?: 'color-blue' | 'color-white' | 'color-delete' | 'color-gray';
  type?: 'submit' | 'button';
  maxWidth?: number | string;
}

export default function ButtonCustom({
  idUser,
  name,
  iconLeft,
  iconRight,
  value,
  className = '',
  disableSpacingRight = false,
  MarginLeftButton = true,
  background = 'color-blue',
  type = 'submit',
  maxWidth,
  ...props
}: IButtonCustom) {
  const handleClick = (e: any) => {
    const { onClick } = props;
    onClick?.(e, idUser, name);
  };

  return (
    <div onClick={handleClick} style={{ width: maxWidth }}>
      <button
        type={type}
        className={cls(
          `btn--action gx-d-flex gx-align-items-center gx-justify-content-center ${className}`,
          {
            'gx-ml-4': MarginLeftButton,
            [background]: true
          }
        )}
        // onClick={handleClick}
        name={name}
      >
        {iconLeft && (
          <span
            className={cls(
              'btn--action__item-left gx-d-flex gx-justify-content-center gx-align-items-center ',
              {
                'gx-mr-1': !disableSpacingRight
              }
            )}
            // onClick={handleClick}
          >
            {iconLeft}
          </span>
        )}

        {value}
        {iconRight && <span>{iconRight}</span>}
      </button>
    </div>
  );
}
