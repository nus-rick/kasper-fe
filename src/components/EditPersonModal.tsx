import { Button, Form, InputGroup, FormControl, Modal } from 'react-bootstrap';

interface IEditPersonModal {
  showEditModal: boolean
  handleCloseEditModal: () => void;
  editPerson: (event: { preventDefault: () => void; }) => Promise<void>;
  editingPersonName: string;
  onChangeEditPersonName: (event: { target: { value: string; }; }) => void;
}

const EditPersonModal = ({ showEditModal, handleCloseEditModal, editPerson, editingPersonName, onChangeEditPersonName }: IEditPersonModal): JSX.Element => {
  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={editPerson}>
          <Form.Group className="mb-3" controlId={`formEditPerson`}>
            <InputGroup>
              <FormControl
                placeholder="Edit person name"
                aria-label="Edit person name"
                type="text"
                value={editingPersonName}
                onChange={onChangeEditPersonName}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEditModal}>
          Close
        </Button>
        <Button variant="primary" onClick={editPerson}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPersonModal;
