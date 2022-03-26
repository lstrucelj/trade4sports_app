import React from 'react'
import { AppBar, Container, Link, makeStyles, Toolbar, Typography } from '@material-ui/core'
import '../index.css'
import Table from '../components/Table/Table.js'
import logo from '../assets/logo.png'
import { columns } from './config'
import events from '../data/events.json'

const useStyles = makeStyles((theme) => ({
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
        fontFamily: 'sans-serif'
    },
}))

const EventsMain = () => {
    const classes = useStyles();

    return (
        <div id='main'>
            <AppBar position='relative'>
                <Toolbar className={classes.toolbar}>
                    <img src={logo} className={classes.logo} />
                </Toolbar>
            </AppBar>
            <main>
                <Container className={classes.tableContainer}>
                    <Typography variant='h5' className={classes.typography} style={{ padding: '20px 20px 0 20px' }}>Events list</Typography>

                    <Table columns={columns} data={events.events} />
                </Container>
            </main>
            <footer>
                <Copyright />
            </footer>
        </div>
    )
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://trade4sports.com/">
                Trade4Sports
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default EventsMain