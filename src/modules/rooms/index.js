import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { getAllRoomsAsync } from './context';
import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { ROOM_IMAGES } from '../../constants/Api';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import AddNewRoom from './details/addRoom';
import BookRoom from './details/bookRoom';
import { pagePath } from '../../Routes/path';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar({ rooms, setCurrRooms }) {

    const [searchText, setSearchText] = useState('');

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = rooms.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setCurrRooms(filteredRows);
    };

    return (
        <div >
            <TextField
                variant="standard"
                value={searchText}
                onChange={(e) => requestSearch(e.target.value)}
                placeholder="Search…"
                InputProps={{
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: { searchText } ? 'visible' : 'hidden' }}
                            onClick={() => requestSearch('')}
                        >
                            <ClearIcon fontSize="medium" />

                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}


function RoomSingle({ item, handleOpenBook }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = item.files.length;

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
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.location}
                </Typography>
                <Typography variant="body1" >
                    {item.description}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Price: Rs. {item.price}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {item.room_count} Rooms
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Price Negotiable:  {item.is_negotiable ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Available :  {item.is_available ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Verified:  {item.is_verified ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Seller's phone:  {item.phone}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>handleOpenBook(item)}>Book Room</Button>
                <Button size="small" onClick={()=>window.location = pagePath.app.rooms+ `/${item.room_id}`}>Details</Button>
            </CardActions>
            <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {item.files.map((step, index) => (
                        <div key={step}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 300,
                                        display: 'block',
                                        maxWidth: 500,
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={ROOM_IMAGES + `/${item.room_id}/` + step}
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
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
        </Card>
    );
}

export default function Room() {

    const dispatch = useDispatch();

    const [list, setList] = useState([]);

    const rooms = useSelector((state) => state.room.rooms);

    useEffect(() => {
        dispatch(getAllRoomsAsync());
    }, [])

    useEffect(() => {
        setList(rooms);
    }, [rooms])

    const [openAdd, setOpenAdd] = useState(false);
    const [item, setItem] = useState({});
    const [openBook, setOpenBook] = useState(false);

    const handleOpenBook=(item)=>{
        setItem(item);
        setOpenBook(!openBook);
    }

    const handleOpenAdd = () => {
        setOpenAdd(!openAdd);
    }


    return (
        <div >
            <Grid container >
                <Grid item >
                    <Typography variant="h2">
                        Rooms
                    </Typography>
                </Grid>
                <Grid item className="col-lg-3">
                    <QuickSearchToolbar setCurrRooms={setList} rooms={rooms} />
                </Grid>
            </Grid>
            <Grid item >
                <Button variant="contained" onClick={handleOpenAdd}>
                    <Typography variant="body1">
                        Post room
                    </Typography>
                </Button>
            </Grid>
            <br />
            <Grid container justifyContent="center" columns={16}>
                {list.map(element => (
                    <Grid key={element.room_id} item xs={8}>
                        <RoomSingle handleOpenBook={handleOpenBook} key={element.id} item={element} />
                    </Grid>
                ))}
            </Grid>
            <AddNewRoom open={openAdd} handleOpen={handleOpenAdd} />
            <BookRoom open={openBook} item={item} handleOpen={handleOpenBook}/>
        </div>
    )
}