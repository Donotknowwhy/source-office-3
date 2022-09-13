import { setCurrentUser } from '@appRedux/Authslice';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { httpClient } from '../../../util/Api';
import IUser from '../models/IUser';
import { SigninRequest } from '../models/Signin';

export interface IProvideAuth {
  authUser: IUser;
  isLoadingUser: boolean;
  isLoading: boolean;
  error: string;
  userSignOut: (callbackFun?: any) => void;
  userSignin: (user: SigninRequest, callbackFun?: any) => void;
  userSignup: (user, callbackFun?: any) => void;
}

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError('');
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userSignin = (user: SigninRequest, callbackFun) => {
    fetchStart();
    httpClient
      .post<any>('auth/login', user)
      .then(({ data }) => {
        // fetchSuccess();
        setLoading(false);
        message.success(data?.message);
        httpClient.defaults.headers.common['Authorization'] =
          'Bearer ' + data.data.access_token;
        localStorage.setItem('token', data.data.access_token);
        getAuthUser();
        if (callbackFun) callbackFun(data);
      })
      .catch(function (error) {
        // fetchError(error.response?.data?.message);
        setLoading(false);
        message.error(error.response?.data?.message);
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post('auth/register', user)
      .then(({ data }) => {
        if (data.data.access_token) {
          fetchSuccess();
          localStorage.setItem('token', data.data.access_token);
          httpClient.defaults.headers.common['Authorization'] =
            'Bearer ' + data.data.access_token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.response?.data?.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaSignin = () => null;

  const userSignOut = (callbackFun) => {
    fetchStart();
    httpClient
      .post('auth/logout')
      .then(({ data }) => {
        if (data.status === 200) {
          fetchSuccess();
          httpClient.defaults.headers.common['Authorization'] = '';
          localStorage.removeItem('token');
          setAuthUser(false);
          dispatch(setCurrentUser(null));
          if (callbackFun) callbackFun();
        }
      })
      .catch(function (error) {
        fetchError(error.response?.data?.message);
      });
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .get<any>('auth/me')
      .then(({ data }) => {
        fetchSuccess();
        setAuthUser(data);
        dispatch(setCurrentUser(data?.data));
        // history.push('/newfeeds');
      })
      .catch(function (error) {
        httpClient.defaults.headers.common['Authorization'] = '';
        fetchError(error.response?.data?.message);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    httpClient
      .get<any>('auth/me')
      // .get<any>('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => {
        if (data) {
          setAuthUser(data);
          dispatch(setCurrentUser(data?.data));
        }
        setLoadingUser(false);
      })
      .catch(function () {
        localStorage.removeItem('token');
        httpClient.defaults.headers.common['Authorization'] = '';
        setLoadingUser(false);
      });
  }, [dispatch]);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userSignin,
    userSignup,
    userSignOut,
    renderSocialMediaSignin,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
};
