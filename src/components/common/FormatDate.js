import React from 'react'
import Moment from 'react-moment'

const formatDate = (rowData, column) => {
    const date = rowData[column.field]
    return <Moment format="DD/MM/YYYY HH:MM">{date}</Moment>
}

export default formatDate
