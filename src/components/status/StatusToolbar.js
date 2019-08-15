import React from 'react'
import PropTypes from 'prop-types'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Button} from 'primereact/components/button/Button'
import {Toolbar} from 'primereact/components/toolbar/Toolbar'

const StatusToolbar = (props) => {
    return (
        <Toolbar>
            <div className="p-toolbar-group-left">
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}} />
                <InputText type="search" onInput={props.onSearch} defaultValue={props.searchExpr} placeholder="Search" size="30" style={{marginRight: '.25em'}}/>
            </div>
            <div className="p-toolbar-group-right" style={{display: 'flex'}}>
                <Button label="Add Status" icon="pi pi-plus" className="p-button-secondary" onClick={props.onAddStatus} />
            </div>
        </Toolbar>
    )
}

StatusToolbar.propTypes = {
    searchExpr: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    onAddStatus: PropTypes.func.isRequired
}

export default StatusToolbar
