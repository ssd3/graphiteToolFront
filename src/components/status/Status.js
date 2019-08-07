import React, {Component, Fragment} from 'react'
import { ProgressBar } from 'primereact/progressbar'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'

import {inject, observer} from 'mobx-react'
import {Button} from 'primereact/button'
import {Toolbar} from 'primereact/components/toolbar/Toolbar'
import {InputText} from 'primereact/components/inputtext/InputText'
import StatusDialog from './StatusDialog'
import statusFields from './StatusFields'
import Moment from 'react-moment'
import Progressbar from '../common/ProgressBar'
import StatusToolbar from './StatusToolbar'

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

    formatDate = (rowData, column) => {
        const date = rowData[column.field]
        return <Moment format="DD/MM/YYYY HH:MM">{date}</Moment>
    }

    showColor = (rowData, column) => {
        const value = rowData[column.field]
        return <Fragment>
                    <div className='flex-block'>
                        <div style={{backgroundColor: `#${value}`}} className='color-box' />
                        <span className='color-value'>{value}</span>
                    </div>
               </Fragment>
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
                            <Column field="statusid" header="ID" style={{width: '10%'}} />
                            <Column field="title" header="Title" style={{width: '30%'}} />
                            <Column field="value" header="Color" style={{width: '30%'}} body={this.showColor} />
                            <Column field="created" header="Created" style={{width: '30%'}} body={this.formatDate} />
                        </DataTable>

                        <StatusDialog form={statusFields} title={title} isShowDialog={isShowDialog} hideDialog={this.hideDialog} />

                    </div>
                </div>
            </div>
        )
    }
}
