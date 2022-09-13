import React from 'react';
import CircularProgress from '../CircularProgress';
import { message as toastNotification } from 'antd';
import Auxiliary from '../../util/Auxiliary';

interface IPros {
  loading?: boolean;
  error?: string | React.ReactNode;
  message?: string | React.ReactNode;
}

const AppNotificationContainer: React.FC<IPros> = ({
  loading,
  error,
  message
}) => {
  return (
    <Auxiliary>
      {loading && (
        <div className="gx-loader-view gx-loader-position">
          <CircularProgress />
        </div>
      )}
      {error && toastNotification.error(<span id="message-id">{error}</span>)}
      {message &&
        toastNotification.info(<span id="message-id">{message}</span>)}
    </Auxiliary>
  );
};

export default AppNotificationContainer;
