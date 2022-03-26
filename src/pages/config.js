import { Delete, Edit } from '@material-ui/icons'
import { Avatar, IconButton, Typography } from '@material-ui/core';

const BaseCellTemplate = ({ logoURL, name }) => {
    return (
        <div style={{ display: 'contents' }} >
            <Avatar variant="rounded" style={{ backgroundColor: 'transparent', border: '1px solid lightgray' }}>

                <img src={logoURL} style={{ width: 'inherit', height: 'inherit' }} />
            </Avatar>
            <Typography style={{ paddingLeft: '10px' }} >{name}</Typography>
        </div>
    );
}

const ContestantCellTemplate = (cellValues) => {
    const contestant = cellValues.row[cellValues.field];
    return (
        <BaseCellTemplate name={contestant.name} logoURL={contestant.logoURL} />
    );
}

const EventSeriesCellTemplate = (cellValues) => {
    const eventSeries = cellValues.row.eventSeriesRound[cellValues.field];
    return (
        <BaseCellTemplate name={eventSeries.name} logoURL={eventSeries.logoURL} />
    );
}

function getVenueName(params) {
    const name = params.row.venue[params.field];
    return name;
}

function getVenueAddress(params) {
    const address = params.row.venue.address;
    return `${address.addressLine1}, ${address.postalCode} ${address.city}, ${address.country}`;
}

export const columns = [
    {
        field: 'startDate',
        headerName: 'Start Date',
        flex: 0.4,
        type: 'date',
    },
    {
        field: 'contestant1',
        headerName: 'Contestant 1',
        flex: 0.7,
        renderCell: ContestantCellTemplate
    },
    {
        field: 'contestant2',
        headerName: 'Contestant 2',
        flex: 0.8,
        renderCell: ContestantCellTemplate
    },
    {
        field: 'eventSeries',
        headerName: 'Event Series',
        flex: 0.7,
        renderCell: EventSeriesCellTemplate
    },
    {
        field: 'venueName',
        headerName: 'Venue Name',
        flex: 0.6,
        valueGetter: getVenueName,
    },
    {
        field: 'venueAddress',
        headerName: 'Venue Address',
        flex: 1,
        valueGetter: getVenueAddress
    },
    {
        field: 'edit',
        headerName: 'Edit',
        maxWidth: '80px',
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
        renderCell: (cellValues) => {
            return (
                <IconButton
                    onClick={(event) => {
                    }}
                >
                    <Edit />
                </IconButton>
            );
        }
    },
    {
        field: 'delete',
        headerName: 'Delete',
        maxWidth: '80px',
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
        renderCell: (cellValues) => {
            return (
                <IconButton
                    onClick={(event) => {
                    }}
                >
                    <Delete />
                </IconButton>
            );
        }

    },
];




