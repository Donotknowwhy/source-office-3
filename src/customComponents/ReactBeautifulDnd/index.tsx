import { Avatar, Badge, Col, Row } from 'antd';
import { useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cls from 'classnames';
import { TripleDotIcon } from '@assets/icons/TripleDotIcon';
import { PriorityIcon } from '@assets/icons/Priority';
import { getRandomColor } from '@constants/global.helper';
import ImgTest from '@assets/img/ImgTest.jpg';
import { columnsFromBackend } from './ReactBeautifulDnd.helper';

const ReactBeautifulDnd = ({ itemsFromBE, columnFromBE }: any) => {
  const [itemsFromBackend, setItemsFromBackend] = useState(itemsFromBE);

  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumnss) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];

      const destItems = [...destColumn.items];
      const removed = sourceItems.splice(source.index, 1);
      removed[0].status = columns[destination.droppableId].status;
      destItems.splice(destination.index, 0, removed[0]);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setItemsFromBackend({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const renderUI = useMemo(() => {
    return (
      <Row
        className="drop-context-wrapper gx-flex gx-align-items-start"
        gutter={[16, 0]}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <Col
              span={6}
              className="drop-context-wrapper__container gx-align-items-center gx-justify-content-between"
              key={columnId}
            >
              <div className="drop-context-wrapper__container--title gx-d-flex gx-justify-content-between">
                {column.name}
                <div>
                  <span className="gx-mr-2 gx-mb-0">
                    <Badge count={column.items.length} />
                  </span>
                  <span>
                    <TripleDotIcon />
                  </span>
                </div>
              </div>
            </Col>
          );
        })}
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, columns, setColumns);
          }}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <Col span={6} key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    className="drop-context-wrapper__container--droppable"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={cls('wrapper-dnd-drop-item', {
                              'is-dragging': snapshot.isDragging
                            })}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              borderLeftColor: `${getRandomColor()}`,
                              ...provided.draggableProps.style
                            }}
                          >
                            <div className="gx-d-flex gx-justify-content-between">
                              <div>
                                <p className="wrapper-dnd-drop-item__title">
                                  {item.id}
                                </p>
                                <p className="wrapper-dnd-drop-item__name-task">
                                  {item.content}
                                </p>
                              </div>
                              <div>
                                <Avatar src={ImgTest} />
                              </div>
                            </div>
                            <p className="wrapper-dnd-drop-item__status">
                              <PriorityIcon />
                            </p>

                            <div className="gx-d-flex gx-justify-content-between">
                              <p className="wrapper-dnd-drop-item__title">
                                {item.created_time}
                              </p>
                              <div className="wrapper-dnd-drop-item__status-task"></div>
                            </div>

                            <div className="gx-d-flex gx-justify-content-between">
                              <p className="wrapper-dnd-drop-item__title">
                                {item.cteated_date}
                              </p>
                              <div> day la role</div>
                            </div>
                            <div className="wrapper-dnd-drop-item__created_date"></div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </DragDropContext>
      </Row>
    );
  }, [columns]);

  return <div>{renderUI}</div>;
};
export default ReactBeautifulDnd;

// export default ReactBeautifulDnd;
