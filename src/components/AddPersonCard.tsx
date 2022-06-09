import { Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FormEvent } from 'react';

interface IAddPersonCard {
  addNewPerson: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  newPersonName: string;
  onChangeNewPersonName: (event: { target: { value: string;}; }) => void;
}

const AddPersonCard = ({ addNewPerson, newPersonName, onChangeNewPersonName }: IAddPersonCard): JSX.Element => {
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={addNewPerson}>
          <Form.Group className="mb-3" controlId="formAddNewPerson">
            <InputGroup>
              <FormControl
                placeholder="New person name"
                aria-label="New person name"
                type="text"
                value={newPersonName}
                onChange={onChangeNewPersonName}
              />
              <Button type="submit" variant="outline-secondary">Add</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddPersonCard;
