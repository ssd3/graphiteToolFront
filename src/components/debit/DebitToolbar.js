import React from 'react'
import PropTypes from 'prop-types'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Button} from 'primereact/components/button/Button'
import {Toolbar} from 'primereact/toolbar'
import {ToggleButton} from 'primereact/togglebutton'

const DebitToolbar = (props) => {
    return (
        <Toolbar>
            <div className="p-toolbar-group-left">
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
                <InputText type="search" onInput={props.onDebitSearch} placeholder="Search" size="30" style={{marginRight: '.25em'}}/>
            </div>
            <div className="p-toolbar-group-right" style={{display: 'flex'}}>
                <Button label="Add Product" icon="pi pi-plus" className="p-button-secondary" onClick={props.onAddDebit} />
                <Button label="Add To Box" icon="pi pi-plus" className="p-button-secondary" onClick={props.onAddToBox} />
                <Button label="Change Status" icon="pi pi-check" className="p-button-secondary" />
                <ToggleButton style={{width:'150px'}} onLabel="Columns Filter On" offLabel="Columns Filter Off" onIcon="pi pi-check" offIcon="pi pi-times"
                              checked={props.isFilteredByColumns} onChange={props.onFilterColumns} />
                <ToggleButton style={{width:'150px'}} onLabel="Columns Sort On" offLabel="Columns Sort Off" onIcon="pi pi-check" offIcon="pi pi-times"
                              checked={props.isSortedByColumns} onChange={props.onSortColumns} />
                <Button label="Clear Filters" className="p-button-secondary" tooltipOptions={{position: 'left'}} />
            </div>
        </Toolbar>
    )
}

DebitToolbar.propTypes = {
    onDebitSearch: PropTypes.func.isRequired,
    onAddDebit: PropTypes.func.isRequired,
    onAddToBox: PropTypes.func.isRequired,
    onFilterColumns: PropTypes.func.isRequired,
    isFilteredByColumns: PropTypes.bool.isRequired,
    onSortColumns: PropTypes.func.isRequired,
    isSortedByColumns: PropTypes.bool.isRequired
}

export default DebitToolbar
