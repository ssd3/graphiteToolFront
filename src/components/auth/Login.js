import React, {Component, Fragment} from 'react'
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/inputtext'
import {Password} from 'primereact/password'
import AuthService from '../../services/authService'
import {Redirect} from 'react-router'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isAuth: false,
            error: null
        }
        this.authService = new AuthService()
    }

    onLogin = () => {
        try {
            this.authService.tokenAuth(this.state.username, this.state.password)
                .then(({ data }) => {
                    if (data.result.token !== null) {
                        localStorage.setItem('token', data.result.token)
                        this.setState({isAuth: true})
                        window.location.reload()
                    }
                    else {
                        localStorage.removeItem('token')
                        this.setState({error: 'Auth Error'})
                    }
                })
                .catch(error => {
                    this.setState({error: error.message})
                })
        } catch (e) {
            this.setState({error: e.message})
        }
    }

    render() {
        const { isAuth, error } = this.state
        const footer = (
            <div>
                <Button label="Login" icon="pi pi-check" onClick={this.onLogin} />
            </div>
        )

        return (
            isAuth ? (<Redirect to="/" />)
                : (
                    <Fragment>
                        <Dialog header="Login" footer={footer} visible={true} style={{width: '20vw'}} modal={true} onHide={this.onLogin}>
                        { this.state.error && <div style={{color: 'red'}}>{error}</div> }
                        <h3 className="login-h3">Username</h3>
                        <InputText onChange={(e) => { this.setState({ username: e.target.value }) }} />
                        <h3 className="login-h3">Password</h3>
                        <Password feedback={false} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        </Dialog>
                    </Fragment>
            )
        )
    }
}
