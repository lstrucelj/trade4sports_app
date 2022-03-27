import React, { useEffect, useState } from 'react'
import { AppBar, Button, Container, createTheme, makeStyles, Modal, Toolbar, Typography } from '@material-ui/core'
import '../index.css'
import Table from '../components/Table/Table.js'
import logo from '../assets/logo.png'
import { columnsConfig } from './config'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../actions'
import Form from '../components/Form/Form'
import Copyright from '../components/Copyright/Copyright'
import { Add } from '@material-ui/icons'

const EventsMain = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const dispatch = useDispatch()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const eventsData = useSelector(state => state.events)

    useEffect(() => {
        dispatch(allActions.eventActions.fetchEvents())
    }, [])

    const handleEdit = (data) => {
        const eventObject = {
            eventId: data.eventId,
            eventSeries: data.eventSeriesRound.eventSeries.eventSeriesId,
            venue: data.venue.venueId,
            name: data.name,
            startDate: data.startDate,
            contestant1: data.contestant1.contestantId,
            contestant2: data.contestant2.contestantId
        };
        setSelectedRow(eventObject);
        handleOpen();
    }

    const handleAdd = () => {
        setSelectedRow(null);
        handleOpen();
    }

    const handleDelete = (data) => {
        dispatch(allActions.eventActions.fetchDeleteEvent(data));
    }

    return (
        <div id='page'>
            <AppBar position='relative'>
                <Toolbar className={classes.toolbar}>
                    <img src={logo} className={classes.logo} />
                    <Typography variant='h5' className={classes.typography}>Events list</Typography>
                </Toolbar>
            </AppBar>
            <main id='main'>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div>
                        <Form onCancel={handleClose} data={selectedRow} />
                    </div>
                </Modal>
                <Container className={classes.tableContainer}>
                    <div className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Add />}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </div>
                    <Table columns={columnsConfig(handleEdit, handleDelete)} data={eventsData} />
                </Container>
            </main>
            <footer>
                <Copyright />
            </footer>
        </div>
    )
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#4ba3c7',
        },
    }
});

const useStyles = makeStyles(() => ({
    toolbar: {
        backgroundColor: '#e7eef1',
        height: '64px'
    },
    logo: {
        height: '40px',
        position: 'absolute'
    },
    tableContainer: {
        maxWidth: '100%',
        height: '100%'
    },
    typography: {
        textAlign: '-webkit-center',
        textTransform: 'uppercase',
        fontFamily: 'sans-serif',
        color: 'black',
        margin: '0 auto',
        fontWeight: '700'
    },
    button: {
        margin: theme.spacing(1),
        color: '#fff'
    },
    buttonContainer: {
        textAlign: 'right',
        padding: '10px 10px',
        height: '52px     '
    }
}))

export default EventsMain