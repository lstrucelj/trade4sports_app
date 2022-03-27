import eventSeries from '../data/event_series.json'
import contestants from '../data/contestants.json'
import venues from '../data/venues.json'
import events from '../data/events.json'

export const randomId = () => Math.floor(1000 + Math.random() * 9000);
export const getEventById = (id) => events.events.find(x => x.eventId == id);
export const getEventSeriesById = (id) => eventSeries.eventSeries.find(x => x.eventSeriesId == id);
export const getContestantById = (id) => contestants.contestants.find(x => x.contestantId == id);
export const getVenueById = (id) => venues.venues.find(x => x.venueId == id);

export const createEventObject = (event) => {
    const oldEvent = getEventById(event.eventId);
    const selectedEventSeries = getEventSeriesById(event.eventSeriesId);
    const selectedContestant1 = getContestantById(event.contestant1Id);
    const selectedContestant2 = getContestantById(event.contestant2Id);
    const selectedVenue = getVenueById(event.venueId);

    var createdEvent = {
        ...oldEvent,
        eventId: event.eventId > 0 ? event.eventId : randomId(),
        name: event.name,
        startDate: event.startDate,
        eventSeriesRound: {
            ...oldEvent?.eventSeriesRound,
            eventSeries: selectedEventSeries
        },
        contestant1: selectedContestant1,
        contestant2: selectedContestant2,
        venue: selectedVenue
    };
    return createdEvent
};