import { useState } from 'react';
import { IParseJSON } from './DetailEmployee.type';
const BASE_URL_IMG = process.env.REACT_APP_BASE_URL_IMG;

const ParseJSON = ({ data }: IParseJSON) => {
  console.log('day la data', data);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p
        className="detail-employee-working-history__attached-files"
        onClick={() => setOpen(!open)}
      >
        xem tệp đính kèm
      </p>
      {data &&
        open &&
        data.map((item) => {
          return (
            <p>
              <a
                key={item.uid}
                href={`${BASE_URL_IMG}` + item.url}
                target={'_blank'}
                rel="noreferrer"
              >
                {item.name}
              </a>
            </p>
          );
        })}
    </div>
  );
};

export default ParseJSON;
