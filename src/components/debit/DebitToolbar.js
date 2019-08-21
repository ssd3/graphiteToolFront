import React from 'react'
import PropTypes from 'prop-types'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Button} from 'primereact/components/button/Button'
import {Toolbar} from 'primereact/toolbar'
import {ToggleButton} from 'primereact/togglebutton'
import StatusChange from '../common/StatusChange'

const DebitToolbar = (props) => {
    return (
        <Toolbar>
            <div className="p-toolbar-group-left">
                <InputText type="search"
                           onInput={props.onDebitSearchInput}
                           placeholder="Search" size="30"
                           style={{marginRight: '.25em'}}
                           defaultValue={props.searchText}
                           onKeyDown={props.onHandleKeyDown}
                />
                <Button icon="pi pi-search" className="p-button-secondary" onClick={props.onDebitSearch} />
            </div>
            <div className="p-toolbar-group-right" style={{display: 'flex'}}>
                <Button label="Add Product" icon="pi pi-plus" className="p-button-secondary" onClick={props.onAddDebit} />
                <Button label="Add To Credit" icon="pi pi-plus"
                        className="p-button-secondary"
                        onClick={props.onAddToBox}
                        disabled={props.selectedRows.length === 0 }/>
                <StatusChange selectedRows={props.selectedRows} />
                <ToggleButton style={{width:'150px'}} onLabel="Columns Filter On" offLabel="Columns Filter Off" onIcon="pi pi-check" offIcon="pi pi-times"
                              checked={props.isFilteredByColumns} onChange={props.onFilterColumns} />
                <ToggleButton style={{width:'150px'}} onLabel="Columns Sort On" offLabel="Columns Sort Off" onIcon="pi pi-check" offIcon="pi pi-times"
                              checked={props.isSortedByColumns} onChange={props.onSortColumns} />
                <Button label="Reset" className="p-button-secondary" tooltipOptions={{position: 'left'}} onClick={props.onReset} />
            </div>
        </Toolbar>
    )
}

DebitToolbar.propTypes = {
    onHandleKeyDown: PropTypes.func.isRequired,
    onDebitSearchInput: PropTypes.func.isRequired,
    onDebitSearch: PropTypes.func.isRequired,
    onAddDebit: PropTypes.func.isRequired,
    onAddToBox: PropTypes.func.isRequired,
    onFilterColumns: PropTypes.func.isRequired,
    isFilteredByColumns: PropTypes.bool.isRequired,
    onSortColumns: PropTypes.func.isRequired,
    isSortedByColumns: PropTypes.bool.isRequired,
    onReset: PropTypes.func.isRequired,
    searchText: PropTypes.string,
    selectedRows: PropTypes.array.isRequired
}

export default DebitToolbar
