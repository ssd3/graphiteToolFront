import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Toolbar} from 'primereact/toolbar'
import {Button} from 'primereact/button'
import {Column} from 'primereact/column'
import {DataTable} from 'primereact/datatable'
import {InputText} from 'primereact/inputtext'
import {Dropdown} from 'primereact/dropdown'
import {MultiSelect} from 'primereact/multiselect'
import {Sidebar} from 'primereact/sidebar'
import {Growl} from 'primereact/growl'
import {Fieldset} from 'primereact/fieldset'
import {Dialog} from 'primereact/dialog'
import {ProgressBar} from 'primereact/progressbar'

// import {HttpClient} from './httpClient/client'
import {client} from '../httpClient/client'
import ProductQueries from '../queries/ProductQueries'


import Query from 'react-apollo/Query'
import {ProductsGet} from '../dal/products'

// option 1 - макароны 1
// этот компонент <Products /> вызывается ниже в методе render
// dropdownlist c списком продуктов
/*
const Products = ({ onProductSelected }) => (
    <Query query={ProductQueries.GET_PRODUCTS}>
        {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return `Error! ${error.message}`

            return (
                <select name="dog" onChange={onProductSelected}>
                    {data.products.data.map(result => (
                        <option key={result.product.productid} value={result.product.title}>
                            {result.product.title}
                        </option>
                    ))}
                </select>
            )
        }}
    </Query>
)
*/

