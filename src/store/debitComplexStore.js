import {action, observable} from 'mobx'
import DebitComplexService from '../services/debitComplexService'
import _ from 'lodash'

export default class DebitComplexStore {
    @observable loading = false
    @observable debits = []
    @observable debitsPageInfo = {}
    @observable error = ''
    @observable selectedRows = []
    @observable expandedRows = []
    @observable isFilteredByColumns = false
    @observable isSortedByColumns = false
    @observable isShowDebitDialog = false
    @observable pagerInfo = {
        page: 1,
        first: 0,
        rows: 20,
        pageCount: 0
    }

    constructor(rootStore) {
        this.rootStore = rootStore
        this.debitComplexService = new DebitComplexService()
    }

    getDebitComplexByID(debitid) {
        try {
            this.loading = true
            this.debitComplexService.getDebitComplexByID(debitid)
                .then(({ loading, data }) => {
                    this.loading = loading
                    const idx = _.findIndex(this.debits, { debitid: data.debit.debitid })
                    idx > -1 ? this.debits[idx] = data.debit : this.debits.push(data.debit)
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

    getDebits(params) {
        try {
            this.loading = true
            this.debitComplexService.getDebitsComplex(params)
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.debits = data.debits.edges.map(node => node.node)
                    this.debitsPageInfo = data.debits.pageInfo
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

    @action saveDebit(debit) {
        try {
            this.loading = true
            this.debitComplexService.saveDebitComplex(debit)
                .then(({ data }) => {
                    const idx = _.findIndex(this.debits, { debitid: data.result.debit.debitid })
                    if (idx === -1)
                        this.debits.push(data.result.debit)
                    else
                        this.debits[idx] = data.result.debit
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

    @action selectRows(data) {
        this.selectedRows = data
    }

    @action expandRows(data) {
        this.expandedRows = data
    }

    @action filterColumns(value) {
        this.isFilteredByColumns = value
    }

    @action sortColumns(value) {
        this.isSortedByColumns = value
    }

    @action resetAll() {
        this.loading = true
        this.selectedRows = []
        this.expandedRows = []
        this.isFilteredByColumns = false
        this.isSortedByColumns = false
        this.loading = false
    }

    @action pageChange(data) {
        this.pagerInfo = data
    }

    @action updateProduct(product, debitid) {
        this.loading = true
        const debitIdx = _.findIndex(this.debits, {debitid: debitid})
        if (debitIdx > -1) {
            this.debits[debitIdx].product['category'] = product.category
            this.debits[debitIdx].product['title'] = product.title
            this.debits[debitIdx].product['description'] = product.description
        }
        this.loading = false
    }

    @action updateProductDetails(productdetails, debitid) {
        this.loading = true
        const debitIdx = _.findIndex(this.debits, {debitid: debitid})
        if (debitIdx > -1) {
            const productDetailsIdx = _.findIndex(this.debits[debitIdx].product.productdetails, {productdetailsid: productdetails.productdetailsid})
            if (productDetailsIdx > -1) {
                this.debits[debitIdx].product.productdetails[productDetailsIdx] = productdetails
            }
            else {
                this.debits[debitIdx].product.productdetails.push(productdetails)
            }
        }
        this.loading = false
    }

    @action updateProductComment(productcomment, debitid) {
        const debitIdx = _.findIndex(this.debits, {debitid: debitid})
        if (debitIdx > -1) {
            const productCommentIdx = _.findIndex(this.debits[debitIdx].product.productcomments, {productcommentid: productcomment.productcommentid})
            if (productCommentIdx > -1) {
                this.debits[debitIdx].product.productcomments[productCommentIdx] = productcomment
            }
            else {
                this.debits[debitIdx].product.productcomments.push(productcomment)
            }
        }

    }

    @action updateDebit(debit, debitid) {
        this.loading = true
        const debitIdx = _.findIndex(this.debits, {debitid: debitid})
        if (debitIdx > -1) {
            const { tracknumber, status, qty, price, pricetype, discount, warehouse, notes } = debit
            this.debits[debitIdx].tracknumber = tracknumber
            this.debits[debitIdx].status = status
            this.debits[debitIdx].price = price
            this.debits[debitIdx].qty = qty
            this.debits[debitIdx].pricetype = pricetype
            this.debits[debitIdx].discount = discount
            this.debits[debitIdx].warehouse = warehouse
            this.debits[debitIdx].notes = notes
        }
        this.loading = false
    }

    @action showErrors(errors) {
        const _errors = []
        for (let error in errors) {
            if (errors[error] !== null) {
                _errors.push(errors[error])
            }
        }
        this.error = _errors.join('<br />')
    }

    @action clearErrors() {
        this.error = ''
    }

    @action debitDialogShow(isShow) {
        this.isShowDebitDialog = isShow
    }

}
