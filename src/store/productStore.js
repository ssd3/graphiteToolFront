import {action, observable} from 'mobx'

export default class ProductStore {
    @observable loading = false
    @observable error = ''
    @observable product
    @observable products

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    getProducts(params) {
        try {
            this.loading = false
            this.products = []
        } catch (e) {
            this.error = e.message
        }
    }

    getProduct(params) {
        try {
            this.loading = false
            this.product = {}
        } catch (e) {
            this.error = e.message
        }
    }

    @action saveProduct(product) {
        this.loading = false
    }
}
