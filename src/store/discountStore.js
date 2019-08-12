import {autorun, computed, observable} from 'mobx'
import DiscountService from '../services/discountService'

export default class DiscountStore {
    @observable loading = false
    @observable discounts = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.discountService = new DiscountService()
        autorun(() => {
            this.getDiscounts
        })
    }

    @computed get getDiscounts() {
        try {
            this.loading = true
            this.discountService.getDiscounts()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.discounts = data.discounts
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
