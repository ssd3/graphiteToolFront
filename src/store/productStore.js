import {action, observable} from 'mobx'
import ProductService from '../services/productService'
import _ from 'lodash'
import Validator from 'validatorjs'

const rules = {
    productid: 'required|numeric',
    title: 'required|string|between:1,48',
    categoryid: 'required|numeric',
    description: 'string|between:1,1024'
}

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

    @action saveLocalChanges(e, debitid) {
        const { debitComplexStore } = this.rootStore
        debitComplexStore.clearErrors()
        const debitIdx = _.findIndex(debitComplexStore.expandedRows, {debitid: debitid})
        if (debitIdx > -1) {
            const { product } = debitComplexStore.expandedRows[debitIdx]

            const updatedProduct = {
                productid: product.productid,
                categoryid: product.category.categoryid,
                title: product.title,
                description: product.description
            }
            updatedProduct[e.target.id] = e.target.value

            const validation = new Validator(updatedProduct, rules)
            if (validation.check())
                this.saveProduct(updatedProduct, debitid)
            else
            {
                debitComplexStore.showErrors(validation.errors.all())
            }
        }
    }
}
