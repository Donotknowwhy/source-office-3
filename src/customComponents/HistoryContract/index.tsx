import { useAppSelector } from '@appRedux/hooks';
import { Card } from '@components/uielements';
import { DATE_FORMAT } from '@constants/commons';
import { formatCurrencyVND } from '@util/utils';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getContractHistory,
  selectCrmState
} from './../../customApp/Crm/slice';

const HistoryContract = ({ data }) => {
  const { contractHistory, dataCustomerById } = useAppSelector(selectCrmState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getContractHistory({
        data_management_id: dataCustomerById[0]?.id
      })
    );
  }, [dispatch, dataCustomerById]);

  return (
    <div className="history-contract">
      {contractHistory &&
        contractHistory?.map((item, index) => {
          return (
            <Card key={index} style={{ backgroundColor: '#E8E8E8' }}>
              <p className="history-contract-id">{item?.contract_code}</p>
              <p>{item?.contract_name}</p>
              <div className="gx-d-flex gx-justify-content-between">
                <p>{formatCurrencyVND(item?.money_total)}</p>
                <p>{moment(item?.sign_day).format(DATE_FORMAT)}</p>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default HistoryContract;
