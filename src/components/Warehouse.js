import React, {Component} from 'react'
import {Growl} from 'primereact/growl'
import {HttpClient} from "./httpClient/client";
import WarehouseQueries from "./queries/WarehouseQueries";

export class Warehouse extends Component {

    constructor(props){
        super(props);

        this.state = {
            warehouses: [],
        };
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

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <select name="warehouses-list">
                        {this.state.warehouses.map(warehouse => (
                            <option key={warehouse.title} value={warehouse.title}>
                                {warehouse.title}
                            </option>
                        ))}
                    </select>
                </div>
                <Growl ref={(el) => this.growl = el} position='topleft' />
            </div>
        )
    }
}