import { useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Badge } from '@mui/material';
import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { getUser } from '../misc/sessionManager';
import { Typography } from "@mui/material";
import { Grid } from '@mui/material';
import { TextField } from "@mui/material";
import { useSelector } from 'react-redux';
import { refreshUserAsync, updateUserAsync, changeProfileAsync } from '../modules/users/context';
import { PROFILE_PIC } from '../constants/Api';

const Profile = () => {
  const fileInput = useRef();
  const selectFile = () => {
    fileInput.current.click();
  }

  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone , setPhone] = useState('');

  const [disabled, setDisabled] = useState(true);

  const user_info = useSelector((state)=>state.user.user_info);

  useEffect(()=>{
    dispatch(refreshUserAsync());
  },[])

  useEffect(()=>{
    setName(user_info.username)
    setEmail(user_info.email)
    setPhone(user_info.phone)
    setProfilePic(PROFILE_PIC + `${user_info.user_id}/${user_info.profile_pic}` )
  },[user_info])

  const handleEdit = async () => {
    try {
      var f = new FormData();
      f.append('username', name)
      f.append('email', email)
      f.append('phone', phone)
      if(profilePicFile){
        var fprofile = new FormData();
        fprofile.append('image', profilePicFile);
        await dispatch(await changeProfileAsync(fprofile));
      }
      await dispatch(await updateUserAsync(user_info.user_id, f));
      enqueueSnackbar('Your profile was updated successfully ', { variant: 'success' })
      setDisabled(true)
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    }
  }

  const { enqueueSnackbar } = useSnackbar();
  return (
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Typography variant="h2">
              Profile
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={<AddAPhotoIcon />}
            >
              <Avatar onClick={selectFile} style={{ height: 200, width: 200 }} alt="Travis Howard" src={profilePic} />
              <input onChange={(e) => {
                console.log(e.target.files)
                setProfilePic(URL.createObjectURL(e.target.files[0]))
                setProfilePicFile(e.target.files[0]);
              }} disabled={disabled} type="file" style={{ "display": "none" }} ref={fileInput} />
            </Badge>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h5">Name</Typography>
            <TextField
              InputProps={{
                readOnly: disabled,
              }}
              hiddenLabel
              variant="filled"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Email</Typography>
            <TextField
              InputProps={{
                readOnly: disabled,
              }}
              hiddenLabel
              variant="filled"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Phone</Typography>
            <TextField
              InputProps={{
                readOnly: disabled,
              }}
              hiddenLabel
              variant="filled"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {disabled ? (
              <Button variant='contained' onClick={() => setDisabled(false)}>Edit</Button>
            ) : (
              <div>
                <Button variant='contained' color='secondary' onClick={() => setDisabled(true)}>Cancel</Button>
                {'  '}
                <Button variant='contained' color='secondary'
                  onClick={() => {
                    handleEdit().then(
                    );
                  }}>Save</Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
  )
}
export default Profile;