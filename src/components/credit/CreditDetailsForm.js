import React, {Component, Fragment} from 'react'
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
        return <InputText type="text" value={props.rowData[props.field]}
                          onChange={(e) => this.onEditorValueChange(props, e.target.value)}
                          required={true}
                          keyfilter="num" />
    }

    render() {
        const { credit,
                creditDetailsSum = 0,
                creditDetailsCount = 0,
                creditDetailsIncomeSum = 0,
                creditLossSum = 0
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
                    <Column footer={creditDetailsIncomeSum - creditLossSum} />
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
                                <DataTable value={credit.creditdetails}
                                           reorderableColumns={true}
                                           resizableColumns={true}
                                           editable={true}
                                           autoLayout={true}
                                           footerColumnGroup={footerColumnGroup}>
                                    <Column field="product.productid" header="ID" />
                                    <Column field="product.title" header="Product" />
                                    <Column field="debit.price" header="Debit price" />
                                    <Column field="debit.availableqty" header="Debit available qty" />
                                    <Column field="debit.pricetype.title" header="Debit price type" />
                                    <Column field="debit.discount.title" header="Discount" />
                                    <Column field="discountprice" header="Discount price" body={this.formatBold} />
                                    <Column field="debit.rowsum" header="Debit row sum" />
                                    <Column field="price" header="Credit price" editor={this.creditNumberEditor} />
                                    <Column field="pricetype.title" header="Credit price type" />
                                    <Column field="qty" header="Credit qty" editor={this.creditNumberEditor} />
                                    <Column field="rowsum" header="Credit row sum" />
                                    <Column field="rowincome" header="Income row" body={this.formatBold} />
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
