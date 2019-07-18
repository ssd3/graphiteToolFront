import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import classNames from 'classnames'
import {AppTopbar} from './components/AppTopbar'
import {AppMenu} from './components/AppMenu'
import {AppInlineProfile} from './components/AppInlineProfile'
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel'

import {Dashboard} from './components/Dashboard'
import {Debits} from './components/Debits'

import {EmptyPage} from './components/EmptyPage'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import './styles/layout.css'
import './styles/App.css'
import PropTypes from 'prop-types'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        }

        this.onWrapperClick = this.onWrapperClick.bind(this)
        this.onToggleMenu = this.onToggleMenu.bind(this)
        this.onSidebarClick = this.onSidebarClick.bind(this)
        this.onMenuItemClick = this.onMenuItemClick.bind(this)
        this.createMenu()
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }

        this.menuClick = false
    }

    onToggleMenu(event) {
        this.menuClick = true

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                })
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                })
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive
            this.setState({
                mobileMenuActive: !mobileMenuActive
            })
        }
       
        event.preventDefault()
    }

    onSidebarClick(event) {
        this.menuClick = true
        setTimeout(() => {this.layoutMenuScroller.moveBar() }, 500)
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-star-o', command: () => {window.location = '#/'}},
            {label: 'Debits', icon: 'pi pi-fw pi-sign-in', to: '/debits'},
            {label: 'Credits', icon: 'pi pi-fw pi-sign-out', to: '/credits'},
            {label: 'Balance', icon: 'pi pi-fw pi-dollar', to: '/balance'},
            {
                label: 'Dictionaries', icon: 'pi pi-fw pi-th-large',
                items: [
                    {label: 'Categories', icon: 'pi pi-fw pi-tags', to: '/categories'},
                    {label: 'Losses Type', icon: 'pi pi-fw pi-minus', to: '/losses_type'},
                    {label: 'Discounts', icon: 'pi pi-fw pi-angle-double-down', to: '/discounts'},
                    {label: 'Price Type', icon: 'pi pi-fw pi-briefcase', to: '/price_type'},
                    {label: 'Status', icon: 'pi pi-fw pi-lock', to: '/status'},
                    {label: 'Warehouse', icon: 'pi pi-fw pi-home', to: '/warehouse'},
                    {label: 'Products', icon: 'pi pi-fw pi-shopping-cart', to: '/products'}
                ]
            }
        ]
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className)
        else
            element.className += ' ' + className
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className)
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }

    isDesktop() {
        return window.innerWidth > 1024
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden')
        else
            this.removeClass(document.body, 'body-overflow-hidden')
    }

    render() {
        let logo = this.state.layoutColorMode === 'dark' ? 'public/images/logo-white.svg': 'public/images/logo.svg'

        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        })
        let sidebarClassName = classNames('layout-sidebar', {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'})

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>

                <AppTopbar onToggleMenu={this.onToggleMenu} selectedItem={this.state.selectedItem}/>

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>

                    <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height:'100%'}}>
                        <div className="layout-sidebar-scroll-content" >
                            <div className="layout-logo" style={{display: 'none'}}>
                                <img alt="Logo" src={logo} />
                            </div>
                            <AppInlineProfile />
                            <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                        </div>
                    </ScrollPanel>
                </div>

                <div className="layout-main">
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/debits" exact render={props => <Debits {...props} apolloClient={this.props.apolloClient} />} />
                    <Route path="/empty" component={EmptyPage} />
                </div>

                <div className="layout-mask"></div>
            </div>
        )
    }

    static propTypes = {
        apolloClient: PropTypes.object.isRequired
    }
}

export default App
