import { Col, Row } from 'antd';
import { useState } from 'react';
import HeaderLayout from 'customComponents/HeaderLayout';
import ListProject from 'customComponents/ListProject';
import ProjectDetail from 'customComponents/ProjectDetail';
import { projectDataTest } from './Project.helper';

const ItemProject = () => {
  const [dataRender, setDataRender] = useState(projectDataTest.project.data[0]);

  const handleGetList = (event, listSelected) => {
    setDataRender(listSelected);
  };
  return (
    <HeaderLayout title="Dự án">
      <Row gutter={[16, 0]} className="header-layout-blue__body--wrapper">
        <Col span={13} className="header-layout-blue__body--wrapper">
          <ListProject
            data={projectDataTest.project.data}
            getList={handleGetList}
          />
        </Col>
        <Col
          span={11}
          className="header-layout-blue__body--wrapper wrapper__item--detail"
        >
          <ProjectDetail data={dataRender} />
        </Col>
      </Row>
    </HeaderLayout>
  );
};

export default ItemProject;