export class Debits extends Component {
    constructor(props){
        super(props)

        this.state = {
            modalDialog: false,
            boxSidebar: false,
            cars: [
                {'brand': 'Volkswagen', 'year': 2012, 'color': 'White', 'vin': 'dsad231ff'},
                {'brand': 'Audi', 'year': 2011, 'color': 'Black', 'vin': 'gwregre345'},
                {'brand': 'Renault', 'year': 2005, 'color': 'Gray', 'vin': 'h354htr'},
                {'brand': 'BMW', 'year': 2003, 'color': 'Blue', 'vin': 'j6w54qgh'},
                {'brand': 'Mercedes', 'year': 1995, 'color': 'White', 'vin': 'hrtwy34'},
                {'brand': 'Volvo', 'year': 2005, 'color': 'Black', 'vin': 'jejtyj'},
                {'brand': 'Honda', 'year': 2012, 'color': 'Yellow', 'vin': 'g43gr'},
                {'brand': 'Jaguar', 'year': 2013, 'color': 'White', 'vin': 'greg34'},
                {'brand': 'Ford', 'year': 2000, 'color': 'Black', 'vin': 'h54hw5'},
                {'brand': 'Fiat', 'year': 2013, 'color': 'Red', 'vin': '245t2s'},
                {'brand': 'Volkswagen', 'year': 2012, 'color': 'White', 'vin': 'dsad231ff'},
                {'brand': 'Audi', 'year': 2011, 'color': 'Black', 'vin': 'gwregre345'},
                {'brand': 'Renault', 'year': 2005, 'color': 'Gray', 'vin': 'h354htr'},
                {'brand': 'BMW', 'year': 2003, 'color': 'Blue', 'vin': 'j6w54qgh'},
                {'brand': 'Mercedes', 'year': 1995, 'color': 'White', 'vin': 'hrtwy34'},
                {'brand': 'Volvo', 'year': 2005, 'color': 'Black', 'vin': 'jejtyj'},
                {'brand': 'Honda', 'year': 2012, 'color': 'Yellow', 'vin': 'g43gr'},
                {'brand': 'Jaguar', 'year': 2013, 'color': 'White', 'vin': 'greg34'},
                {'brand': 'Ford', 'year': 2000, 'color': 'Black', 'vin': 'h54hw5'},
                {'brand': 'Fiat', 'year': 2013, 'color': 'Red', 'vin': '245t2s'}
            ],
            brand: null,
            color: null,
            brands: [
                {label: 'All Brands', value: null},
                {label: 'Audi', value: 'Audi'},
                {label: 'BMW', value: 'BMW'},
                {label: 'Fiat', value: 'Fiat'},
                {label: 'Honda', value: 'Honda'},
                {label: 'Jaguar', value: 'Jaguar'},
                {label: 'Mercedes', value: 'Mercedes'},
                {label: 'Renault', value: 'Renault'},
                {label: 'VW', value: 'VW'},
                {label: 'Volvo', value: 'Volvo'}
            ],
            colors: [
                {label: 'White', value: 'White'},
                {label: 'Green', value: 'Green'},
                {label: 'Silver', value: 'Silver'},
                {label: 'Black', value: 'Black'},
                {label: 'Red', value: 'Red'},
                {label: 'Maroon', value: 'Maroon'},
                {label: 'Brown', value: 'Brown'},
                {label: 'Orange', value: 'Orange'},
                {label: 'Blue', value: 'Blue'}
            ],
            dataLoading: true
        }

        this.onYearChange = this.onYearChange.bind(this)
        this.onBrandChange = this.onBrandChange.bind(this)
        this.onColorChange = this.onColorChange.bind(this)
        this.onGlobalSearch = this.onGlobalSearch.bind(this)
        this.displayBoxSidebar = this.displayBoxSidebar.bind(this)
        this.hideBoxSidebar = this.hideBoxSidebar.bind(this)
        Debits.rowExpansionTemplate = Debits.rowExpansionTemplate.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.displayDialog = this.displayDialog.bind(this)

        this.dialogFooter = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.displayBoxSidebar} />
                <Button label="No" icon="pi pi-times" onClick={this.hideDialog} />
            </div>
        )
    }

    componentDidMount(){
        // apollo client usage
        // option 2 - макароны 2
        // этот вариант тоже макароны но интереснее
        // т.к. такой код можно вынести в отдельный модуль/уровень и вызвать например так
        // const products = await getProducts(page=1, filters={...} ...)
        // вывод результатов в console и в всплывающий popup
        /*
        HttpClient.getData(ProductQueries.GET_PRODUCTS, {})
            .then(result => {
                const { loading, error, data } = result
                this.setState({dataLoading: loading})
                if (error) {
                    this.growl.show({severity: 'error', summary: 'Error Message', detail: JSON.stringify(error) })
                } else {
                    this.growl.show({severity: 'success', summary: 'Success Message', detail: JSON.stringify(data) })
                    console.log('data', data)
                }
            })
            .catch(e => console.log(e))
         */
        // apollo client usage

        /*
        client.query({
            query: ProductQueries.GET_PRODUCTS,
            variables: {}
        })
            .then(result => {
                const { loading, data, networkStatus, stale } = result
                if (loading) this.setState({dataLoading: loading})
                return this.growl.show({severity: 'success', summary: 'Success Message', detail: JSON.stringify(data) })
            })
            .catch(errors => {
                this.setState({dataLoading: false})
                return this.growl.show({severity: 'error', summary: 'Error Message', detail: errors.message })
            })
        */
        this.props.pageTitle('Debit')

        console.log(this.props)
        ProductsGet()
            .then(results => {
                const { loading, data, networkStatus, stale } = results
                this.setState({dataLoading: loading})
                console.log('result', results)
            })
            .catch(errors => {
                this.setState({dataLoading: false})
                this.growl.show({severity: 'error', summary: 'Error Message', detail: errors.message })
            })
    }

    onYearChange(event) {
        // execute query
        this.dt.filter(event.target.value, 'year', 'contains')
        this.setState({year: event.target.value})
    }

    onBrandChange(event) {
        this.dt.filter(event.value, 'brand', 'equals')
        this.setState({brand: event.value})
    }

    onColorChange(event) {
        this.dt.filter(event.value, 'color', 'in')
        this.setState({color: event.value})
    }

    onGlobalSearch(event) {
        this.setState({globalFilter: event.target.value})
    }

    static displaySelection(data) {
        if(!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>No Selection</div>
        }
        else {
            if(data instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{data.map((car, i) => <li key={car.vin}>{car.vin + ' - ' + car.year + ' - ' + car.brand + ' - ' + car.color}</li>)}</ul>
            else
                return <div style={{textAlign: 'left'}}>Selected Car: {data.vin + ' - ' + data.year + ' - ' + data.brand + ' - ' + data.color}</div>
        }
    }

    displayBoxSidebar(event) {
        this.setState({
            boxSidebar: true
        })
    }

    hideBoxSidebar(event) {
        this.setState({
            boxSidebar: false
        })
    }

    displayDialog(event) {
        this.setState({
            modalDialog: true
        })
    }

    hideDialog(event) {
        this.setState({
            modalDialog: false
        })
    }

    static rowExpansionTemplate(data) {
        const src = 'public/images/' + data.brand + '.png'

        return  (
            <div className="p-grid p-fluid" style={{padding: '1em'}}>
                <div className="p-col-12 p-md-3" style={{textAlign:'center'}}>
                    <img src={src} alt={data.brand}/>
                </div>
                <div className="p-col-12 p-md-9">
                    <div className="p-grid">
                        <div className="p-md-2">Vin: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.vin}</div>

                        <div className="p-md-2">Year: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.year}</div>

                        <div className="p-md-2">Brand: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.brand}</div>

                        <div className="p-md-2">Color: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.color}</div>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        const { cars, dataLoading } = this.state
        return (
            <div className="p-grid">
                {dataLoading &&
                    <div className="p-col-12-1px">
                    <ProgressBar mode="indeterminate" style={{height: '1px'}} />
                    </div>
                }
                <div className="p-col-12">
                        <div>
                            <Toolbar>
                                <div className="p-toolbar-group-left">
                                    <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
                                    <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" style={{marginRight: '.25em'}}/>
                                </div>
                                <div className="p-toolbar-group-right" style={{display: 'flex'}}>
                                    <Button label="Add Product" icon="pi pi-plus" className="p-button-secondary" onClick={this.displayDialog} />
                                    <Button label="Add To Box" icon="pi pi-plus" className="p-button-secondary" onClick={this.displayBoxSidebar} />
                                    <Button label="Change Status" icon="pi pi-check" className="p-button-secondary" />
                                    <Button label="Clear Filters" className="p-button-secondary" tooltipOptions={{position: 'left'}} />
                                </div>
                            </Toolbar>

                            <div className="vertical-space10" />

                            <DataTable value={cars}
                                       globalFilter={this.state.globalFilter}
                                       ref={(el) => this.dt = el}
                                       selection={this.state.selectedRows}
                                       onSelectionChange={e => this.setState({selectedRows: e.value})}
                                       sortMode="multiple"
                                       reorderableColumns={true}
                                       resizableColumns={true}
                                       paginator={true}
                                       rows={20}
                                       rowsPerPageOptions={[5,10,15,20]}
                                       scrollable={true}
                                       scrollHeight="60vh" /*should be calculated*/
                                       footer={Debits.displaySelection(this.state.selectedRows)}
                                       expandedRows={this.state.expandedRows}
                                       onRowToggle={(e) => this.setState({expandedRows:e.data})}
                                       rowExpansionTemplate={Debits.rowExpansionTemplate}>
                                <Column expander={true} style={{width: '3em'}} />
                                <Column field="vin" header="Vin" sortable={true} filter={true} headerStyle={{overflow:'visible'}}  />
                                <Column field="year" header="Year" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<InputText style={{width: '100%'}} onInput={this.onYearChange} />} />
                                <Column field="brand" header="Brand" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<Dropdown appendTo={document.body} style={{width: '100%'}} value={this.state.brand} options={this.state.brands} onChange={this.onBrandChange}/>} />
                                <Column field="color" header="Color" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<MultiSelect appendTo={document.body} style={{width:'100%'}} value={this.state.color} options={this.state.colors} onChange={this.onColorChange}/>} />
                                <Column selectionMode="multiple" style={{ width:'3em'}} />
                            </DataTable>

                        </div>
                </div>

                <Sidebar
                    visible={this.state.boxSidebar}
                    position="right"
                    style={{width:'40em'}}
                    onHide={this.hideBoxSidebar}
                    dismissable={false}>
                    <Fieldset legend="Add To Box">
                        Form elements, DataTable etc
                    </Fieldset>

                </Sidebar>

                <Dialog
                    header="Header Text"
                    footer={this.dialogFooter}
                    visible={this.state.modalDialog}
                    style={{width: '50vw'}}
                    modal={true}
                    maximizable={true}
                    closeOnEscape={false}
                    onHide={this.hideDialog}>
                    <div style={{height: '50vh'}}>
                        Form elements, DataTable etc
                    </div>
                </Dialog>

                <Growl ref={(el) => this.growl = el} position='topleft' />
            </div>
        )
    }
}
