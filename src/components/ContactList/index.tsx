import { useEffect, useState } from 'react';
import { Contacts } from '../../models/types';
import { ContactService } from '../../services/contact.service';
import {
  Paper,
  TableContainer,
  Container,
  TableHead,
  Table,
  TableRow,
  TableBody,
  Button,
  styled
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '@mui/material';
import AddContact from '../AddContact';
import SearchInput from '../SearchComponent';
import { BodyDelete } from './styled';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(59, 59, 59)',
    color: theme.palette.common.white,
    fontWeight: '600'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const ContactList = () => {
  const [contacts, setContacts] = useState<Contacts>({
    id: undefined,
    name: '',
    email: '',
    phone: ''
  });

  const [contactList, setContactList] = useState<Contacts[]>([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);
  //validation
  const [errorValidation, setErrorValidation] = useState(false);
  const [subtitle, setSubtitle] = useState('');

  const [inputSearch, setInputSearch] = useState('');

  const addNewContact = () => {
    setContacts({
      id: undefined,
      name: '',
      email: '',
      phone: ''
    });
    toggleModal();
  };

  const handleContactsChange = () => {
    toggleModal();
    getAllContacts();
  };

  const toggleModal = () => {
    setModalAdd(!modalAdd);
  };

  const handleEdit = (contact: any) => {
    updateContact();
    toggleModal();
  };

  const openModalDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const bodyDelete = (
    <BodyDelete>
      <p>
        Certeza que deseja excluir este item ?{' '}
      </p>
      <div>
        <Button className="buttonBodyDelete" color="secondary" onClick={() => deleteContact()}>
          Sim
        </Button>
        <Button className="buttonBodyDelete" onClick={() => openModalDelete()}>
          Não
        </Button>
      </div>
    </BodyDelete>
  );

  const handleDelete = () => {
    openModalDelete();
  };

  const getAllContacts = async () => {
    setLoading(true);
    return await ContactService.getData().then((response) => {
      console.log(response.data);
      setContactList(response.data);
      setLoading(false);
    });
  };

  const getContactById = async () => {
    setLoading(true);
    return await ContactService.getDataId(contacts).then((response) => {});
  };

  const updateContact = async () => {
    setLoading(true);
    return await ContactService.updateData(contacts)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // delete
  const deleteContact = () => {
    return ContactService.deleteData(contacts).then(() => {
      setContactList(contactList.filter((contato) => contato.id !== contacts.id));
      openModalDelete();
    });
  };

  // filtro
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputSearch(e.target.value);
    if (inputSearch === '') {
      setContactList(contactList)
      // console.log(contactList.filteringData((contato) => contato.name.toLowerCase().includes(inputSearch.toLowerCase())))
    } else {
      setContactList(
        contactList.filter((contato) =>
          // contato.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
          contato.name.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1
          
        )
      );
      
    }
  }

  function handleClickClearInput() {
    setInputSearch('');
    setContactList(contactList)
  }

  const filteringData = () => {
    return ContactService.getFilterData(contacts);
    // .then(() => {
    //   setContactList(contactList.filter((contato) => contato.name !== contacts.name))
    // })
  };

  useEffect(() => {
    getAllContacts();
    // filteringData()
  }, []);

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center'
        }}
      >
        <h2 style={{ margin: '25px', fontFamily: 'Roboto', color: 'rgb(59, 59, 59)' }}>
          Lista de Contatos
        </h2>

        <Button
          style={{ height: 40, marginTop: '20px' }}
          variant="contained"
          onClick={addNewContact}
        >
          Adicionar
        </Button>
      </div>

      <div>
        <SearchInput
          onClick={handleClickClearInput}
          onChange={(e) => handleSearchChange(e)}
          value={inputSearch}
        />
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Telefone</StyledTableCell>
                <StyledTableCell align="center">Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactList.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">{item.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    <ModeEditOutlineIcon
                      onClick={handleEdit}
                      style={{ cursor: 'pointer', marginRight: '5px' }}
                    />
                    <DeleteIcon onClick={handleDelete} style={{ cursor: 'pointer' }} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.205)' }}
        className="ModalAddContact"
        open={modalAdd}
        onClose={toggleModal}
      >
        <>
          <AddContact onClose={toggleModal} onChange={handleContactsChange} value={contacts} />
        </>
      </Modal>

      <Modal className="ModalGeneralRules" open={deleteModal} onClose={openModalDelete}>
        {bodyDelete}
      </Modal>
    </Container>
  );
};
export default ContactList;
