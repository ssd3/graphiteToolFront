import {action, observable} from 'mobx'
import ProductCommentsService from '../services/productCommentsService'
import _ from 'lodash'
import Validator from 'validatorjs'

const rules = {
    productid: 'required|numeric',
    productcommentid: 'required|numeric',
    comment: 'required|string|between:1,2048'
}

export default class ProductCommentsStore {
    @observable loading = false
    @observable productcomments = []
    @observable productcomment
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.productCommentsService = new ProductCommentsService()
    }

    @action saveProductComment(productcomment, debitid = null) {
        try {
            this.loading = true
            this.productCommentsService.saveProductComment(productcomment)
                .then(({ data }) => {
                    if (debitid !== null) {
                        this.rootStore.debitComplexStore.updateProductComment(data.result.productcomment, debitid)
                    } else {
                        const idx = _.findIndex(this.productcomments, { productcommentid: data.result.productcomment.productcommentid })
                        if (idx === -1)
                            this.productcomments.push(data.result.productcomment)
                        else
                            this.productcomments[idx] = data.result.productcomment
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

    @action saveLocalChanges(productcomment) {
        const { debitComplexStore } = this.rootStore
        debitComplexStore.clearErrors()
        const debitIdx = _.findIndex(debitComplexStore.expandedRows, {debitid: productcomment.debitid})
        if (debitIdx > -1) {
            const { product } = debitComplexStore.expandedRows[debitIdx]
            const updatedProductComment = {}

            if (productcomment.productcommentid === '') {
                rules.productcommentid = 'numeric'
                updatedProductComment.productcommentid = ''
            }
            else {
                updatedProductComment.productcommentid = productcomment.productcommentid
            }

            updatedProductComment.productid = product.productid
            updatedProductComment.comment = productcomment.comment

            const validation = new Validator(updatedProductComment, rules)
            if (validation.check())
                this.saveProductComment(updatedProductComment, productcomment.debitid)
            else
                debitComplexStore.showErrors(validation.errors.all())
        }
    }
}
