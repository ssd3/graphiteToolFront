import React from 'react'
import PropTypes from 'prop-types'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Button} from 'primereact/components/button/Button'
import {Toolbar} from 'primereact/toolbar'

const DebitToolbar = (props) => {
    return (
        <Toolbar>
            <div className="p-toolbar-group-left">
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
                <InputText type="search" onInput={props.onDebitSearch} placeholder="Search" size="30" style={{marginRight: '.25em'}}/>
            </div>
            <div className="p-toolbar-group-right" style={{display: 'flex'}}>
                <Button label="Add Product" icon="pi pi-plus" className="p-button-secondary" onClick={props.onAddProduct} />
                <Button label="Add To Box" icon="pi pi-plus" className="p-button-secondary" onClick={props.onAddToBox} />
                <Button label="Change Status" icon="pi pi-check" className="p-button-secondary" />
                <Button label="Clear Filters" className="p-button-secondary" tooltipOptions={{position: 'left'}} />
            </div>
        </Toolbar>
    )
}

DebitToolbar.propTypes = {
    onDebitSearch: PropTypes.func.isRequired,
    onAddProduct: PropTypes.func.isRequired,
    onAddToBox: PropTypes.func.isRequired
}

export default DebitToolbar
