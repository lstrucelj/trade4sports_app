import React, { useEffect, useState } from 'react'
import { AppBar, Container, makeStyles, Modal, Toolbar, Typography } from '@material-ui/core'
import '../index.css'
import Table from '../components/Table/Table.js'
import logo from '../assets/logo.png'
import { columnsConfig } from './config'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../actions'
import Form from '../components/Form/Form'
import Copyright from '../components/Copyright/Copyright'

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

    const handleDelete = (data) => {
        dispatch(allActions.eventActions.fetchDeleteEvent(data));
    }

    return (
        <div id='main'>
            <AppBar position='relative'>
                <Toolbar className={classes.toolbar}>
                    <img src={logo} className={classes.logo} />
                </Toolbar>
            </AppBar>
            <main>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div>
                        <Form onCancel={handleClose} data={selectedRow} />
                    </div>
                </Modal>
                <Container className={classes.tableContainer}>
                    <Typography variant='h5' className={classes.typography}>Events list</Typography>
                    <Table columns={columnsConfig(handleEdit, handleDelete)} data={eventsData} handleOpen={handleOpen} />
                </Container>
            </main>
            <footer>
                <Copyright />
            </footer>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    toolbar: {
        backgroundColor: '#e7eef1',
        height: '64px'
    },
    logo: {
        height: '40px'
    },
    tableContainer: {
        maxWidth: '100%'
    },
    typography: {
        textAlign: '-webkit-center',
        textTransform: 'uppercase',
        fontFamily: 'sans-serif',
        padding: '20px 20px 0 20px'
    },
}))

export default EventsMain