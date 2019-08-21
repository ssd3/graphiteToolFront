import React, {Component, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'primereact/button'
import {OverlayPanel} from 'primereact/overlaypanel'
import StatusButton from './StatusButton'

@inject('rootStore')
@observer
class StatusChange extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { statuses } = this.props.rootStore.statusStore
        const { selectedRows } = this.props

        return ((statuses && selectedRows) &&
            <Fragment>
                <Button type="button"
                        label="Change Status"
                        icon="pi pi-check"
                        className="p-button-secondary"
                        disabled={selectedRows.length === 0}
                        onClick={(e) => this.op.toggle(e)} />
                <OverlayPanel ref={(el) => this.op = el}
                              showCloseIcon={true}
                              dismissable={true}>
                    {
                        statuses.map(status => {
                            return <StatusButton key={status.statusid}
                                                 status={status}/>
                        })
                    }
                </OverlayPanel>
            </Fragment>
        )
    }
}

export default StatusChange
