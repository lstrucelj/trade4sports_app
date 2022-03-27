import React, { useEffect, useState } from 'react'
import { Button, createTheme, makeStyles, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core'
import Dropdown from '../Dropdown/Dropdown';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import allActions from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

const ERROR_MESSAGE_REQUIRED = 'This field is required!';

const Form = ({ onCancel, data }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const eventSeriesData = useSelector(state => state.eventSeries)
    const contestantsData = useSelector(state => state.contestants)
    const venuesData = useSelector(state => state.venues)

    useEffect(() => {
        dispatch(allActions.eventSeriesActions.fetchEventSeries())
        dispatch(allActions.contestantsActions.fetchContestants())
        dispatch(allActions.venuesActions.fetchVenues())
    }, [])

    const [formValues, setFormValues] = useState({
        eventId: {
            value: data?.eventId || 0
        },
        eventSeries: {
            value: data?.eventSeries || '',
        },
        venue: {
            value: data?.venue || '',
        },
        name: {
            value: data?.name || '',
        },
        startDate: {
            value: data?.startDate || new Date(),
        },
        contestant1: {
            value: data?.contestant1 || '',
        },
        contestant2: {
            value: data?.contestant2 || '',
        }
    })

    const checkSameContestant = (firstId, secondId) => firstId == secondId;
    const checkSameSportType = (firstId, secondId) => {
        var findContestant1 = contestantsData.find(x => x.contestantId == firstId)
        var findContestant2 = contestantsData.find(x => x.contestantId == secondId);

        return (findContestant1 && findContestant2 && findContestant1.sportType.sportTypeId != findContestant2.sportType.sportTypeId)
    };

    const validateField = (name, value, newFormValues) => {
        let error = value === '';
        let errorMessage = ERROR_MESSAGE_REQUIRED;
        let validateObject = {
            [name]: {
                ...newFormValues[name],
                error,
                errorMessage
            },
        };
        switch (name) {
            case 'contestant1':
            case 'contestant2':
                const secondContestant = name.slice(-1) == '2' ? 'contestant1' : 'contestant2';
                const sameContestant = checkSameContestant(value, formValues[secondContestant].value);
                const sameSportType = checkSameSportType(value, formValues[secondContestant].value);
                if (sameContestant) {
                    error = true;
                    errorMessage = 'Two contestants can not be the same!'
                }
                if (sameSportType) {
                    error = true;
                    errorMessage = 'Both contestants need to be in the same sports type!'
                }
                if (newFormValues[name].value && newFormValues[secondContestant].value) {
                    validateObject = {
                        ...validateObject,
                        [name]: {
                            ...newFormValues[name],
                            error,
                            errorMessage
                        },
                        [secondContestant]: {
                            ...newFormValues[secondContestant],
                            error,
                            errorMessage
                        },
                    }
                }
                break;
        }

        return validateObject;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormValues = {
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
            },
        }

        const validateObject = validateField(name, value, newFormValues);
        setFormValues({
            ...newFormValues,
            ...validateObject
        });
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
            const validateObject = validateField(currentField, currentValue, newFormValues);
            newFormValues = {
                ...newFormValues,
                ...validateObject
            }
        }
        setFormValues(newFormValues);

        const isError = Object.keys(newFormValues).some(x => newFormValues[x].error);
        if (isError) {
            return
        }

        const event = {
            eventId: newFormValues.eventId.value,
            eventSeriesId: newFormValues.eventSeries.value,
            venueId: newFormValues.venue.value,
            name: newFormValues.name.value,
            startDate: moment(newFormValues.startDate.value).format('YYYY-MM-DD'),
            contestant1Id: newFormValues.contestant1.value,
            contestant2Id: newFormValues.contestant2.value,
        }
        if (data) {
            dispatch(allActions.eventActions.fetchEditEvent(event));
        }
        else {
            dispatch(allActions.eventActions.fetchCreateEvent(event));
        }

        onCancel();
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <Typography variant='h5' className={classes.title}>Create new event</Typography>
                    <Dropdown
                        className={classes.formControl}
                        label="Event Series"
                        name="eventSeries"
                        value={formValues.eventSeries.value}
                        onChange={handleChange}
                        data={eventSeriesData}
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
                        data={venuesData}
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
                            format="yyyy-MM-dd"
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
                        data={contestantsData}
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
                        data={contestantsData}
                        mapping={
                            {
                                value: "contestantId",
                                text: "name"
                            }
                        }
                        error={formValues.contestant2.error}
                        helperText={formValues.contestant2.error && formValues.contestant2.errorMessage}
                    />
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>SAVE</Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={onCancel}>CANCEL</Button>
                    </div>
                </Paper>
            </ThemeProvider>
        </>
    )
}

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
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`
    },
    formControl: {
        margin: theme.spacing(1),
        width: 280,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: '20px 10px 0',
        color: '#fff',
        width: '100px'
    },
    title: {
        padding: '20px 0'
    },
    buttonContainer: {
        textAlign: 'center'
    }

}));

export default Form