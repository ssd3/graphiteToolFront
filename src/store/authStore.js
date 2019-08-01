import {action, autorun, computed, observable} from 'mobx'
import AuthService from '../services/authService'

export default class AuthStore {
    @observable loading = false
    @observable token = null
    @observable error = ''

    constructor(rootStore){
        this.rootStore = rootStore
        this.authService = new AuthService()
        autorun(() => { this.isAuth })
    }

    @computed get isAuth() {
        this.token = localStorage.getItem('token')
        return !(this.token === null || this.token === undefined)
    }

    @action login(username, password) {
        try {
            this.authService.tokenAuth(username, password)
                .then(({ loading, data }) => {
                    this.loading = loading
                    if (data.result.token !== null) {
                        this.token = data.result.token
                        localStorage.setItem('token', this.token)
                    }
                    else {
                        localStorage.removeItem('token')
                        this.token = null
                        this.error = 'Auth Error'
                    }
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }

    @action verifyToken(token) {
        try {
            this.authService.verifyToken(token)
                .then(({ loading, data }) => {
                    this.loading = loading
                    if (data.result.token) {
                        this.token = data.result.token
                        localStorage.setItem('token', this.token)
                    }
                    else {
                        localStorage.removeItem('token')
                        this.token = null
                        this.error = 'Auth Error'
                    }
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }

    @action logout(){
        localStorage.removeItem('token')
    }
}
