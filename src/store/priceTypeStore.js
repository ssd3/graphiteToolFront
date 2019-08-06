import {computed, observable} from 'mobx'
import PriceTypeService from '../services/priceTypeService'

export default class PriceTypeStore {
    @observable loading = false
    @observable priceTypes = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.priceTypeService = new PriceTypeService()
    }

    @computed get getPriceTypes() {
        try {
            this.priceTypeService.getPriceTypes()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.priceTypes = data.priceTypes
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }
}
