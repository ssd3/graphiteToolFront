import React, {Component} from 'react'

import {Growl} from 'primereact/growl'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Checkbox} from 'primereact/checkbox'
import {ProgressBar} from "primereact/progressbar";

import {HttpClient} from "./httpClient/client";
import WarehouseQueries from "./queries/WarehouseQueries";

export class Warehouse extends Component {

    constructor(props){
        super(props);
        this.state = {
            warehouses: [],
            dataLoading: true
        };
        this.renderCheckBox = this.renderCheckBox.bind(this);
    }

    componentDidMount () {
        HttpClient.getData(WarehouseQueries.GET_WAREHOUSES, {/*variables object here*/})
            .then(result => {
                const { loading, error, data } = result;
                this.setState({
                    dataLoading: loading,
                    warehouses: data.warehouses
                });
                if (error) {
                    this.growl.show({severity: 'error', summary: 'Error Message', detail: JSON.stringify(error) })
                } else {
                    this.growl.show({severity: 'success', summary: 'Success Message', detail: JSON.stringify(data) })
                    console.log('data', data)
                }
            })
            .catch(e => console.log(e))
        this.props.pageTitle('Warehouse')
    }

    renderCheckBox(rowData, column) {
        const whProperty = rowData[column.field]; // active, in, out
        return <div>
            <Checkbox checked={whProperty}></Checkbox>
        </div>;
    }

    render(){
        const dataLoading  = this.state.dataLoading;

        return (
            <div className="p-grid">
                {dataLoading &&
                    <div className="p-col-12-1px">
                        <ProgressBar mode="indeterminate" style={{height: '1px'}} />
                    </div>
                }
                <DataTable value={this.state.warehouses}>
                    <Column field="title" header="Title" />
                    <Column field="description" header="Description" />
                    <Column body={this.renderCheckBox} header="Active" field="active"/>
                    <Column field="created" header="Created" />
                    <Column body={this.renderCheckBox} header="In" field="inField"/>
                    <Column body={this.renderCheckBox} header="Out" field="out"/>
                </DataTable>
                <Growl ref={(el) => this.growl = el} position='topleft' />
            </div>
        );
    }
}