import { Col, Row, Card, Button, Stack } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DroppableProvided, ResponderProvided } from 'react-beautiful-dnd';
import { Person } from '../interfaces';

interface IDndProps {
  persons: Person[],
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void,
  handleShowEditModal: (person: Person) => void,
  deletePerson: (personId: number) => void
}

const Dnd = ({persons, onDragEnd, handleShowEditModal, deletePerson } :IDndProps): JSX.Element => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {persons.map((person, index) => (
              <Draggable key={person.id} draggableId={person.id.toString()} index={index}>
                {(provided: DraggableProvided) => (
                  <Row
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={person.id}>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col xs={1}>{index + 1}</Col>
                            <Col>{person.name}</Col>
                            <Col xs={2} spacing>
                              <Stack direction='horizontal' gap={3}>
                                <Button variant='outline-dark' size='sm' onClick={() => handleShowEditModal(person)}>
                                  Edit
                                </Button>
                                <Button variant='outline-danger' size='sm' onClick={() => deletePerson(person.id)}>X</Button>
                              </Stack>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Dnd;
