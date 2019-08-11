import React, {Fragment} from 'react'

const statusColor = (rowData, column, objectName = '') => {
    const result = objectName === '' ? rowData[column.field] : rowData[objectName]
    if (objectName === '') {
        return <Fragment>
            <div className='flex-block'>
                <div style={{backgroundColor: `#${result}`}} className='color-box' />
                <span className='color-value'>{result}</span>
            </div>
        </Fragment>
    }
    else {
        return <Fragment>
            <div className='flex-block'>
                <div style={{backgroundColor: `#${result.value}`}} className='color-box' />
                <span className='color-value'>{result.title}</span>
            </div>
        </Fragment>
    }
}

export default statusColor
