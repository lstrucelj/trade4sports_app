import { Button, createTheme, makeStyles, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown';
import eventSeriesData from '../../data/event_series.json'
import venueData from '../../data/venues.json'
import contestantData from '../../data/contestants.json'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4ba3c7',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 380,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: '20px 10px 0',
        color: '#fff',
        width: '100px'
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const ERROR_MESSAGE_REQUIRED = 'This field is required!';

const Form = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [formValues, setFormValues] = useState({
        eventSeries: {
            value: '',
            error: false,
            errorMessage: ERROR_MESSAGE_REQUIRED
        },
        venue: {
            value: '',
            error: false,
            errorMessage: ERROR_MESSAGE_REQUIRED
        },
        name: {
            value: '',
            error: false,
            errorMessage: ERROR_MESSAGE_REQUIRED
        },
        startDate: {
            value: new Date(),
            error: false,
            errorMessage: ERROR_MESSAGE_REQUIRED
        },
        contestant1: {
            value: '',
            error: false,
            errorMessage: ERROR_MESSAGE_REQUIRED
        },
        contestant2: {
            value: '',
            error: false,
            errorMessage: ERROR_MESSAGE_REQUIRED
        }
    })

    const validate = (name, value) => {
        let error = value === '';
        let errorMessage = ERROR_MESSAGE_REQUIRED;
        switch (name) {
            case 'contestant1':
                if (value == formValues.contestant2.value) {
                    error = true;
                    errorMessage = 'Two contestants can not be the same!'
                }
                var findContestant1 = contestantData.contestants.find(x => x.contestantId == value)
                var findContestant2 = contestantData.contestants.find(x => x.contestantId == formValues.contestant2.value)
                if (findContestant1 && findContestant2 && findContestant1.sportType.sportTypeId != findContestant2.sportType.sportTypeId) {
                    error = true;
                    errorMessage = 'Both contestants need to be in the same sports type!'
                }
                break;
            case 'contestant2':
                if (value == formValues.contestant1.value) {
                    error = true;
                    errorMessage = 'Two contestants can not be the same!'
                }
                var findContestant1 = contestantData.contestants.find(x => x.contestantId == value)
                var findContestant2 = contestantData.contestants.find(x => x.contestantId == formValues.contestant2.value)
                if (findContestant1 && findContestant2 && findContestant1.sportType.sportTypeId != findContestant2.sportType.sportTypeId) {
                    error = true;
                    errorMessage = 'Both contestants need to be in the same sports type!'
                }
                break;
        }
        return { error, errorMessage }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const { error, errorMessage } = validate(name, value);
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
                error: error,
                errorMessage: errorMessage
            }
        })
    }

    const handleDateChange = (name) => {
        return (value) => {
            setFormValues({
                ...formValues,
                [name]: {
                    ...formValues[name],
                    value,
                    error: value == null,
                    errorMessage: ERROR_MESSAGE_REQUIRED
                }
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues }

        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;

            newFormValues = {
                ...newFormValues,
                [currentField]: {
                    ...newFormValues[currentField],
                    error: currentValue === ''
                }
            }
        }
        setFormValues(newFormValues)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Paper style={modalStyle} className={classes.paper}>
                    <Typography variant='h5' style={{ padding: '20px 0' }}>Create new event</Typography>
                    <Dropdown
                        className={classes.formControl}
                        label="Event Series"
                        name="eventSeries"
                        value={formValues.eventSeries.value}
                        onChange={handleChange}
                        data={eventSeriesData.eventSeries}
                        mapping={
                            {
                                value: "eventSeriesId",
                                text: "name"
                            }
                        }
                        error={formValues.eventSeries.error}
                        helperText={formValues.eventSeries.error && formValues.eventSeries.errorMessage}
                    />
                    <Dropdown
                        className={classes.formControl}
                        label="Venue"
                        name="venue"
                        value={formValues.venue.value}
                        onChange={handleChange}
                        data={venueData.venues}
                        mapping={
                            {
                                value: "venueId",
                                text: "venueName"
                            }
                        }
                        error={formValues.venue.error}
                        helperText={formValues.venue.error && formValues.venue.errorMessage}
                    />
                    <TextField
                        className={classes.formControl}
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formValues.name.value}
                        onChange={handleChange}
                        error={formValues.name.error}
                        helperText={formValues.name.error && formValues.name.errorMessage}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            inputVariant="outlined"
                            disableToolbar
                            className={classes.formControl}
                            autoOk
                            variant='inline'
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Start Date"
                            value={formValues.startDate.value}
                            onChange={handleDateChange('startDate')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                            name="startDate"
                            error={formValues.startDate.error}
                            helperText={formValues.startDate.error && formValues.startDate.errorMessage}

                        />
                    </MuiPickersUtilsProvider>
                    <Dropdown
                        className={classes.formControl}
                        label="Contestant 1"
                        name="contestant1"
                        value={formValues.contestant1.value}
                        onChange={handleChange}
                        data={contestantData.contestants}
                        mapping={
                            {
                                value: "contestantId",
                                text: "name"
                            }
                        }
                        error={formValues.contestant1.error}
                        helperText={formValues.contestant1.error && formValues.contestant1.errorMessage}
                    />
                    <Dropdown
                        className={classes.formControl}
                        label="Contestant 2"
                        name="contestant2"
                        value={formValues.contestant2.value}
                        onChange={handleChange}
                        data={contestantData.contestants}
                        mapping={
                            {
                                value: "contestantId",
                                text: "name"
                            }
                        }
                        error={formValues.contestant2.error}
                        helperText={formValues.contestant2.error && formValues.contestant2.errorMessage}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
                            SAVE
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            CANCEL
                        </Button>
                    </div>
                </Paper>
            </ThemeProvider>
        </>
    )
}

export default Form