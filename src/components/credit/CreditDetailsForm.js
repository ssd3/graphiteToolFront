import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import {DataTable} from 'primereact/components/datatable/DataTable'
import {Column} from 'primereact/components/column/Column'
import {inject, observer} from 'mobx-react'
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Button} from 'primereact/components/button/Button'
import FormatBold from '../common/FormatBold'
import {ColumnGroup} from 'primereact/columngroup'
import {Row} from 'primereact/row'

@inject('rootStore')
@observer
class CreditDetailsForm extends Component {
    constructor(props) {
        super(props)
    }

    onDeleteRow = rowData => {
        this.props.rootStore.creditStore.removeLocalCreditDetail(rowData.productid)
    }

    deleteRowTemplate = (rowData, column) => {
        return (
            <div style={{padding: '0.5em'}}>
                <Button onClick={() => this.onDeleteRow(rowData)}
                        icon="pi pi-minus" className="p-button-secondary" tooltip="Delete Row" />
            </div>
        )
    }

    formatBold = (rowData, column) => {
        return <FormatBold rowData={rowData} column={column} />
    }

    onEditorValueChange = (props, value) => {
        const updatedCreditDetail = [...props.value]
        updatedCreditDetail[props.rowIndex][props.field] = value
        this.props.rootStore.creditStore.updateLocalCreditDetails(updatedCreditDetail)
    }

    creditNumberEditor = (props) => {
        return <InputText type="text" value={+props.rowData[props.field]}
                          onChange={(e) => this.onEditorValueChange(props, +e.target.value)}
                          required={true}
                          keyfilter="num" />
    }

    render() {
        const { newCredit,
                creditDetailsSum = 0,
                creditDetailsCount = 0,
                creditDetailsIncomeSum = 0
              } = this.props.rootStore.creditStore

        const footerColumnGroup =
            <ColumnGroup>
                <Row>
                    <Column footer="Totals:" colSpan={6} />
                    <Column footer="" />
                    <Column footer="" />
                    <Column footer="" />
                    <Column footer="" />
                    <Column footer={creditDetailsCount} />
                    <Column footer={creditDetailsSum} />
                    <Column footer={creditDetailsIncomeSum} />
                    <Column footer="" />
                </Row>
            </ColumnGroup>

        return (
            <Panel header="Credit products">
                <div className="p-grid p-fluid">
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-12">
                            <ScrollPanel style={{width: '100%', height: '40vh'}}>
                                <DataTable value={newCredit.creditdetails}
                                           reorderableColumns={true}
                                           resizableColumns={true}
                                           editable={true}
                                           autoLayout={true}
                                           footerColumnGroup={footerColumnGroup}>
                                    <Column field="productid" header="ID" />
                                    <Column field="title" header="Product" />
                                    <Column field="debitprice" header="Debit price" />
                                    <Column field="debitavailableqty" header="Debit available qty" />
                                    <Column field="debitpricetype" header="Debit price type" />
                                    <Column field="discount" header="Discount" />
                                    <Column field="discountprice" header="Discount price" body={this.formatBold} />
                                    <Column field="debitrowsum" header="Debit row sum" />
                                    <Column field="creditprice" header="Credit price" editor={this.creditNumberEditor} />
                                    <Column field="creditpricetype" header="Credit price type" />
                                    <Column field="creditqty" header="Credit qty" editor={this.creditNumberEditor} />
                                    <Column field="creditrowsum" header="Credit row sum" />
                                    <Column field="creditrowincome" header="Income row" body={this.formatBold} />
                                    <Column style={{width: '35px'}} body={this.deleteRowTemplate} />
                                </DataTable>
                            </ScrollPanel>
                        </div>
                    </div>
                </div>
            </Panel>
        )
    }
}

export default CreditDetailsForm
