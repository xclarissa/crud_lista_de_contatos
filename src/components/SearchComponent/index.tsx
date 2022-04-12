import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { ContactService } from '../../services/contact.service';
import {Contacts} from '../../models/types'
 

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onClick: () => void;
}

const SearchInput = ({ onChange, onClick, value }: Props) => {
  // const [inputSearch, setInputSearch] = useState('')
  // const [contactList, setContactList] = useState<Contacts[]>([]);
  
  
  return (
    <>
      <Box
        sx={{
          p: 0.5,
          pb: 0
        }}
      >
        <TextField
          variant="standard"
          value={value}
          onChange={onChange}
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                className='iconButton'
                title="Clear"
                aria-label="Clear"
                size="small"
                onClick={onClick}
              >
                 
              <ClearIcon fontSize="small" />
              </IconButton>
            )
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto'
            },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
              mr: 0.5
            },
            '& .MuiInput-underline:before': {
              borderBottom: 1,
              borderColor: 'divider'
            }
          }}
        />
      </Box>
    </>
  );
};

export default SearchInput;
