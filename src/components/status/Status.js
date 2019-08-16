import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'

import StatusDialog from './StatusDialog'
import statusFields from './StatusFields'

import Progressbar from '../common/ProgressBar'
import StatusToolbar from './StatusToolbar'
import statusColor from '../common/StatusColor'
import formatDate from '../common/FormatDate'

@inject('rootStore')
@observer
export default class Status extends Component {
    constructor(props) {
        super(props)
        statusFields.store = this.props.rootStore.statusStore
    }

    componentDidMount () {
        this.props.pageTitle('Status')
        const store = this.props.rootStore.statusStore
        store.getStatuses({search: store.search})
    }

    addStatus = () => {
        const store = this.props.rootStore.statusStore
        store.selectStatus({})

        statusFields.clear()
        statusFields.set('rules', {
            statusid: 'numeric'
        })
        store.showDialog(true, 'Add Status')
    }

    onStatusSelect = (e) => {
        const store = this.props.rootStore.statusStore
        store.selectStatus(e.data)

        statusFields.clear()
        statusFields.set(e.data)
        store.showDialog(true, 'Update Status')
    }

    hideDialog = () => {
        this.props.rootStore.statusStore.showDialog(false)
    }

    onSearch = (e) => {
        this.props.rootStore.statusStore.getStatuses({search: e.target.value})
    }

    render() {
        const { search, isShowDialog, title, selectedStatus, error, loading, statuses } = this.props.rootStore.statusStore
        return (
            <div className="p-grid">

                {error && this.props.notify('error', error)}

                <Progressbar loading={loading}/>

                <div className="p-col-12">
                    <div>
                        <StatusToolbar searchExpr={search} onSearch={this.onSearch} onAddStatus={this.addStatus}/>

                        <div className="vertical-space10" />

                        <DataTable value={ statuses }
                                   resizableColumns={true}
                                   reorderableColumns={true}
                                   selectionMode="single"
                                   selection={ selectedStatus }
                                   onRowSelect={this.onStatusSelect}>
                            <Column field="statusid" header="ID" sortable={true} style={{width: '10%'}} />
                            <Column field="title" header="Title" sortable={true} style={{width: '30%'}} />
                            <Column field="color" header="Color" sortable={true} style={{width: '30%'}} body={statusColor} />
                            <Column field="created" header="Created" sortable={true} style={{width: '30%'}} body={formatDate} />
                        </DataTable>

                        <StatusDialog form={statusFields} title={title} isShowDialog={isShowDialog} hideDialog={this.hideDialog} />

                    </div>
                </div>
            </div>
        )
    }
}
