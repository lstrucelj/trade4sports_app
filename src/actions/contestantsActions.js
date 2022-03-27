import data from '../data/contestants.json'

const getContestants = (contestants) => {
    return {
        type: "GET_CONTESTANTS",
        payload: contestants
    }
}

const fetchContestants = () => {
    return dispatch => {
        dispatch(getContestants(data.contestants))
    }
}

export default {
    fetchContestants
}