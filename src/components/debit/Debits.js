import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'primereact/button'
import {Column} from 'primereact/column'
import {DataTable} from 'primereact/datatable'
import {InputText} from 'primereact/inputtext'
import {Sidebar} from 'primereact/sidebar'
import {Growl} from 'primereact/growl'
import {Fieldset} from 'primereact/fieldset'
import {Dialog} from 'primereact/dialog'

import DebitDialog from './DebitDialog'
import debitFields from './DebitFields'
import DebitToolbar from './DebitToolbar'
import Progressbar from '../common/ProgressBar'
import formatDate from '../common/FormatDate'
import Pager from '../common/Pager'
import DebitRowTemplate from './DebitRowTemplate'


const expandedAllClass = 'p-row-toggler-icon pi pi-fw p-clickable pi-chevron-down'
const collapsedAllClass = 'p-row-toggler-icon pi pi-fw p-clickable pi-chevron-right'

@inject('rootStore')
@observer
export class Debits extends Component {
    constructor(props){
        super(props)

        this.state = {
            modalDialog: false,
            boxSidebar: false
        }

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
        this.props.rootStore.categoryStore.getCategories
        this.props.rootStore.debitComplexStore.getDebits({})
    }

    displaySelection = (data) => {
        if(!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>No Selection</div>
        }
        else {
            if(data instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{data.map((debit, i) => <li key={debit.debitid}>{debit.debitid + ' - ' + debit.product.title + ' - ' + debit.qty + ' - ' + debit.price}</li>)}</ul>
            else
                return <div style={{textAlign: 'left'}}>Selected Row: {data.debitid + ' - ' + data.product.title + ' - ' + data.qty + ' - ' + data.price}</div>
        }
    }

    displayBoxSidebar = (e) => {
        this.setState({
            boxSidebar: true
        })
    }

    hideBoxSidebar = (e) => {
        this.setState({
            boxSidebar: false
        })
    }

    hideDialog = (e) => {
        this.setState({
            modalDialog: false
        })
    }

    onDebitSearch = (e) => {
        this.setState({globalFilter: e.target.value})
    }

    addDebit = () => {
        this.setState({
            modalDialog: true
        })
    }

    addToBox = () => {
        this.setState({
            boxSidebar: true
        })
    }

    filterColumns = (e) => {
        this.props.rootStore.debitComplexStore.filterColumns(e.value)
    }

    sortColumns = (e) => {
        this.props.rootStore.debitComplexStore.sortColumns(e.value)
    }

    selectionChange = (e) => {
        const store = this.props.rootStore.debitComplexStore
        store.selectRows(e.value)
    }

    rowClick = (e) => {
        const store = this.props.rootStore.debitComplexStore
        store.selectRows(e.data)
    }

    rowToggle = (e) => {
        const store = this.props.rootStore.debitComplexStore
        store.expandRows(e.data)
    }

    rowsToggleAll = () => {
        const store = this.props.rootStore.debitComplexStore
        store.expandRows(store.expandedRows.length > 0 ? [] : store.debits)
    }

    clearAll = () => {
        const store = this.props.rootStore.debitComplexStore
        store.clearAll()
    }

    pageChange = (e) => {
        const store = this.props.rootStore.debitComplexStore
        store.pageChange(e)
    }

    rowExpansionTemplate = (data) => {
        return  (
            <DebitRowTemplate data={data}/>
        )
    }

    render() {
        const { loading,
                error,
                debits,
                selectedRows,
                expandedRows,
                isFilteredByColumns,
                isSortedByColumns,
                debitsPageInfo,
                pagerInfo } = this.props.rootStore.debitComplexStore

        return (
            <div className="p-grid">
                {error && this.props.notify('error', error)}
                <Progressbar loading={loading}/>

                <div className="p-col-12">
                        <div>
                            <DebitToolbar onDebitSearch={this.onDebitSearch}
                                          onAddDebit={this.addDebit}
                                          onAddToBox={this.addToBox}
                                          isFilteredByColumns={isFilteredByColumns}
                                          onFilterColumns={this.filterColumns}
                                          isSortedByColumns={isSortedByColumns}
                                          onSortColumns={this.sortColumns}
                                          onClear={this.clearAll}
                            />

                            <div className="vertical-space10" />

                            <DataTable value={debits}
                                       loading={loading}
                                       globalFilter={this.state.globalFilter}
                                       ref={(el) => this.dt = el}
                                       selection={selectedRows}
                                       onSelectionChange={this.selectionChange}
                                       sortMode="multiple"
                                       reorderableColumns={true}
                                       resizableColumns={true}
                                       paginator={true}
                                       rows={20}
                                       rowsPerPageOptions={[10,15,20,50,100]}
                                       scrollable={true}
                                       scrollHeight="60vh" /*should be calculated*/
                                       footer={this.displaySelection(selectedRows)}
                                       expandedRows={expandedRows}
                                       onRowToggle={this.rowToggle}
                                       rowExpansionTemplate={this.rowExpansionTemplate}
                                       onRowClick={this.rowClick}
                                       selectionMode="multiple">
                                <Column header={<span className={ expandedRows.length > 0 ? expandedAllClass : collapsedAllClass } onClick={this.rowsToggleAll} />}
                                        expander={true}
                                        style={{cursor: 'pointer', width: '3em'}}/>
                                <Column field="debitid" header="ID" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="tracknumber" header="Track number" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="warehouse.title" header="Warehouse" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="product.title" header="Product" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="product.category.title" header="Category" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="qty" header="Qty" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="price" header="Price" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="pricetype.title" header="Price type" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="discount.title" header="Discount" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="status.title" header="Status" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="created" header="Created" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}} body={formatDate}  />
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
                    <div>
                        <Fieldset key={'Product'} legend="Product" toggleable={false} >
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                        </Fieldset>

                        <div className="vertical-space10" />

                        <Fieldset key={'Product Details'} legend="Product Details" toggleable={false} >
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                        </Fieldset>

                        <div className="vertical-space10" />

                        <Fieldset key={'Product Comments'} legend="Product Comments" toggleable={true} >
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                            <InputText type="search" onInput={this.onGlobalSearch} placeholder="Search" size="30" />
                        </Fieldset>
                    </div>
                </Dialog>

                <Growl ref={(el) => this.growl = el} position='topleft' />
            </div>
        )
    }
}

/*
                                <Column field="year" header="Year" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<InputText style={{width: '100%'}} onInput={this.onYearChange} />} />
                                <Column field="brand" header="Brand" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<Dropdown appendTo={document.body} style={{width: '100%'}} value={this.state.brand} options={this.state.brands} onChange={this.onBrandChange}/>} />
                                <Column field="color" header="Color" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<MultiSelect appendTo={document.body} style={{width:'100%'}} value={this.state.color} options={this.state.colors} onChange={this.onColorChange}/>} />


                <DebitDialog form={debitFields} title={'title'} hideDialog={this.hideDialog} />

                            <Pager onPageChange={this.pageChange} pageInfo={debitsPageInfo} pagerInfo={pagerInfo}/>
*/
