import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import {DataTable} from 'primereact/components/datatable/DataTable'
import {Column} from 'primereact/components/column/Column'

class CreditProductsForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Panel header="Credit products">
                <div className="p-grid p-fluid">
                    <div className="p-grid p-fluid p-col-12">
                        <div className="vertical-space10" />
                            <DataTable value={[{losstypeid: 1, notes: 'notes', rate: 10 }]}
                                       rows={10}
                                       selection={[]}
                                       onSelectionChange={this.selectionChange}
                                       resizableColumns={true}
                                       scrollable={true}
                                       scrollHeight="100vh"
                                       onRowClick={this.rowClick}>
                                <Column field="losstypeid" header="ID" />
                                <Column field="notes" header="ID" />
                                <Column field="rate" header="Cost" />
                            </DataTable>
                    </div>
                </div>
            </Panel>
        )
    }
}

export default CreditProductsForm
