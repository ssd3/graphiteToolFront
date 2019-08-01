import React, { Component } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'

import {inject, observer} from 'mobx-react'
import {Button} from 'primereact/button'

@inject('rootStore')
@observer
export default class Status extends Component {
    constructor(props) {
        super(props)
        this.insertStatus = this.insertStatus.bind(this)
    }

    componentDidMount () {
        this.props.pageTitle('Status')
        this.props.rootStore.statusStore.getStatuses
    }

    insertStatus() {
        this.props.rootStore.statusStore.createStatus({
            title: 'Status Test 1',
            value: '#eeeddd'
        })
    }

    render() {
        const { loading, statuses, error } =  this.props.rootStore.statusStore
        console.log('statuses', statuses)
        return (
            <div className="p-grid">
                {error && this.props.notify('error', error)}
                {loading &&
                    <div className="p-col-12-1px">
                        <ProgressBar mode="indeterminate" style={{height: '1px'}}/>
                    </div>
                }
                <div className="p-col-12">
                    <Button label="Add Status" icon="pi pi-plus" className="p-button-secondary" onClick={this.insertStatus} />
                    <DataTable value={ statuses }
                               resizableColumns={true}
                               reorderableColumns={true}>
                        <Column field="statusid" header="ID" style={{width: '10%'}} />
                        <Column field="title" header="Title" style={{width: '30%'}} />
                        <Column field="value" header="Color" style={{width: '30%'}} />
                        <Column field="created" header="Created" style={{width: '30%'}} />
                    </DataTable>

                </div>
            </div>
        )
    }
}
