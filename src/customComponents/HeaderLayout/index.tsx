import { ReactNode } from 'react';

export interface IHeaderLayout {
  title: string;
  children?: ReactNode;
  headerRight?: ReactNode;
}

const HeaderLayout = ({ title, children, headerRight }: IHeaderLayout) => {
  return (
    <div className="header-layout-blue">
      <div className="header-layout-blue header-layout-blue__title gx-d-flex gx-justify-content-between gx-align-items-center">
        <span>{title}</span>
        {headerRight}
      </div>
      {children && <div className="header-layout-blue__body">{children}</div>}
    </div>
  );
};

export default HeaderLayout;
