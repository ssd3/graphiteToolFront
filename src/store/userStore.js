import {autorun, computed, observable} from 'mobx'
import UserService from '../services/userService'

export default class UserStore {
    @observable loading = false
    @observable staffs = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.userService = new UserService()
        autorun(() => {
            this.getStaffsList
        })
    }

    @computed get getStaffsList() {
        try {
            this.loading = true
            this.userService.getStaffsList()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.staffs = data.staffs
                })
                .catch(error => {
                    this.error = error.message
                })
                .finally(() => {
                    this.loading = false
                })
        } catch (e) {
            this.error = e.message
        }
    }
}
