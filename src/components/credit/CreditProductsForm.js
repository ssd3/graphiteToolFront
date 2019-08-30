import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import {DataTable} from 'primereact/components/datatable/DataTable'
import {Column} from 'primereact/components/column/Column'
import {inject, observer} from 'mobx-react'
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Button} from 'primereact/components/button/Button'

@inject('rootStore')
@observer
class CreditProductsForm extends Component {
    constructor(props) {
        super(props)
    }

    onDeleteRow = rowData => {
        this.props.rootStore.creditStore.removeLocalCreditProduct(rowData.productid)
    }

    deleteRowTemplate = (rowData, column) => {
        return (
            <div style={{padding: '0.5em'}}>
                <Button onClick={() => this.onDeleteRow(rowData)}
                        icon="pi pi-minus" className="p-button-secondary" tooltip="Delete Row" />
            </div>
        )
    }

    render() {
        const { newCredit,
                creditProductsSum = 0,
                creditProductsCount = 0
              } = this.props.rootStore.creditStore
        return (
            <Panel header="Credit products">
                <div className="p-grid p-fluid">
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <div className="p-toolbar-group-left" style={{paddingTop: '5px'}}>
                                <InputText value={`Products count: ${creditProductsCount}`} disabled={true} style={{opacity: 1}} />
                            </div>
                        </div>
                        <div className="p-md-6">
                            <div className="p-toolbar-group-right" style={{paddingTop: '5px'}}>
                                <InputText value={`Total: ${creditProductsSum}`} disabled={true} style={{opacity: 1}} />
                            </div>
                        </div>
                        <div className="vertical-space10" />
                        <div className="p-md-12">
                            <ScrollPanel style={{width: '100%', height: '47vh'}}>
                                <DataTable value={newCredit.creditProducts}
                                           reorderableColumns={true}
                                           resizableColumns={true}
                                           editable={true}
                                           autoLayout={true}>
                                    <Column field="productid" header="ID" />
                                    <Column field="title" header="Product" />
                                    <Column field="debitprice" header="Debit price" />
                                    <Column field="debitpricetype" header="Debit price type" />
                                    <Column field="discount" header="Discount" />
                                    <Column field="debitrowsum" header="Debit sum" />
                                    <Column field="debitqty" header="Debit qty" />
                                    <Column field="creditprice" header="Credit price" />
                                    <Column field="creditpricetype" header="Credit price type" />
                                    <Column field="creditqty" header="Credit qty" />
                                    <Column field="creditrowsum" header="Credit sum" />
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

export default CreditProductsForm
