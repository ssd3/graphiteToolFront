import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'primereact/button'
import {inject, observer} from 'mobx-react'

@inject('rootStore')
@observer
class StatusButton extends Component {
    constructor(props) {
        super(props)
    }

    changeStatus = id => {
        const { debitComplexStore } = this.props.rootStore
        debitComplexStore.updateDebitsStatus(id)
    }

    render() {
        const { status } = this.props
        return (
            <Fragment>
                <div style={{paddingBottom: '3px'}}>
                    <Button label={status.title}
                            icon="pi pi-check"
                            className="p-button-secondary"
                            style={{backgroundColor: `#${status.color}`, width: '150px'}}
                            onClick={(e) => {this.changeStatus(status.statusid)}}/>
                </div>
            </Fragment>
        )
    }

    static propTypes = {
        status: PropTypes.object.isRequired
    }
}

export default StatusButton
