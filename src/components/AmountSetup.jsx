import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Box, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function AmountSetup() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Amount Setup
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: '1', justifyContent: 'end' }}>
                        <Typography variant="div" sx={{ fontSize: '10px' }}>Automatic</Typography>
                        <Switch />
                        <Typography variant='div' sx={{ fontSize: '10px' }}>Manual</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography>Thar Dashboard</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Dashboard', 'Withdrawals', 'Amount Setup', 'User', 'Transactions', 'Access', 'Feedback', 'Logout'].map((text, index) => (
                        <Link to={`/admin/${text}`}>
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <Box sx={{ display: 'grid', gridTemplateColumns:"repeat(2, 50%)", gap: "10px" }}>
                    <TextField required
                        label="Amount [in Rs.]"
                        defaultValue={300}
                        sx={{ width: "50%"}}
                        variant="outlined"
                        
                    />

                    <TextField required
                        label="Minimum withdrawal amount [in Rs.]"
                        defaultValue={200}
                        sx={{ width: "50%" }}
                        variant="outlined"
                    />

                    <TextField required
                        label="Invite bonus amount [in Rs.]"
                        defaultValue={20}
                        sx={{ width: "50%" }}
                        variant="outlined"
                    />

                    <TextField required
                        label="Level 1 commission percent [in %]"
                        defaultValue={0.6}
                        sx={{ width: "50%" }}
                        variant="outlined"
                    />

                    <TextField required
                        label="Level 2 commission percent [in %]"
                        defaultValue={0.2}
                        sx={{ width: "50%" }}
                        variant="outlined"
                    />

                    <TextField required
                        label="Level 3 commission percent [in %]"
                        defaultValue={0.1}
                        sx={{ width: "50%" }}
                        variant="outlined"
                    />

                    <TextField required
                        label="Recharge bonus [in %]"
                        defaultValue={3}
                        sx={{ width: "50%" }}
                        variant="outlined"
                        helperText="[0.01 == 1%], [0.02 == 2%], [0.03 == 3%], ... [0.10 == 10%]"
                    />

                    <TextField required
                        label="Withdrawal Fee [in %]"
                        defaultValue={5}
                        sx={{ width: "50%" }}
                        variant="outlined"
                        helperText="[0.01 == 1%], [0.02 == 2%], [0.03 == 3%]"
                    />

                    <TextField required
                        label="UPI"
                        defaultValue={"karsiy@ibl"}
                        sx={{ width: "50%" }}
                        variant="outlined"
                        helperText="username@ybl,etc"
                    />
                </Box>

                <Box className='mt-4 flex justify-end'>
                    <Button variant='contained' color="primary">Submit</Button>
                </Box>

            </main>
        </div>
    );
}
