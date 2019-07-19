import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {InputText} from 'primereact/inputtext'

export class AppTopbar extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const { pageTitle, onToggleMenu } = this.props
        return (
            <div className="layout-topbar clearfix">
                <div className="pi p-toolbar-group-left">
                    <button className="p-link layout-menu-button" onClick={onToggleMenu}>
                        <span className="pi pi-bars"/>
                    </button>
                    <h1 className="page-title">{pageTitle}</h1>
                </div>
                <div className="layout-topbar-icons">
                    <span className="layout-topbar-search">
                        <InputText type="text" placeholder="Search" />
                        <span className="layout-topbar-search-icon pi pi-search"/>
                    </span>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">Settings</span>
                        <span className="layout-topbar-icon pi pi-cog"/>
                    </button>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </button>
                </div>
            </div>
        )
    }

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired,
        pageTitle: PropTypes.string
    }
}
