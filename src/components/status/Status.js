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

@inject('rootStore')
@observer
export default class Status extends Component {
    constructor(props) {
        super(props)
        statusFields.store = this.props.rootStore.statusStore
    }

    componentDidMount () {
        this.props.pageTitle('Status')
        this.props.rootStore.statusStore.getStatuses({})
    }

    newStatus = () => {
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

    onGlobalSearch = (e) => {
        this.props.rootStore.statusStore.getStatuses({search: e.target.value})
    }

    render() {
        const { isShowDialog, title, selectedStatus, error, loading, statuses } = this.props.rootStore.statusStore
        return (
            <div className="p-grid">
                {error && this.props.notify('error', error)}
                <div className="p-col-12-1px">
                    {loading && <ProgressBar mode="indeterminate" style={{height: '1px'}}/> }
                </div>
                <div className="p-col-12">
                    <div>
                        <Toolbar>
                            <div className="p-toolbar-group-left">
                                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
                                <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" style={{marginRight: '.25em'}}/>
                            </div>
                            <div className="p-toolbar-group-right" style={{display: 'flex'}}>
                                <Button label="Add Status" icon="pi pi-plus" className="p-button-secondary" onClick={this.newStatus} />
                            </div>
                        </Toolbar>

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

                        {isShowDialog &&
                            <StatusDialog form={statusFields} title={title} hideDialog={this.hideDialog} />
                        }

                    </div>
                </div>
            </div>
        )
    }
}
