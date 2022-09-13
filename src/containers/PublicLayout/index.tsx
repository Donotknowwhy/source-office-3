import { ReactNode } from 'react';
import LOGO from '../../assets/img/logo-g.svg';
import { useAppSelector } from '@appRedux/hooks';
import { selectCommonState } from '@appRedux/CommonSlice';
import MobileUI from './MobileUI';

interface IPublicLayout {
  children: ReactNode;
  title: string;
  subTitle: string;
}

export default function PublicLayout({
  children,
  title,
  subTitle
}: IPublicLayout) {
  const { width } = useAppSelector(selectCommonState);

  return (
    <>
      {width <= 1200 ? (
        <MobileUI />
      ) : (
        <div className="public-layout">
          <div className="gx-d-flex gx-justify-content-center gx-align-items-center gx-h-100">
            <div className="public-layout__content shadow">
              <h3
                className="public-layout__title gx-mb-4 gx-pb-2"
                style={{ fontSize: '30px' }}
              >
                {title}{' '}
                <img
                  src={LOGO}
                  alt="logo"
                  className="gx-ml-2"
                  style={{ width: '35%' }}
                />
              </h3>
              <p className="public-layout__sub-title">{subTitle}</p>
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
