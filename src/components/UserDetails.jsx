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
import { Box, InputAdornment, TextField, Tab, Tabs } from '@material-ui/core';
import { Search, Visibility, Block, Edit } from '@material-ui/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { collection, getDocs, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import db from '../firebase/config.js'
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useState } from 'react';

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

export default function User() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(0);
    const [recharges, setRecharges] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('name') === null) {
            navigate('/admin/Login');
        }
        getRecharges();
        getWithdrawals();
    }, []);

    const getWithdrawals = async() => {
        const withdrawal1 = await getDocs(collection(db, `/users/${location.state.user_id}/withdrawals`))
            .then((response) => {
                var temp = [];
                response.forEach(async (element) => {
                    const withdrawalDetails = await getDoc(doc(db, 'withdrawals', element.data().withdrawals_id));
                    if (withdrawalDetails.exists()) {
                        temp = [...temp, withdrawalDetails.data()];
                    }
                    //console.log(withdrawalDetails.data());
                    setWithdrawals(temp);
                });
            })
            .catch(error => console.log(error));

    }

    const getRecharges = async () => {
        const recharge1 = await getDocs(collection(db, `/users/${location.state.user_id}/placed_recharges`))
            .then((response) => {
                var temp = [];
                response.forEach(async (element) => {
                    const rechargeDetails = await getDoc(doc(db, 'recharges', element.data().recharge_id));
                    if (rechargeDetails.exists()) {
                        temp = [...temp, rechargeDetails.data()];
                    }
                    setRecharges(temp);
                });
            })
            .catch(error => console.log(error));
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                        {location.state.mobno}
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

                <Typography variant='h4'>Refer Code: {location.state.user_invite}</Typography>

                <Box sx={{ width: '100%', mt: 3 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Recharge" {...a11yProps(0)} />
                            <Tab label="Withdrawals" {...a11yProps(1)} />
                            <Tab label="Refer History" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile Number</TableCell>
                                    <TableCell>Reference Id</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    recharges && recharges.map((element) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{location.state.bankDetails.fullName}</TableCell>
                                                <TableCell>{element.mobno}</TableCell>
                                                <TableCell>{element.refno}</TableCell>
                                                <TableCell><span className='font-bold'>{String(element.status).toUpperCase()}</span></TableCell>
                                                <TableCell>Rs.{element.recharge_value}</TableCell>
                                                <TableCell>{new Date(element.time.seconds * 1000).toDateString()}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Account no</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Bank Name</TableCell>
                                    <TableCell>IFSC Code</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    withdrawals.map((element) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{element.bankAccount}</TableCell>
                                                <TableCell>{element.fullName}</TableCell>
                                                <TableCell>{element.bankName}</TableCell>
                                                <TableCell>{element.ifsc}</TableCell>
                                                <TableCell><span className='font-bold'>{String(element.status).toUpperCase()}</span></TableCell>
                                                <TableCell>Rs. {element.withdrawalAmount}</TableCell>
                                                <TableCell>{new Date(element.time.seconds*1000).toDateString()}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile Number</TableCell>
                                    <TableCell>Reference Id</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    location.state?.recharges && location.state?.recharges.map((element) => {
                                        return (
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Mobile Number</TableCell>
                                                <TableCell>Reference Id</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Date</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TabPanel>
                </Box>

            </main>
        </div>
    );
}