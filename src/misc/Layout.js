import * as React from 'react';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navconfig from '../nav';
import { getUser, logOutUser } from './sessionManager';


function navItem({ navs }) {
    return (navs.map((item, i) => {
        return (<ListItemButton
            key={i}
            onClick={(e) => {
                e.preventDefault();
                window.location = item.href
            }}
            sx={{
                minHeight: 48,
                justifyContent: 'initial',
                px: 2.5,
            }}
        >
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                }}
            >
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ opacity: 1 }} />
        </ListItemButton>
        )
    }))
}

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Room finder
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {Navconfig.map((navList, i) => {
                            const Guard = navList.guard;
                            const isAdminPage = navList.isAdminPage || false;
                            return (
                                <Guard key={i} isAdminPage={isAdminPage}>
                                    <Divider />
                                    <Typography variant='button' gutterBottom  >
                                        {navList.title}
                                    </Typography>
                                    {navItem({ navs: navList.navs })}
                                </Guard>
                            )
                        }
                        )}
                    </List>
                    <Divider />
                    <ListItemButton
                        onClick={(e) => {
                            e.preventDefault();
                            logOutUser();
                        }}
                        sx={{
                            minHeight: 48,
                            justifyContent: 'initial',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 3,
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="logout" sx={{ opacity: 1 }} />
                    </ListItemButton>
                </Box>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
