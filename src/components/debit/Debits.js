import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Column} from 'primereact/column'
import {DataTable} from 'primereact/datatable'
import DebitDialog from './DebitDialog'
import debitFields from './DebitFields'
import DebitToolbar from './DebitToolbar'
import Progressbar from '../common/ProgressBar'
import formatDate from '../common/FormatDate'
import DebitRowTemplate from './DebitRowTemplate'
import statusColor from '../common/StatusColor'
import Pager from '../common/Pager'
import CreditSidebar from '../credit/CreditSidebar'
import FormatBold from '../common/FormatBold'

const expandedAllClass = 'p-row-toggler-icon pi pi-fw p-clickable pi-chevron-down'
const collapsedAllClass = 'p-row-toggler-icon pi pi-fw p-clickable pi-chevron-right'

@inject('rootStore')
@observer
export class Debits extends Component {
    constructor(props){
        super(props)

        this.saveCredit = this.saveCredit.bind(this)
    }

    componentDidMount(){
        this.props.pageTitle('Debit')
        this.props.rootStore.debitComplexStore.getDebits({searchText: ''})
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

    hideCreditSidebar = (e) => {
        this.props.rootStore.creditStore.showCreditSidebar(false)
    }

    saveCredit(e) {
        this.props.rootStore.creditStore.saveCredit()
    }

    hideDialog = (e) => {
        const { debitComplexStore } = this.props.rootStore
        debitComplexStore.debitDialogShow(false)
    }

    debitSearchInput = e => {
        const { debitComplexStore } = this.props.rootStore
        debitComplexStore.searchText = e.target.value.trim()
        if (debitComplexStore.searchText === '')
            debitComplexStore.getDebits({searchText: ''})
    }

    debitSearch = e => {
        const { debitComplexStore } = this.props.rootStore
        debitComplexStore.getDebits({searchText: debitComplexStore.searchText})
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            const { debitComplexStore } = this.props.rootStore
            this.debitSearch({searchText: debitComplexStore.searchText})
        }
    }

    addDebit = () => {
        // TODO: ???? how to set extra or options data in mox-react-form
        // debitFields.$('statusid').set('extra', this.props.rootStore.statusStore.all_statuses)
        // console.log(debitFields.$('statusid').get('extra'))
        debitFields.clear()
        debitFields.set('value', {
            qty: 0,
            price: 0,
            weight: 0,
            height: 0,
            width: 0,
            lenght: 0,
            warehouseid: '1',
            statusid: '1',
            pricetypeid: '1',
            discountid: '1',
            categoryid: '1'
        })

        const { rootStore } = this.props
        const { debitComplexStore } = rootStore

        const { categories,
                statuses,
                pricetypes,
                discounts,
                in_warehouses } = this.props.rootStore.listStore.getListData

        debitFields.statuses = statuses
        debitFields.pricetypes = pricetypes
        debitFields.discounts = discounts
        debitFields.in_warehouses = in_warehouses
        debitFields.categories = categories

        debitFields.store = debitComplexStore
        debitComplexStore.debitDialogShow(true)
    }

