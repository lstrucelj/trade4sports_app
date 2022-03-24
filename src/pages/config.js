import { Delete, Edit } from '@material-ui/icons'
import { Avatar, IconButton, Typography } from '@material-ui/core';

const ContestantCellTemplate = (cellValues) => {
    const contestant = cellValues.row[cellValues.field];
    return (
        <div style={{ display: 'contents' }} >
            <Avatar variant="rounded" style={{ backgroundColor: 'transparent', border: '1px solid lightgray' }}>

                <img src={contestant.logoURL} style={{ width: 'inherit', height: 'inherit' }} />
            </Avatar>
            <Typography style={{ paddingLeft: '10px' }} >{contestant.name}</Typography>
        </div>
    );

}

export const columns = [
    {
        field: 'startDate',
        headerName: 'Start Date',
        flex: 1,
        type: 'date',
    },
    {
        field: 'contestant1',
        headerName: 'Contestant1 Name',
        flex: 1,
        editable: true,
        renderCell: ContestantCellTemplate
    },
    {
        field: 'contestant2',
        headerName: 'Contestant2 Name',
        flex: 1,
        editable: true,
        renderCell: ContestantCellTemplate
    },
    {
        field: 'eventSeries',
        headerName: 'Event Series',
        flex: 1,
        editable: true,
    },
    {
        field: 'vanueName',
        headerName: 'Vanue Name',
        flex: 1,
        editable: true,
    },
    {
        field: 'venueAddress',
        headerName: 'Venue Address',
        flex: 1,
    },
    {
        field: 'edit',
        headerName: 'Edit',
        maxWidth: '80px',
        disableColumnMenu: true,
        sortable: false,
        renderCell: (cellValues) => {
            return (
                <IconButton
                    variant="contained"
                    color="primary"
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
        renderCell: (cellValues) => {
            return (
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                    }}
                >
                    <Delete />
                </IconButton>
            );
        }

    },
];




