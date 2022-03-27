const contestants = (state = [], action) => {
    switch (action.type) {
        case "GET_CONTESTANTS":
            return action.payload;

        default:
            return state;
    }
}

export default contestants