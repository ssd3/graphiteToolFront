import {observable, action, computed} from 'mobx'
import StatusService from '../services/statusService'
import _ from 'lodash'

export default class StatusStore {
    @observable loading = false
    @observable statuses = []
    @observable status = {}
    @observable selectedStatus = {}
    @observable isShowDialog = false
    @observable title = ''
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

    @action saveStatus(status) {
        try {
            this.loading = true
            this.statusService.saveStatus(status)
                .then(({ data }) => {
                    const idx = _.findIndex(this.statuses, { statusid: data.result.status.statusid })
                    if (idx === -1)
                        this.statuses.push(data.result.status)
                    else
                        this.statuses[idx] = data.result.status
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

    @action selectStatus(status) {
        this.selectedStatus = status
    }


    @action showDialog(isShowDialog, title = '') {
        this.isShowDialog = isShowDialog
        this.title = title
    }

    @action showErrors(errors) {
        const _errors = []
        for (let error in errors) {
            if (errors[error] !== null) {
                _errors.push(errors[error])
            }
        }
        this.error = _errors.join('\n')
    }

    @action clearErrors() {
        this.error = ''
    }
}
