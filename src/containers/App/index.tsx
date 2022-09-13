import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch
} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';

import AppLocale from '../../lngProvider';
import MainApp from './MainApp';
import Signin from '../../customApp/Signin';
import SignupTrial from '../../customApp/SignupTrial';
import SignupConsultation from '../../customApp/SignupConsultation';
import CircularProgress from '../../components/CircularProgress';
import { PATH } from 'constants/urls';

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK
} from '../../constants/ThemeSetting';

import { useAuth } from '../../authentication';
import { useAppSelector } from '../../appRedux/hooks';
import { setInitUrl } from '../../appRedux/SettingSlice';
import { locationChange } from '../../appRedux/CommonSlice';

const RestrictedRoute = ({
  component: Component,
  location,
  authUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: PATH.SIGNIN,
            state: { from: location }
          }}
        />
      )
    }
  />
);

const setLayoutType = (layoutType) => {
  if (layoutType === LAYOUT_TYPE_FULL) {
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('framed-layout');
    document.body.classList.add('full-layout');
  } else if (layoutType === LAYOUT_TYPE_BOXED) {
    document.body.classList.remove('full-layout');
    document.body.classList.remove('framed-layout');
    document.body.classList.add('boxed-layout');
  } else if (layoutType === LAYOUT_TYPE_FRAMED) {
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('full-layout');
    document.body.classList.add('framed-layout');
  }
};

const setNavStyle = (navStyle) => {
  if (
    navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
    navStyle === NAV_STYLE_DARK_HORIZONTAL ||
    navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
    navStyle === NAV_STYLE_ABOVE_HEADER ||
    navStyle === NAV_STYLE_BELOW_HEADER
  ) {
    document.body.classList.add('full-scroll');
    document.body.classList.add('horizontal-layout');
  } else {
    document.body.classList.remove('full-scroll');
    document.body.classList.remove('horizontal-layout');
  }
};

const App = () => {
  const locale = useAppSelector(({ settings }) => settings.locale);
  const navStyle = useAppSelector(({ settings }) => settings.navStyle);
  const layoutType = useAppSelector(({ settings }) => settings.layoutType);
  const themeType = useAppSelector(({ settings }) => settings.themeType);
  const isDirectionRTL = useAppSelector(
    ({ settings }) => settings.isDirectionRTL
  );
  const initURL = useAppSelector(({ settings }) => settings.initURL);

  const { authUser, isLoadingUser } = useAuth();
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    if (isDirectionRTL) {
      document.documentElement.classList.add('rtl');
      document.documentElement.setAttribute('data-direction', 'rtl');
    } else {
      document.documentElement.classList.remove('rtl');
      document.documentElement.setAttribute('data-direction', 'ltr');
    }
  }, [isDirectionRTL]);

  useEffect(() => {
    if (locale) document.documentElement.lang = locale.locale;
  }, [locale]);

  useEffect(() => {
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme');
    } else if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
    }
  }, [themeType]);

  useEffect(() => {
    if (initURL === '') {
      dispatch(setInitUrl(location.pathname));
    }
  });

  useEffect(() => {
    dispatch(locationChange(location.pathname));
  }, [location, dispatch]);

  useEffect(() => {
    if (!isLoadingUser) {
      if (!authUser) {
        // history.push(PATH.SIGNIN);
      } else if (
        initURL === '' ||
        initURL === '/' ||
        initURL === '/signin' ||
        initURL === '/signin-trial' ||
        initURL === '/signin-consultation'
      ) {
        history.push('hrm/management-of-employee-list');
      } else {
        history.push(initURL);
      }
    }
  }, [isLoadingUser, authUser, initURL, history]);

  useEffect(() => {
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  }, [layoutType, navStyle]);

  const currentAppLocale = AppLocale[locale.locale];

  return isLoadingUser ? (
    <CircularProgress />
  ) : (
    <ConfigProvider
      locale={currentAppLocale.antd}
      direction={isDirectionRTL ? 'rtl' : 'ltr'}
    >
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          <Route exact path={PATH.SIGNIN} component={Signin} />
          <Route exact path={PATH.SIGNIN_TRIAL} component={SignupTrial} />
          <Route
            exact
            path={PATH.SIGNIN_CONSULTATION}
            component={SignupConsultation}
          />
          <RestrictedRoute
            path={`${match.url}`}
            authUser={authUser}
            location={location}
            component={MainApp}
          />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
