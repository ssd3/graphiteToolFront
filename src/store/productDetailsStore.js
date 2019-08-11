import {action, observable} from 'mobx'
import ProductDetailsService from '../services/productDetailsService'
import _ from 'lodash'
import Validator from 'validatorjs'

const rules = {
    productid: 'required|numeric',
    productdetailsid: 'required|numeric',
    model: 'string|between:1,128',
    url: 'string|between:1,1024',
    serialno: 'string|between:1,128',
    weight: 'numeric',
    height: 'numeric',
    width: 'numeric',
    length: 'numeric'
}

export default class ProductDetailsStore {
    @observable loading = false
    @observable productdetails = []
    @observable productdetail
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.productDetailsService = new ProductDetailsService()
    }

    getProductDetailsByID(productdetailsid) {
        try {
            this.loading = true
            this.productDetailsService.getProductDetailsByID(productdetailsid)
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.productdetail = data.productdetail
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

    getProductDetailsByProductID(productid) {
        try {
            this.loading = true
            this.productDetailsService.getProductDetailsByProductID(productid)
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.productdetails = data.productdetails
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

    @action saveProductDetails(productdetails, debitid = null) {
        try {
            this.loading = true
            this.productDetailsService.saveProductDetails(productdetails)
                .then(({ data }) => {
                    if (debitid !== null) {
                        this.rootStore.debitComplexStore.updateProductDetails(data.result.productdetails, debitid)
                    } else {
                        const idx = _.findIndex(this.productdetails, { productdetailsid: data.result.productdetails.productdetailsid })
                        if (idx === -1)
                            this.productdetails.push(data.result.productdetails)
                        else
                            this.productdetails[idx] = data.result.productdetails
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

    getProductUrl(debitid) {
        const {debitComplexStore} = this.rootStore
        const debitIdx = _.findIndex(debitComplexStore.expandedRows, {debitid: debitid})
        if (debitIdx > -1) {
            const {product} = debitComplexStore.expandedRows[debitIdx]
            const {productdetails} = product
            if (productdetails.length > 0) {
                const { url } = productdetails[0]
                if (url !== undefined) {
                    if (url !== '') {
                        if (url.includes('://', 0))
                            return url
                        else
                            return `https://${url}`
                    }
                }
            }
        }
        return null
    }

    @action saveLocalChanges(e, debitid) {
        const { debitComplexStore } = this.rootStore
        debitComplexStore.clearErrors()
        const debitIdx = _.findIndex(debitComplexStore.expandedRows, {debitid: debitid})
        if (debitIdx > -1) {
            const { product } = debitComplexStore.expandedRows[debitIdx]
            const { productdetails } = product
            const updatedProductDetails = {}
            if (productdetails.length > 0) {
                Object.assign(updatedProductDetails, productdetails[0])
            } else {
                rules.productdetailsid = 'numeric'
                updatedProductDetails.productdetailsid = ''
            }
            updatedProductDetails.productid = product.productid
            updatedProductDetails[e.target.id] = e.target.value

            const validation = new Validator(updatedProductDetails, rules)
            if (validation.check())
                this.saveProductDetails(updatedProductDetails, debitid)
            else
            {
                debitComplexStore.showErrors(validation.errors.all())
            }
        }
    }
}
