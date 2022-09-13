import { Avatar, Col, Input, Row } from 'antd';

const CommentProject = ({ data }) => {
  return (
    <Row>
      {data
        ? data.map((item) => (
            <div
              className="gx-d-flex gx-mb-2 wrapper-comment-project-todo"
              key={item.id}
            >
              <Col span={2}>
                <Avatar
                  className="item-container__comment--avatar gx-mr-2"
                  size={36}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </Col>

              <Col span={22}>
                <span className="item-container__comment--user-name gx-mr-2 gx-pb-1">
                  {item.user_name}
                </span>
                <span className="item-container__comment--date item-container__title">
                  {item.update_date}
                </span>
                <div className="item-container__comment--comment gx-add-new-comment gx-mb-2 gx-mt-">
                  {item.comment}
                </div>
              </Col>
            </div>
          ))
        : null}
      <Input className="gx-add-new-comment" placeholder="Thêm bình luận" />
    </Row>
  );
};

export default CommentProject;
