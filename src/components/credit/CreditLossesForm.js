import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {Calendar} from 'primereact/calendar'
import {Panel} from 'primereact/components/panel/Panel'
import {Button} from 'primereact/components/button/Button'
import {DataTable} from 'primereact/components/datatable/DataTable'
import {Column} from 'primereact/components/column/Column'
import formatDate from '../common/FormatDate'

class CreditLossesForm extends Component {
    constructor(props) {
        super(props)

        this.creditlosses = [{
            creditlossid: '',
            creditid: 1,
            losstypeid: '',
            rate: 0
        }]
    }

    render() {
        return (
            <Panel header="Box losses">
                <div className="p-grid p-fluid p-col-12" style={{height: '20vh'}}>
                    <div className="p-toolbar-group-left" style={{paddingTop: '5px'}}>
                        <Button label="Add box loss" icon="pi pi-plus" className="p-button-secondary" />
                    </div>
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
                    <input type="hidden" id="creditid" value='' />
                </div>
            </Panel>
        )
    }
}

export default CreditLossesForm
