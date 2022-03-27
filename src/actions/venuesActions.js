import data from '../data/venues.json'

const getVenues = (venues) => {
    return {
        type: "GET_VENUES",
        payload: venues
    }
}

const fetchVenues = () => {
    return dispatch => {
        //GET /venues
        dispatch(getVenues(data.venues))
    }
}

export default {
    fetchVenues
}