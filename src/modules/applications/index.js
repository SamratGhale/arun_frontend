import * as React from 'react';
import Table from '@mui/material/Table';
import { useSnackbar } from 'notistack';
import { pagePath } from '../../Routes/path';
import { useDispatch, useSelector } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { getMyApplicationsAsync, archiveApplicationAsync } from '../rooms/context';


export default function Applications() {
    const dispatch = useDispatch();

    const {enqueueSnackbar} =  useSnackbar();

    const applies = useSelector(state=>state.room.applications)

    const [list, setList] = React.useState([]);
    React.useEffect(()=>{
        dispatch(getMyApplicationsAsync());
    },[])

    React.useEffect(()=>{
        setList(applies)
    },[applies])
    return (
        <div>
            <Typography variant='h2'>
                Applications
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Room Id</TableCell>
                            <TableCell align="right">Query</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Is Archived</TableCell>
                            <TableCell align="right">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.room}
                                </TableCell>
                                <TableCell align="right">{row.query}</TableCell>
                                <TableCell align="right">{row.ts}</TableCell>
                                <TableCell align="right">{row.sold ===0?"Not sold": "Sold"}</TableCell>
                                <TableCell align="right">

                                    <Button onClick={async()=>{
                                        try{
                                            await dispatch(await archiveApplicationAsync(row.id));
                                            enqueueSnackbar(`Application ${row.is_archived===0? 'un': ''}archived`, {variant :'success'})
                                        }catch(err){
                                            enqueueSnackbar('Failed to archive application ', {variant :'error'})
                                        }
                                    }}>

                                    {row.is_archived ===1?"Archived": "Not Archived"}
                                        </Button>

                                    </TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=>{
                                        window.location = pagePath.app.rooms + `/${row.room}`
                                    }}>View room</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}