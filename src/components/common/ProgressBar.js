import React from 'react'
import PropTypes from 'prop-types'
import {ProgressBar} from 'primereact/progressbar'

const Progressbar = (props) => {
    return (
        <div className="p-col-12-1px">
            {props.loading &&
                <ProgressBar mode="indeterminate" style={{height: '1px'}} />
            }
        </div>

    )
}

Progressbar.propTypes = {
    loading: PropTypes.bool.isRequired
}
export default Progressbar
