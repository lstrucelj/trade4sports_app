const eventsSeries = (state = [], action) => {
    switch (action.type) {
        case "GET_EVENT_SERIES":
            return action.payload;

        default:
            return state;
    }
}

export default eventsSeries