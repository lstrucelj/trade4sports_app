import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import React from 'react'

const Table = ({ data, columns }) => {
    const classes = useStyles();

    return (
        <>
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
    dataGridContainer: {
        height: 'calc(100vh - 175px)',
        width: '100%'
    }
});

export default Table