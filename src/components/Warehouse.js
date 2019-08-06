import React, {Component} from 'react'

import {Growl} from 'primereact/growl'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Checkbox} from 'primereact/checkbox'
import {ProgressBar} from 'primereact/progressbar'
import {InputText} from 'primereact/inputtext'

import {utility} from '../utils/common'
import {HttpClient} from '../httpClient/client'
import WarehouseQueries from '../queries/WarehouseQueries'
import {inject, observer} from 'mobx-react'

@inject('rootStore')
@observer
export class Warehouse extends Component {

    constructor(props){
        super(props)
        this.state = {
            warehouses: [],
            dataLoading: true
        }
        this.renderCheckBox = this.renderCheckBox.bind(this)
        this.titleEditor = this.titleEditor.bind(this)
        this.descriptionEditor = this.descriptionEditor.bind(this)
        this.updateWarehouse = this.updateWarehouse.bind(this)
    }

    componentDidMount () {
        this.props.rootStore.warehouseStore.getWarehouses({
            active: true
        })

        /*
        HttpClient.getData(WarehouseQueries.GET_WAREHOUSES)
            .then(result => {
                const { loading, error, data } = result
                let cleanData = utility.gqlQueryToCleanData(data)
                this.setState({
                    dataLoading: loading,
                    warehouses: cleanData
                })
                if (error) {
                    this.growl.show({severity: 'error', summary: 'Error Message', detail: JSON.stringify(error) })
                } else {
                    this.growl.show({severity: 'success', summary: 'Success Message', detail: JSON.stringify(data) })
                }
            })
            .catch(e => console.log(e))
        */
        this.props.pageTitle('Warehouse')
    }

    renderCheckBox(rowData, column) {
        const in_out_active = rowData[column.field] // active, in, out
        return <div>
            <Checkbox checked={in_out_active}></Checkbox>
        </div>
    }

    updateWarehouse(props){
        const warehouse = props.rowData
        HttpClient.postData(WarehouseQueries.UPDATE_WAREHOUSE, {'warehouseid': warehouse.warehouseid,
                                                                'title': warehouse.title,
                                                                'description': warehouse.description,
                                                                'active': warehouse.active,
                                                                'in_field': warehouse.inField,
                                                                'out': warehouse.out})
            .then(result =>{
                if(result.error)
                {
                    console.log('error updating')
                } else {
                    console.log('update success')
                }
            })
            .catch(e => console.log(e))
    }

    onEditorValueChange(props, value) {
        let updatedWarehouses = [...props.value]
        updatedWarehouses[props.rowIndex][props.field] = value
        this.setState({warehouses: updatedWarehouses})
    }

    inputTextEditor(props, field) {
        return <InputText type="text" value={props.rowData[field]}
                          onChange={(e) => this.onEditorValueChange(props, e.target.value)}
        />
    }

    titleEditor(props) {
        return this.inputTextEditor(props, 'title')
    }

    descriptionEditor(props) {
        return this.inputTextEditor(props, 'description')
    }

    render(){
        const { loading, warehouses } = this.props.rootStore.warehouseStore

        return (
            <div className="p-grid">
                {loading &&
                    <div className="p-col-12-1px">
                        <ProgressBar mode="indeterminate" style={{height: '1px'}} />
                    </div>
                }
                <DataTable value={warehouses} editable={true}>
                    <Column field="title" header="Title" editor={this.titleEditor} onEditorSubmit={this.updateWarehouse}/>
                    <Column field="description" header="Description" editor={this.descriptionEditor} onEditorSubmit={this.updateWarehouse}/>
                    <Column field="active" header="Active" body={this.renderCheckBox} onEditorSubmit={this.updateWarehouse}/>
                    <Column field="created" header="Created" />
                    <Column field="inField" header="In" body={this.renderCheckBox}  />
                    <Column field="out" header="Out" body={this.renderCheckBox}  />
                </DataTable>
                <Growl ref={(el) => this.growl = el} position='topleft' />
            </div>
        )
    }
}
