import {action, observable} from 'mobx'
import ProductService from '../services/productService'
import _ from 'lodash'

export default class ProductStore {
    @observable loading = false
    @observable error = ''
    @observable product
    @observable products

    constructor(rootStore) {
        this.rootStore = rootStore
        this.productService = new ProductService()
    }

    getProducts() {
        try {
            this.productService.getProducts()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.products = data.products
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }

    getProduct(productid) {
        try {
            this.productService.getProduct(productid)
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.product = data.product
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }

    @action saveProduct(product, debitid = null) {
        try {
            this.loading = true
            this.productService.saveProduct(product)
                .then(({ data }) => {
                    if (debitid !== null) {
                        this.rootStore.debitComplexStore.updateProduct(data.result.product, debitid)
                    } else {
                        const idx = _.findIndex(this.products, { productid: data.result.product.productid })
                        if (idx === -1)
                            this.products.push(data.result.product)
                        else
                            this.products[idx] = data.result.product
                    }
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

    newProductObject() {
        return
    }
}
