import events from './events'
import eventSeries from './eventSeries'
import contestants from './contestants'
import venues from './venues'

const rootReducer = {
    reducer: {
        events,
        eventSeries,
        contestants,
        venues
    }
}

export default rootReducer