    addToCredit = () => {
        this.props.rootStore.creditStore.showCreditSidebar(true)
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

    resetAll = () => {
        const store = this.props.rootStore.debitComplexStore
        store.resetAll()
    }

    rowExpansionTemplate = (data) => {
        return  (
            <DebitRowTemplate data={data}/>
        )
    }

    pagerChange = e => {
        const store = this.props.rootStore.debitComplexStore
        store.pagerChange({ type: e.event })
    }

    pagerChangeRowsPerPage = e => {
        const store = this.props.rootStore.debitComplexStore
        store.pagerChange({ type: 'rowsPerPage', rowsPerPage: e.target.value })
    }

    statusColor = (rowData, column) => {
        return statusColor(rowData, column, 'status')
    }

    availableQty = (rowData, column) => {
        const qty = +rowData[column.field]
        if (qty <= 0)
            return <span style={{color: 'red'}}>{rowData[column.field]}</span>
        else
            return <FormatBold rowData={rowData} column={column} />
    }

    render() {
        const { loading,
                error,
                debits,
                selectedRows,
                expandedRows,
                isFilteredByColumns,
                isSortedByColumns,
                searchText,
                rowsPerPage,
                totalCount,
                isShowDebitDialog } = this.props.rootStore.debitComplexStore

        const { isCreditSidebar, newCredit } = this.props.rootStore.creditStore

        return (
            <div className="p-grid">
                {error && this.props.notify('error', error)}
                <Progressbar loading={loading}/>

                <div className="p-col-12">
                        <div>
                            <DebitToolbar onDebitSearch={this.debitSearch}
                                          onAddDebit={this.addDebit}
                                          onAddToCredit={this.addToCredit}
                                          isFilteredByColumns={isFilteredByColumns}
                                          onFilterColumns={this.filterColumns}
                                          isSortedByColumns={isSortedByColumns}
                                          onSortColumns={this.sortColumns}
                                          onReset={this.resetAll}
                                          searchText={searchText}
                                          onDebitSearchInput={this.debitSearchInput}
                                          onHandleKeyDown={this.handleKeyDown}
                                          selectedRows={selectedRows}
                                          creditDetails={newCredit.creditdetails}  />

                            <div className="vertical-space10" />

                            <DataTable value={debits}
                                       loading={loading}
                                       selection={selectedRows}
                                       onSelectionChange={this.selectionChange}
                                       sortMode="multiple"
                                       reorderableColumns={true}
                                       resizableColumns={true}
                                       scrollable={true}
                                       scrollHeight="65vh" /*should be calculated*/
                                       footer={this.displaySelection(selectedRows)}
                                       expandedRows={expandedRows}
                                       onRowToggle={this.rowToggle}
                                       rowExpansionTemplate={this.rowExpansionTemplate}
                                       onRowClick={this.rowClick}
                                       selectionMode="multiple">
                                <Column header={<span className={ expandedRows.length > 0 ? expandedAllClass : collapsedAllClass } onClick={this.rowsToggleAll} />}
                                        expander={true}
                                        style={{cursor: 'pointer', width: '3em'}}/>
                                <Column field="product.productid" header="ID" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="tracknumber" header="Track number" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="warehouse.title" header="Warehouse" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="product.title" header="Product" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="product.category.title" header="Category" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="qty" header="Qty" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="price" header="Price" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="pricetype.title" header="Price type" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="discount.title" header="Discount" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}}  />
                                <Column field="availableqty" header="Available Qty" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}} body={this.availableQty} />
                                <Column field="status.title" header="Status" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}} body={this.statusColor}  />
                                <Column field="user.username" header="Supplier" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}} />
                                <Column field="created" header="Created" sortable={isSortedByColumns} filter={isFilteredByColumns} headerStyle={{overflow:'visible'}} body={formatDate}  />
                                <Column selectionMode="multiple" style={{ width:'3em'}} />
                            </DataTable>

                            {totalCount &&
                                <Pager firstPage={1}
                                       totalCount={totalCount}
                                       rowsPerPage={rowsPerPage}
                                       rowsPerPageList={[5,10,20,50,100]}
                                       realRowsCount={debits.length}
                                       onPagerChange={this.pagerChange}
                                       onPagerChangeRowsPerPage={this.pagerChangeRowsPerPage} /> }
                        </div>
                </div>

                <CreditSidebar isCreditSidebar={isCreditSidebar}
                               onSaveCredit={this.saveCredit}
                               onHideCreditSidebar={this.hideCreditSidebar}/>

                <DebitDialog form={debitFields}
                             isShowDebit={isShowDebitDialog}
                             title={'Add Product'}
                             hideDialog={this.hideDialog} />

            </div>
        )
    }
}

/*
                                <Column field="year" header="Year" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<InputText style={{width: '100%'}} onInput={this.onYearChange} />} />
                                <Column field="brand" header="Brand" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<Dropdown appendTo={document.body} style={{width: '100%'}} value={this.state.brand} options={this.state.brands} onChange={this.onBrandChange}/>} />
                                <Column field="color" header="Color" sortable={true} filter={true} headerStyle={{overflow:'visible'}} filterElement={<MultiSelect appendTo={document.body} style={{width:'100%'}} value={this.state.color} options={this.state.colors} onChange={this.onColorChange}/>} />
*/
