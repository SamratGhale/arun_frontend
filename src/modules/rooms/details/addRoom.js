import * as React from 'react';

import { TextField } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { OutlinedInput } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addRoomAsync } from '../context';

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

export default function AddNewRoom({ open, handleOpen }) {

  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [room_count, setRoomCount] = React.useState(0);
  const [price_negotiable, setPriceNegotiable] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [files, setFiles] = React.useState([]);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if(files.length <2){
      enqueueSnackbar("please upload atleast two images!", { variant: "error" })
      return;
    }
    const form = new FormData();
    form.append('description', description);
    form.append('price', price);
    form.append('room_count', room_count);
    form.append('price_negotiable', price_negotiable);
    form.append('location', location);
    console.log(files)
    files.forEach(f=>{
      form.append('room_images', f);
    })

    try {
      await dispatch(addRoomAsync(form));
      enqueueSnackbar('Added question successfully', { variant: "success" })
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
            Add new room for rent
          </Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="description">Describe your room</InputLabel>
            <OutlinedInput
              multiline
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={4}
              label="Describe your room"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput
              type='number'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              label="price"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="room_count">Room Count</InputLabel>
            <OutlinedInput
              onChange={(e) => setRoomCount(e.target.value)}
              value={room_count}
              label="Room Count"
              type='number'
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="location">Location</InputLabel>
            <OutlinedInput
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              label="Location"
              type='text'
            />
          </FormControl>

          <label htmlFor="files">
            Pictures
          </label>
          <FormControl fullWidth sx={{ m: 1 }}>
            <OutlinedInput
              onChange={(e) => {
                setFiles([...e.target.files])
              }}
              inputProps={{ multiple: true }}
              type='file'
            />
          </FormControl>


          <FormControl fullWidth sx={{ m: 1 }}>
            <FormControlLabel
              control={<Checkbox value={price_negotiable} onChange={() => setPriceNegotiable(!price_negotiable)} />}
              label="price negotiable"
              labelPlacement="end"
            />
          </FormControl>
          <Button onClick={handleSubmit} variant='contained' color='secondary'>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}