import React, { useEffect, useState } from 'react'
import BookRoom from './bookRoom';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { List } from '@mui/material';
import { Link } from '@mui/material';
import { pagePath } from '../../../Routes/path';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { ROOM_IMAGES } from '../../../constants/Api'

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { autoPlay } from 'react-swipeable-views-utils';

import SwipeableViews from 'react-swipeable-views';
import { getById } from '../services';
import { approveApplicationAsync } from '../context';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
root: {
  flexGrow: 1,
},
}));


function Applies({ applies, setRefresh }) {

const classes = useStyles();
const [openAdd, setOpenAdd] = React.useState(false);
  const dispatch = useDispatch();

  const handleApprove = async(item) => {
    try{
      console.log(item);
      const res = await dispatch(approveApplicationAsync(item.id));
      console.log(res)
      setRefresh(true);
    }catch(err){
      console.log(err);
    }
  }



const handleOpenAdd = () => {
  setOpenAdd(!openAdd);
}
return (
  <div className={classes.root}  >
    <Grid container className="col-lg-8">
      <Grid item className="col-lg-5">
        <Typography variant="h4">
          Applications for the room
        </Typography>
      </Grid>
    </Grid>
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {applies.map(q => {
        return (
          <div key={q.id}>
            <ListItem alignItems="flex-start">

              <ListItemText
                primary={q.query}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {q.username}
                    </Typography>
                    {` — ${q.phone}`}
                    {` — ${q.ts}`}
                  </>
                }
              />
                      Status : {q.sold==1 ?"Approved":"Not approved"}

            </ListItem>
            <ListItem>
              <ListItemText>
                <Button color='secondary' onClick={()=>{
                  handleApprove(q);
                }}>
                  Change Status
                </Button>
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      })}
    </List>
  </div>
);
}

export default function RoomDetails(props) {
const room_id = props.match.params.id;

const [item, setItem] = useState({});

const [refresh, setRefresh] = useState(false);

useEffect(() => {
  getById(room_id).then((res) => {
    console.log(res.data);
    setItem(res.data)
  });
}, [])

useEffect(()=>{
  if (refresh=== true) {
    getById(room_id).then((res) => {
      console.log(res.data);
      setItem(res.data)
    });
    setRefresh(false);
  }
}, [refresh])

const [details, setDetails] = useState({})
const [openBook, setOpenBook] = useState(false)

const handleOpenBook = () => {
  setOpenBook(!openBook)
}

const theme = useTheme();
const [activeStep, setActiveStep] = React.useState(0);

var maxSteps = 0;

const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleStepChange = (step) => {
  setActiveStep(step);
};
return (
  <div>
    {
      item.room ? (
        <Grid container sx={{flexGrow: 1, gap:6}} spacing={1} >
          <Card xs={4}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.room.location}
              </Typography>
              <Typography variant="body1" >
                {item.room.description}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Price: Rs. {item.room.price}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {item.room.room_count} Rooms
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Price Negotiable:  {item.room.is_negotiable ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Available :  {item.room.is_available ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Verified:  {item.room.is_verified ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Seller's phone:  {item.room.phone}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Seller's name :  {item.room.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Seller's email:  {item.room.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleOpenBook(item.room)}>Book Room</Button>
            </CardActions>
            </Card>

          <Box item xs={4} 
            sx={{
              height: 400,
              width: 700,
            }}
          >
              <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {item.room.files.map((step, index) => (
                  <div key={step}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          display: 'block',
                          overflow: 'hidden',
                          width: '100%',
                        }}
                        src={ROOM_IMAGES + `/${item.room.room_id}/` + step}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                steps={item.room.files.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === item.room.files.length- 1}
                  >
                    Next
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
            </Box>
    {
      item.applies != undefined ? (
          <Grid item xs={8} sx={{marginTop:8}}>
            <Applies applies={item.applies} setRefresh={setRefresh} />
          </Grid>
      ) : ""
    }

        </Grid>
      ) : ""

    }
    <BookRoom open={openBook} item={item} handleOpen={handleOpenBook}/>
    </div>
  )
}