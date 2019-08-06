import {computed, observable} from 'mobx'
import DiscountService from '../services/discountService'

export default class DiscountStore {
    @observable loading = false
    @observable discounts = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.discountService = new DiscountService()
    }

    @computed get getDiscounts() {
        try {
            this.discountService.getDiscounts()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.discounts = data.discounts
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }
}
