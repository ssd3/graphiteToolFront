import React from 'react'
import PropTypes from 'prop-types'

const Toast = (props) => {
    return <div dangerouslySetInnerHTML={{__html: props.text}} />
}

Toast.propTypes = {
    text: PropTypes.string.isRequired
}
export default Toast
