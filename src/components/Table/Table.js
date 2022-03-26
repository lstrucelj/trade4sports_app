import { Button, createTheme, makeStyles, Modal, ThemeProvider } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import React from 'react'
import { Add } from '@material-ui/icons'
import Form from '../Form/Form';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4ba3c7',
        },
    },
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});

const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        }, '&.MuiDataGrid-root .MuiDataGrid-columnsContainer': {
            backgroundColor: '#005a7f14'
        },
    },
    button: {
        margin: theme.spacing(1),
        color: '#fff'
    },
});

const Table = ({ data, columns }) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div style={{ textAlign: 'right', padding: '0 10px 10px 10px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    Add
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <Form />
                </div>
            </Modal>
            <div style={{ height: 770, width: '100%' }}>
                <ThemeProvider theme={theme}>
                    <DataGrid
                        className={classes.root}
                        rows={data}
                        columns={columns}
                        checkboxSelection
                        disableSelectionOnClick
                        getRowId={(row) => row.eventId}
                        hideFooter={true}
                        disableColumnSelector
                        components={{ Toolbar: GridToolbar }}
                        disableColumnMenu

                    />
                </ThemeProvider>
            </div>
        </>
    )
}

export default Table