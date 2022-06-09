import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import PersonAPI from './api/persons';
import { Container, Col, Row } from "react-bootstrap";
import { sortBy } from 'lodash';
import { DropResult } from "react-beautiful-dnd";
import { reorder, calculatePosition, calculateNewLastPosition } from './helper/calculator';
import { Person } from './interfaces';
import Dnd from './components/Dnd';
import AddPersonCard from './components/AddPersonCard';
import EditPersonModal from './components/EditPersonModal';

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newPersonName, setNewPersonName] = useState<string>('');
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [editingPersonName, setEditingPersonName] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleCloseEditModal = (): void => setShowEditModal(false);
  const handleShowEditModal = (person: Person): void => {
    setEditingPerson(person);
    setEditingPersonName(person.name);
    setShowEditModal(true);
  };

  useEffect((): void => {
    PersonAPI.getAll().then((persons: Person[]) => {
      const sorted: Person[] = sortBy(persons, 'position');
      setPersons(sorted);
    });
  }, []);

  const editPerson = async (event: { preventDefault: () => void; }): Promise<void>  => {
    event.preventDefault();

    if (editingPerson) {
      const editedPerson = await PersonAPI.update(editingPerson.id, { name: editingPersonName });
      const updatePersons = persons.map((person: Person) => {
        return person.id === editedPerson.id ? editedPerson : person;
      });

      setPersons(updatePersons);
      setShowEditModal(false);
    }
  }

  const deletePerson = async (personId: number): Promise<void> => {
    const isDeleted = await PersonAPI.delete(personId);

    if (isDeleted) {
      const updatePersons = persons.filter((person: Person): boolean => {
        return person.id !== personId;
      });
      setPersons(updatePersons);
    }
  }

  const onChangeEditPersonName = (event: { target: { value: string; }; }): void => {
    setEditingPersonName(event.target.value);
  }

  const calculateNewPosition = (result: DropResult, orderedPersons: Person[]): number => {
    const destinationIndex = result.destination!.index;
    const prePerson = orderedPersons[destinationIndex - 1];
    const nextPerson = orderedPersons[destinationIndex + 1];

    return calculatePosition(prePerson?.position, nextPerson?.position);
  }

  const addNewPerson = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!persons.length) {
      const newPerson = await PersonAPI.add({ name: newPersonName, position: 0 });
      setPersons([newPerson]);

      return;
    }

    const lastPosition = persons[persons.length - 1].position;
    const newPosition = calculateNewLastPosition(lastPosition);
    const newPerson = await PersonAPI.add({ name: newPersonName, position: newPosition });

    setNewPersonName('');
    setPersons([...persons, newPerson]);
  }

  const onChangeNewPersonName = (event: { target: { value: string } }): void => {
    setNewPersonName(event.target.value);
  }

  const onDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) {
      return;
    }

    const destinationIndex = result.destination.index;
    const orderedPersons = reorder(
      persons,
      result.source.index,
      destinationIndex
    );

    const newPosition = calculateNewPosition(result, orderedPersons);
    const changedPerson = orderedPersons[destinationIndex];
    changedPerson.position = newPosition;

    orderedPersons.splice(destinationIndex, 1, { ...changedPerson });
    await PersonAPI.update(changedPerson.id, { position: newPosition });

    setPersons(orderedPersons);
  }

  return (
    <div className="App">
      <Container className="pt-5">
        <Row>
          <Col>
            <Dnd
              persons={persons}
              onDragEnd={onDragEnd}
              handleShowEditModal={handleShowEditModal}
              deletePerson={deletePerson}
            />
            <Row className="pt-3">
              <Col>
                <AddPersonCard
                  addNewPerson={addNewPerson}
                  newPersonName={newPersonName}
                  onChangeNewPersonName={onChangeNewPersonName}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <EditPersonModal
          showEditModal={showEditModal}
          handleCloseEditModal={handleCloseEditModal}
          editPerson={editPerson}
          editingPersonName={editingPersonName}
          onChangeEditPersonName={onChangeEditPersonName}
        />
      </Container>
    </div>
  );
}

export default App;
