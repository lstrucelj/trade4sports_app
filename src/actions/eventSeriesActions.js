import data from '../data/event_series.json'

const getEventSeries = (eventSeries) => {
    return {
        type: "GET_EVENT_SERIES",
        payload: eventSeries
    }
}

const fetchEventSeries = () => {
    return dispatch => {
        dispatch(getEventSeries(data.eventSeries))
    }
}

export default {
    fetchEventSeries
}