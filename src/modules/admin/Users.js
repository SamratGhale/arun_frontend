import * as React from 'react';
import { useSnackbar } from 'notistack';
import { pagePath } from '../../Routes/path';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { archiveRoomAsync, availableRoomAsync } from '../rooms/context';
import {  archiveUserAsync, getALlusersAsync, registerUserAsync } from '../users/context';

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto',
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                        mr: 0.5,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottom: 1,
                        borderColor: 'divider',
                    },
                }}
            />
        </Box>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};


export default function Users() {


    const [list, setList] = useState([])
    const users = useSelector((state) => state.user.list)

    React.useEffect(() => {
        dispatch(getALlusersAsync());
    }, [])

    useEffect(() => {
        setList(users);
    }, [users])

    const [searchText, setSearchText] = React.useState('');
    const dispatch = useDispatch();
    const {enqueueSnackbar} =  useSnackbar();

    const columns = [
        {
            field: 'user_id',
            headerName: "User Id"
        },
        {
            field: 'email',
            headerName: "Email",
            width: 200,
        },
        {
            field: 'username',
            headerName: "User Name",
            width: 150,
        },
        {
            field: 'is_registered',
            headerName: "Registered? ",
            width: 150,
            renderCell: (cell) => {
                return (
                        <Button
                        onClick={async()=>{
                            try{
                            await dispatch(await registerUserAsync(cell.id));
                                enqueueSnackbar(`User id ${cell.id} ${cell.value==0 ? '':'un'}archived`, {variant: 'success'});
                            }catch(err){
                                enqueueSnackbar(`failed to ${cell.value==0 ? '':'un'}archived user id ${cell.value}`, {variant: 'error'});
                            }
                        }}
                        >
                            {cell.value === 0 ? "No" : "Yes"}
                        </Button>
                )

            }
        },
        {
            field: 'is_archived',
            headerName: "Archived? ",
            width: 150,
            renderCell: (cell) => {
                return (
                        <Button 
                        onClick={async()=>{
                            try{
                            await dispatch(await archiveUserAsync(cell.id));
                                enqueueSnackbar(`User id ${cell.id} ${cell.value==0 ? '':'un'}archived`, {variant: 'success'});
                            }catch(err){
                                enqueueSnackbar(`failed to ${cell.value==0 ? '':'un'}archived room id ${cell.value}`, {variant: 'error'});
                            }
                        }}>
                            {cell.value === 0 ? "No" : "Yes"}
                        </Button>
                )

            }
        },
        {
            field: 'app_count',
            headerName: "No. Applications",
            width: 150,
            type: 'number',
        },
        {
            field: 'room_count',
            headerName: "No. Room",
            width: 150,
            type: 'number',
        },
        {
            field: 'apple',
            headerName: "Details",
            disableClickEventBubbling: true,
            enableColumnResizing: true,
            sortable: false,
            width: 150,
            renderCell: (params) => {
                return (
                    <Button key={params.row} onClick={() => {
                        window.location = pagePath.app.rooms + `/${params.id}`
                    }}>
                        View details
                    </Button>
                )

            }
        },
    ]


    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = users.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setList(filteredRows);
    };


    return (
        <div>
            <Typography variant='h2'>
                Rooms
            </Typography>
            <Box sx={{ height: 400, width: 1 }}>
                <DataGrid
                    components={{ Toolbar: QuickSearchToolbar }}
                    rows={list}
                    columns={columns}
                    getRowId={(r) => {
                        return r.user_id;
                    }}
                    componentsProps={{
                        toolbar: {
                            value: searchText,
                            onChange: (event) => requestSearch(event.target.value),
                            clearSearch: () => requestSearch(''),
                        },
                    }}
                />
            </Box>
        </div>
    );
}