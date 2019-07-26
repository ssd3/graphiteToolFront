import React, { Component } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import {Growl} from 'primereact/growl'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'

import { graphql } from 'react-apollo'
import GetStatuses from '../queries/status.graphql'
import gql from 'graphql-tag'

const mapResultsToProps = ({data}) => {
    if (!data.statuses) {
        return {
            loading: data.loading
        }
    }

    const { statuses } = data.statuses
    return {
        loading: data.loading,
        statuses: statuses
    }
}

@graphql(GetStatuses, {
    props: mapResultsToProps
})
export class Status extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount () {
        this.props.pageTitle('Status')
    }

    render() {
        const { loading, statuses } = this.props
        console.log('loading', this.props)

        return (
            <div className="p-grid">
                {loading &&
                    <div className="p-col-12-1px">
                        <ProgressBar mode="indeterminate" style={{height: '1px'}}/>
                    </div>
                }
                <div className="p-col-12">

                    <DataTable value={ statuses }
                               resizableColumns={true}
                               reorderableColumns={true}>
                        <Column field="statusid" header="ID" style={{width: '10%'}} />
                        <Column field="title" header="Title" style={{width: '30%'}} />
                        <Column field="value" header="Color" style={{width: '30%'}} />
                        <Column field="created" header="Created" style={{width: '30%'}} />
                    </DataTable>

                </div>
                <Growl ref={(el) => this.growl = el} position='bottomleft' />
            </div>
        )
    }
}
