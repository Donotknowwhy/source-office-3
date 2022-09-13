import AppNotificationContainer from '@components/AppNotificationContainer';
import { httpClient } from '@util/Api';
import { Layout } from 'antd';
import { useAuth } from 'authentication';
import Sidebar from 'containers/Sidebar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { updateWindowWidth } from '../../appRedux/CommonSlice';
import App from '../../customApp';
import Topbar from '../Topbar/index';

const { Content } = Layout;

const MainApp = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { isLoading, error } = useAuth();
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(updateWindowWidth(window.innerWidth));
    });
  }, [dispatch]);

  //axios interceptor

  // Add a request interceptor
  httpClient.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  httpClient.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        setTimeout(() => {
          history.push('/signin');
        }, 3000);
      }
      return Promise.reject(error);
    }
  );

  return (
    <Layout className="gx-app-layout">
      <Sidebar />
      <Layout>
        <Topbar />
        <Content className={`gx-layout-content } `}>
          <App match={match} />
          {/* <Footer>
            <div className="gx-layout-footer-content">{config.footerText}</div>
          </Footer> */}
        </Content>
      </Layout>
      <AppNotificationContainer loading={isLoading} error={error} />
    </Layout>
  );
};
export default MainApp;
