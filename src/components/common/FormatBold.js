import React from 'react'
import PropTypes from 'prop-types'

const FormatBold = ({rowData, column}) => {
    return <span style={{fontWeight: 'bold'}}>{rowData[column.field]}</span>
}

FormatBold.protoTypes = {
    rowData: PropTypes.array.isRequired,
    column: PropTypes.object.isRequired
}
export default FormatBold
