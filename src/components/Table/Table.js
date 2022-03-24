import { DataGrid } from '@material-ui/data-grid'
import React from 'react'


const Table = ({ data, columns }) => {

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                getRowId={(row) => row.eventId}
                hideFooter={true}
            />
        </div>
    )
}

export default Table