const events = (state = [], action) => {
    switch (action.type) {
        case "GET_EVENTS":
            return action.payload;
        case "CREATE_EVENT":
            return [...state, action.payload];
        case "DELETE_EVENT":
            return state.filter((item) => item.eventId !== action.payload);
        case "EDIT_EVENT":
            return state.map((item) => {
                if (item.eventId === action.payload.eventId) {
                    return action.payload;
                }
                else {
                    return item;
                }
            });

        default:
            return state;
    }
}

export default events