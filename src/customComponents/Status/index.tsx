import { REQUEST_STATUS, REQUEST_STATUS_USER } from '@constants/table';
import { useCallback } from 'react';

export interface IStatus {
  status: string;
}

const Status = ({ status }: IStatus) => {
  const toLowerCase = status.toLocaleLowerCase();

  const render = useCallback(() => {
    if (toLowerCase === REQUEST_STATUS.NOT_STARTED) {
      return <span className="status status--not-started">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS.PROCESSING) {
      return <span className="status status--processing">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS.COMPLETED) {
      return <span className="status status--completed">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS.PAUSE) {
      return <span className="status status--pause">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS.OUT_OF_DATE) {
      return <span className="status status--out-of-date">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS.DELETE) {
      return <span className="status status--delete">{status}</span>;
    } else if (
      toLowerCase === REQUEST_STATUS_USER.OFFICIAL_STAFF ||
      toLowerCase === REQUEST_STATUS_USER.COMPLETED
    ) {
      return <span className="status status--official-staff">{status}</span>;
    } else if (
      toLowerCase === REQUEST_STATUS_USER.NEW ||
      toLowerCase === REQUEST_STATUS_USER.WAITING_SIGN ||
      toLowerCase === REQUEST_STATUS_USER.PROBATION
    ) {
      return <span className="status status--create-new-CRM">{status}</span>;
    } else if (
      toLowerCase === REQUEST_STATUS_USER.SENT ||
      toLowerCase === REQUEST_STATUS_USER.BEING_ACCEPTED
    ) {
      return <span className="status status--sent-CRM">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS_USER.CLOSE) {
      return <span className="status status--close-CRM">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS_USER.QUIT) {
      return <span className="status status--quit">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS_USER.PROCESSING) {
      return (
        <span className="status status--processing-contract">{status}</span>
      );
    } else if (toLowerCase === REQUEST_STATUS_USER.CANCEL) {
      return <span className="status status--cancel-contract">{status}</span>;
    } else if (toLowerCase === REQUEST_STATUS_USER.CANCEL) {
      return <span className="status status--cancel-contract">{status}</span>;
    } else {
      return <span className="status status--none-data">{status}</span>;
    }
  }, [status, toLowerCase]);
  return <>{render()}</>;
};

export default Status;
