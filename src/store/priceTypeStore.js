import {autorun, computed, observable} from 'mobx'
import PriceTypeService from '../services/priceTypeService'

export default class PriceTypeStore {
    @observable loading = false
    @observable pricetypes = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.priceTypeService = new PriceTypeService()
        autorun(() => {
            this.getPriceTypes
        })
    }

    @computed get getPriceTypes() {
        try {
            this.loading = true
            this.priceTypeService.getPriceTypes()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.pricetypes = data.pricetypes
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
