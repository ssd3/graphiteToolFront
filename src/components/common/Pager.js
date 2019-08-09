import React from 'react'
import PropTypes from 'prop-types'
import {Paginator} from 'primereact/paginator'

const Pager = (props) => {
    const { pageInfo, pagerInfo } = props
    return (
        <Paginator first={0}
                   rows={props.rows}
                   totalRecords={100}
                   rowsPerPageOptions={props.rowsPerPageOptions }
                   onPageChange={props.onPageChange} />
    )
}

Pager.defaultProps = {
    rowsPerPageOptions: [5,10,20,30,50,100]
}

Pager.propTypes = {
    pagerInfo: PropTypes.object.isRequired,
    pageInfo: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
}
export default Pager
