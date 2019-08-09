import React, {Fragment} from 'react'

const statusColor = (rowData, column) => {
    const value = rowData[column.field]
    return <Fragment>
        <div className='flex-block'>
            <div style={{backgroundColor: `#${value}`}} className='color-box' />
            <span className='color-value'>{value}</span>
        </div>
    </Fragment>
}

export default statusColor
