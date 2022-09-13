import { Avatar, Col, Row } from 'antd';
import parse from 'html-react-parser';

const ActivityProject = ({ data }) => {
  return (
    <Row>
      {data
        ? data.map((item) => (
            <div className="gx-d-flex gx-mb-2" key={item.id}>
              <Col span={2}>
                <Avatar
                  className="item-container__comment--avatar"
                  size={36}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </Col>

              <Col span={22}>
                <div className="gx-add-new-comment">{parse(item.change)}</div>
                <span className="item-container__title">
                  {item.date_update}
                </span>
              </Col>
            </div>
          ))
        : null}
    </Row>
  );
};

export default ActivityProject;
