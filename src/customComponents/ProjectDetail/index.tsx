import { Avatar, Collapse, Progress } from 'antd';
import ActivityProject from 'customComponents/ActivityProject';
import CommentProject from 'customComponents/CommentProject';

const { Panel } = Collapse;

export interface IListProject {}

const ProjectDetail = ({ data }) => {
  return (
    <>
      {data ? (
        data.detail.map((item, index) => {
          const sliceElement = item.member.slice(0, 2);
          return (
            <div className="item-container" key={index}>
              <div className="name-project gx-pt-1 gx-mb-4">G office</div>
              <Collapse defaultActiveKey={['1', '2', '3']}>
                <Panel header="Chi tiết" key="1" className="gx-mb-3">
                  <div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Mô tả: </div>
                      <div className="item-container__content">
                        {data.description}
                      </div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">
                        Quản lí dự án:
                      </div>
                      <div>{item.project_manager}</div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Thành viên:</div>
                      <div>
                        {sliceElement.map((userSlice, index) => (
                          <div
                            className="gx-d-flex gx-align-items-center "
                            key={index}
                          >
                            <Avatar
                              className="gx-mr-1"
                              size={36}
                              src="https://joeschmoe.io/api/v1/random"
                            />
                            <div className="item-container__content">
                              {userSlice.user_name}
                            </div>
                          </div>
                        ))}
                        <div className="gx-d-flex gx-align-items-center gx-pl-2">
                          <Avatar.Group maxCount={5} size={36}>
                            {item.member.map((user, index) => {
                              if (index >= sliceElement.length) {
                                return (
                                  <Avatar
                                    key={index}
                                    size={36}
                                    src="https://joeschmoe.io/api/v1/random"
                                  />
                                );
                              }
                              return <div key={index}></div>;
                            })}
                          </Avatar.Group>
                        </div>
                      </div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Trạng thái:</div>
                      <div className="item-container__content">
                        {data.status}
                      </div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Ưu tiên:</div>
                      <div className="item-container__content">
                        {data.priority}
                      </div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Tiến độ:</div>
                      <Progress
                        percent={data.progress}
                        size="small"
                        strokeWidth={18}
                        strokeColor={
                          data.progress <= 50
                            ? '#FF9F0A'
                            : data.progress <= 60
                            ? '#007AFF'
                            : '#34C759'
                        }
                      />
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Ngày tạo:</div>
                      <div className="item-container__content">
                        {data.date_create}
                      </div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Deadline:</div>
                      <div className="item-container__content">
                        {data.deadline}
                      </div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">Ngày bắt đầu:</div>
                      <div className="item-container__content">
                        {data.date_start}
                      </div>
                    </div>
                    <div className="gx-d-flex gx-pb-2">
                      <div className="item-container__title">
                        Ngày kết thúc:
                      </div>
                      <div className="item-container__content">
                        {data.date_end}
                      </div>
                    </div>
                  </div>
                </Panel>
                <Panel
                  header="Bình luận"
                  key="2"
                  className="item-container__comment gx-mb-3"
                >
                  <CommentProject data={data.detail[0].comments} />
                </Panel>
                <Panel
                  header="Hoạt động"
                  key="3"
                  className="item-container__working"
                >
                  <ActivityProject data={data.detail[0].activity} />
                </Panel>
              </Collapse>
            </div>
          );
        })
      ) : (
        <div>hien tai chua co data nao</div>
      )}
    </>
  );
};

export default ProjectDetail;
