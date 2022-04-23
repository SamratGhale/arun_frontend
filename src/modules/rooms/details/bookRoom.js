import * as React from 'react';

import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { OutlinedInput } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addApplicationAsync} from '../context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BookRoom({ open, handleOpen, item }) {

  const [query, setQuery] = React.useState('');
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    const form = new FormData();
    form.append('query', query);
    form.append('room', item.room_id);
    try {
      await dispatch(addApplicationAsync(form));
      enqueueSnackbar('Room booked successfully please stay updated', { variant: "success" })
      handleOpen();
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" })
    }

  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant='h4'>
            Book room
          </Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="query">Do you have queries about the room?</InputLabel>
            <OutlinedInput
              multiline
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              rows={4}
              label="Do you have queries about the room?"
            />
          </FormControl>
          <Button onClick={handleSubmit} variant='contained' color='secondary'>Book</Button>
        </Box>
      </Modal>
    </div>
  );
}