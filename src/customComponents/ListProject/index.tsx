import { Avatar, Col, Row } from 'antd';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import Status from 'customComponents/Status';

export interface IListProject {}

const ListProject = ({ data, getList }) => {
  const history = useHistory();
  return (
    <>
      {data
        ? data.map((item) => (
            <Row
              className={classNames('wrapper__item', {
                [item.priority]: item.priority
              })}
              onClick={(e) => getList(e, item)}
              onDoubleClick={() => history.push(`/todo/project/${item.id}`)}
              key={item.id}
            >
              <Col span={24} className="item-container">
                <div className="gx-d-flex gx-justify-content-between">
                  <div className="item__left-project-working">
                    <div className="item__left-project-working__name-project">
                      {item.name_project}
                    </div>
                    <div className="item__left-project-working__description ">
                      {item.description}
                    </div>
                    <div className="item__left-project-working__date-start ">
                      {item.date_start}
                    </div>
                  </div>
                  <div className="item__right-project-working">
                    <div className="gx-d-flex">
                      <div className="item__right-project-working--project-manager gx-mr-0-75">
                        {item.project_manager}
                      </div>
                      <div className="item__right--circle-avatar">
                        <Avatar
                          size={36}
                          src="https://joeschmoe.io/api/v1/random"
                        />
                      </div>
                    </div>
                    <div className="gx-d-flex gx-justify-content-end">
                      <Status status={item.status} />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          ))
        : null}
    </>
  );
};

export default ListProject;
