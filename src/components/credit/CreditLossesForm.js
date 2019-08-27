import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {Panel} from 'primereact/components/panel/Panel'
import {Button} from 'primereact/components/button/Button'
import {DataTable} from 'primereact/components/datatable/DataTable'
import {Column} from 'primereact/components/column/Column'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Dropdown} from 'primereact/dropdown'
import {ScrollPanel} from 'primereact/scrollpanel'

@inject('rootStore')
@observer
class CreditLossesForm extends Component {
    constructor(props) {
        super(props)

        this.lossTypeEditor = this.lossTypeEditor.bind(this)
        this.lossTypeTemplate = this.lossTypeTemplate.bind(this)
        this.deleteRowTemplate = this.deleteRowTemplate.bind(this)
        this.rateEditor = this.rateEditor.bind(this)
        this.notesEditor = this.notesEditor.bind(this)
    }

    creditLossAddRow = e => {
        this.props.rootStore.creditStore.addLocalCreditLoss({
            creditid: '-1',
            losstypeid: '1',
            rate: 0,
            notes: ''
        })
    }

    onEditorValueChange(props, value) {
        let updatedCreditLoss = [...props.value]
        updatedCreditLoss[props.rowIndex][props.field] = value
        this.props.rootStore.creditStore.updateLocalCreditLoss(updatedCreditLoss)
    }

    lossTypeEditor(props) {
        const { losstypes } = this.props.rootStore.listStore.getListData
        return (
            <Dropdown options={losstypes}
                      value={props.value[props.rowIndex].losstypeid}
                      onChange={(e) => this.onEditorValueChange(props, e.value)}
                      placeholder="Select a loss type" />
        )
    }

    rateEditor(props) {
        return <InputText type="text" value={props.rowData.rate}
                          onChange={(e) => this.onEditorValueChange(props, e.target.value)}
                          required={true}
                          keyfilter="num" />
    }

    notesEditor(props) {
        return <InputText type="text" value={props.rowData.notes}
                          onChange={(e) => this.onEditorValueChange(props, e.target.value)} />
    }

    lossTypeTemplate(rowData, column) {
        const { losstypes } = this.props.rootStore.listStore.getListData
        return (
            <Dropdown options={losstypes}
                      value={rowData.losstypeid}
                      placeholder="Select a loss type" />
        )
    }

    onDeleteRow(rowData) {
        this.props.rootStore.creditStore.removeLocalCreditLoss(rowData.creditlossid)
    }

    deleteRowTemplate(rowData, column) {
        return (
            <div style={{padding: '0.5em'}}>
                <Button onClick={() => this.onDeleteRow(rowData)}
                        icon="pi pi-minus" className="p-button-secondary" tooltip="Delete Row" />
            </div>
        )
    }

    render() {
        const { newCredit, creditLossSum } = this.props.rootStore.creditStore

        return (
                <Panel header="Credit losses">
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <div className="p-toolbar-group-left" style={{paddingTop: '5px'}}>
                                <Button label="Add loss"
                                        icon="pi pi-plus"
                                        className="p-button-secondary"
                                        onClick={this.creditLossAddRow} />
                            </div>
                        </div>
                        <div className="p-md-6">
                            <div className="p-toolbar-group-right" style={{paddingTop: '5px'}}>
                                <InputText value={`Total: ${creditLossSum}`} disabled={true} style={{opacity: 1}} />
                            </div>
                        </div>
                        <div className="vertical-space10" />
                        <div className="p-md-12">
                            <ScrollPanel style={{width: '100%', height: '33vh'}}>
                                <DataTable value={newCredit.creditlosses}
                                           editable={true}
                                           autoLayout={true}>
                                    <Column field="losstypeid"
                                            header="Loss type"
                                            editor={this.lossTypeEditor}
                                            body={this.lossTypeTemplate} />
                                    <Column field="rate"
                                            header="Rate"
                                            editor={this.rateEditor} />
                                    <Column field="notes"
                                            header="Notes"
                                            editor={this.notesEditor} />
                                    <Column style={{width: '35px'}} body={this.deleteRowTemplate} />
                                </DataTable>
                            </ScrollPanel>
                        </div>
                    <input type="hidden" id="creditid" value={newCredit.creditid} />
                </div>
                </Panel>
        )
    }
}

export default CreditLossesForm
