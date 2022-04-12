import { Container, TextField, Button } from '@mui/material';
import { ChangeEvent, useState, useEffect } from 'react';
import { Contacts } from '../../models/types';
import { ContactService } from '../../services/contact.service';
import './styled.css';

export interface Props {
  onClose?: () => void;
  onChange?: () => void;
  value?: Contacts;
}

const AddContact = ({ onClose, onChange, value }: Props) => {
  const [contacts, setContacts] = useState<Contacts>({
    id: undefined,
    name: '',
    email: '',
    phone: ''
  });
  const [contactList, setContactList] = useState<Contacts[]>([]);

  const [loading, setLoading] = useState(false);

  const [modalAdd, setModalAdd] = useState(false);

  async function handleChangeContact(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setContacts({
      ...contacts,
      [e.target.name]: e.target.value
    });
  }

  const handleClick = () => {
    setLoading(true);
    if(contacts.name !== '' && contacts.email !== '' && contacts.phone !== '') {
      createContact();
    }
    setModalAdd(!modalAdd)
  };

  const toggleModalInsert = () => {
    setContacts({
      id: undefined,
      name: '',
      email: '',
      phone: ''
    });
    setModalAdd(!modalAdd);
  };

  const getAllContacts = async () => {
    return await ContactService.getData().then((response) => {
      console.log(response.data);
      setContactList(response.data);
    });
  };

  const createContact = async () => {
    setLoading(true);
    return await ContactService.createData(contacts)
      .then(() => {
        toggleModalInsert();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  
  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <form>
        <div className='inputs'>
          <h2>Cadastrar Novo Contato</h2>
          <TextField
          style={{marginBottom: '10px'}}
            className="textField"
            name="name"
            label="Name"
            onChange={handleChangeContact}
            value={contacts.name}
          />
          <TextField
          style={{marginBottom: '10px'}}
            className="textField"
            name="email"
            label="Email"
            onChange={handleChangeContact}
            value={contacts.email}
          />
          <TextField
          style={{marginBottom: '10px'}}
            className="textField"
            name="phone"
            label="Telefone"
            onChange={handleChangeContact}
            value={contacts.phone}
          />
        </div>

        <div className='buttons'>
          <Button style={{marginRight: '10px'}} variant="contained" color="primary" onClick={handleClick}>
            {' '} Salvar {' '}
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            {' '} Cancelar {' '}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddContact;
