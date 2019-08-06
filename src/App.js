import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import classNames from 'classnames'
import {AppTopbar} from './components/AppTopbar'
import {AppMenu} from './components/AppMenu'
import {AppInlineProfile} from './components/AppInlineProfile'
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel'

import {Dashboard} from './components/Dashboard'
import {Debits} from './components/Debits'
import {Credits} from './components/Credits'
import {Balance} from './components/Balance'
import {Warehouse} from './components/Warehouse'
import {EmptyPage} from './components/EmptyPage'
import Status from './components/status/Status'
import Login from './components/auth/Login'

import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import './styles/layout.css'
import './styles/App.css'
import {inject, observer} from 'mobx-react'
import {PrivateRoute} from './components/PrivateRoute'
import {Switch} from 'react-router'
import Logout from './components/auth/Logout'

@inject('rootStore')
@observer
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            pageTitle: 'Dashboard'
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

    pageTitle = (value) => {
        this.setState({ pageTitle: value})
    }

    // https://www.npmjs.com/package/react-toastify#demo
    notify = (type, message) => {
        const options = {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            newestOnTop: true
        }

        if (type === 'success') {
            toast.success(message, options)
        }

        if(type === 'error') {
            toast.error(message, options)
        }

        if(type === 'warn') {
            toast.warn(message, options)
        }

        if(type === 'info') {
            toast.info(message, options)
        }
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

        const isAuth = this.props.rootStore.authStore.token

        return (
            isAuth ? (
                <div className={wrapperClass} onClick={this.onWrapperClick}>

                    <AppTopbar
                        onToggleMenu={this.onToggleMenu}
                        selectedItem={this.state.selectedItem}
                        pageTitle={this.state.pageTitle}
                    />

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
                        <Switch>
                            <Route path="/login" exact component={Login} notify={this.notify} />
                            <PrivateRoute path="/" exact component={Dashboard} pageTitle={this.pageTitle} />
                            <PrivateRoute path="/debits" exact component={Debits} pageTitle={this.pageTitle} />
                            <PrivateRoute path="/credits" exact component={Credits} pageTitle={this.pageTitle} />
                            <PrivateRoute path="/balance" exact component={Balance} pageTitle={this.pageTitle} />
                            <PrivateRoute path="/warehouse" exact component={Warehouse} pageTitle={this.pageTitle} />
                            <PrivateRoute path="/status" exact component={Status} pageTitle={this.pageTitle} notify={this.notify} />
                            <PrivateRoute path="/logout" exact component={Logout} />
                            <Route path="/empty" component={EmptyPage} />
                        </Switch>
                    </div>
                    <ToastContainer />
                    <div className="layout-mask"/>
                </div> ) : (
                    <Login/>
            )
        )
    }

    static propTypes = {
        pageTitle: PropTypes.func,
        notify: PropTypes.func
    }
}

export default App
