import {observable, action, computed, autorun} from 'mobx'
import StatusService from '../services/statusService'

export default class StatusStore {
    @observable loading = false
    @observable statuses = []

    @observable status = {}
    @observable error = ''

    constructor(rootStore){
        this.rootStore = rootStore
        this.statusService = new StatusService()
    }

    @computed get getStatuses() {
        try {
            this.statusService.getStatuses()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.statuses = data.statuses
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }

    getStatus(statusid) {
        try {
            this.statusService.getStatus(statusid)
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.status = data.status
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }

    @action createStatus(status) {
        try {
            this.statusService.createStatus(status)
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.statuses.push(data.result.status)
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }
}
