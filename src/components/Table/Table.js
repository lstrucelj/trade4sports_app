import { Button, createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import React from 'react'
import { Add } from '@material-ui/icons'

const Table = ({ data, columns, handleOpen }) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.buttonContainer}>
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
            <div className={classes.dataGridContainer}>
                <ThemeProvider theme={theme}>
                    <DataGrid
                        className={classes.table}
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

const theme = createTheme({
    palette: {
        primary: {
            main: '#4ba3c7',
        },
    }
});

const useStyles = makeStyles({
    table: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none',
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnsContainer': {
            backgroundColor: '#005a7f14'
        },
    },
    button: {
        margin: theme.spacing(1),
        color: '#fff'
    },
    buttonContainer: {
        textAlign: 'right',
        padding: '0 10px 10px 10px'
    },
    dataGridContainer: {
        height: 770,
        width: '100%'
    }
});

export default Table