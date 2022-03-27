import data from '../data/events.json'
import {
    createEventObject
} from '../helper/helper'


const getEvents = (events) => {
    return {
        type: "GET_EVENTS",
        payload: events
    }
}

const fetchEvents = () => {
    return dispatch => {
        dispatch(getEvents(data.events))
    }
}

const createEvent = (event) => {
    return {
        type: "CREATE_EVENT",
        payload: event
    }
}

const fetchCreateEvent = (event) => {
    return dispatch => {
        var createdEvent = createEventObject(event);
        dispatch(createEvent(createdEvent))
    }
}

const deleteEvent = (eventId) => {
    return {
        type: "DELETE_EVENT",
        payload: eventId
    }
}

const fetchDeleteEvent = (event) => {
    return dispatch => {
        dispatch(deleteEvent(event.id))
    }
}

const editEvent = (event) => {
    return {
        type: "EDIT_EVENT",
        payload: event
    }
}

const fetchEditEvent = (event) => {
    return dispatch => {
        var updatedEvent = createEventObject(event);
        dispatch(editEvent(updatedEvent))
    }
}

export default {
    fetchEvents,
    fetchCreateEvent,
    fetchDeleteEvent,
    fetchEditEvent
}
