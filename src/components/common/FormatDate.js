import React from 'react'

const formatDate = (data, column = null) => {
    if (column)
        return new Date(data[column.field]).toLocaleString()
    else
        return new Date(data).toLocaleString()
}

export default formatDate
