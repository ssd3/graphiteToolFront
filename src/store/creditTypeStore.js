import {autorun, computed, observable} from 'mobx'
import CreditTypeService from '../services/creditTypeService'

export default class CreditTypeStore {
    @observable loading = false
    @observable credittypes = []
    @observable all_credittypes = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.creditTypeService = new CreditTypeService()
        autorun(() => {
            this.getCreditTypesList
        })
    }

    @computed get getCreditTypes() {
        try {
            this.loading = true
            this.creditTypeService.getCreditTypes()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.credittypes = data.credittypes
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

    @computed get getCreditTypesList() {
        try {
            this.loading = true
            this.creditTypeService.getCreditTypesList()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.all_credittypes = data.credittypes
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
