import {autorun, computed, observable} from 'mobx'
import LossTypeService from '../services/lossTypeService'

export default class LossTypeStore {
    @observable loading = false
    @observable losstypes = []
    @observable all_losstypes = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.lossTypeService = new LossTypeService()
        autorun(() => {
            this.getLossTypesList
        })
    }

    @computed get getLossTypes() {
        try {
            this.loading = true
            this.lossTypeService.getLossTypes()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.losstypes = data.losstypes
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

    @computed get getLossTypesList() {
        try {
            this.loading = true
            this.lossTypeService.getLossTypesList()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.all_losstypes = data.losstypes
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
