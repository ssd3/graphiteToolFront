import {action, extendObservable, observable} from 'mobx'
import DebitComplexService from '../services/debitComplexService'
import _ from 'lodash'

export default class DebitComplexStore {
    @observable loading = false
    @observable debits = []
    @observable error = ''
    @observable selectedRows = []
    @observable expandedRows = []
    @observable isFilteredByColumns = false
    @observable isSortedByColumns = false
    @observable isShowDebitDialog = false
    @observable searchText = ''
    @observable rowsPerPage = 10
    @observable pageInfo
    @observable totalCount

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
            this.searchText = params.searchText

            if (params.first === undefined && params.last === undefined)
                params.first = this.rowsPerPage

            this.debitComplexService.getDebitsComplex(params)
                .then(({ loading, data }) => {
                    this.loading = loading
                    if (data.debits !== null) {
                        //TODO: MobX observable objects do not detect or react to property assignments that weren't declared observable before.
                        // So MobX observable objects act as records with predefined keys. You can use extendObservable(target, props) to introduce
                        // new observable properties to an object.
                        // My solution: so, we should prepare the full object, then assign it to observable target object
                        // In my case 'availableqty' is a new property on object
                        const _data = data.debits.edges.map(node => node.node)
                        _data.forEach((debit, index) => {
                            _data[index].availableqty = debit.qty - debit.credit.reduce((qty, item) => qty + item.qty, 0)
                        })
                        this.debits = _data
                        this.pageInfo = data.debits.pageInfo
                        this.totalCount = data.debits.totalCount
                    }
                    else {
                        this.debits = []
                        this.pageInfo = {}
                        this.totalCount = 0
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

    @action saveDebit(debit) {
        try {
            this.loading = true
            if (debit.comment === '')
                delete debit.comment
            this.debitComplexService.saveDebitComplex(debit)
                .then(({ data }) => {
                    const idx = _.findIndex(this.debits, { debitid: data.result.debit.debitid })
                    if (idx === -1) {
                        const { debit } = data.result
                        debit.availableqty = debit.qty - debit.credit.reduce((qty, item) => qty + item.qty, 0)
                        this.debits.unshift(debit)
                        this.totalCount = this.totalCount + 1
                    }
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
        this.loading = false
        this.selectedRows = []
        this.expandedRows = []
        this.isFilteredByColumns = false
        this.isSortedByColumns = false
        this.searchText = ''
        this.rowsPerPage = 10
        this.getDebits({searchText: '', first: 10})
    }

    @action pagerChange(e) {
        const _type = e.type
        const query = {
            searchText: this.searchText,
            first: this.rowsPerPage,
            last: this.rowsPerPage,
            after: this.pageInfo.endCursor,
            before: this.pageInfo.startCursor
        }
        switch (_type) {
            case 'firstPage':
                delete query.last
                delete query.after
                delete query.before
                break
            case 'nextPage':
                delete query.last
                delete query.before
                break
            case 'prevPage':
                delete query.first
                delete query.after
                break
            case 'lastPage':
                delete query.first
                delete query.after
                delete query.before
                break
            case 'rowsPerPage':
                this.rowsPerPage = e.rowsPerPage
                query.first = this.rowsPerPage
                delete query.last
                delete query.after
                delete query.before
                break
            default:
                break
        }
        this.getDebits(query)
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
            const { tracknumber, status, qty, price, pricetype, discount, warehouse, notes, credit } = debit
            this.debits[debitIdx].tracknumber = tracknumber
            this.debits[debitIdx].status = status
            this.debits[debitIdx].price = price
            this.debits[debitIdx].qty = qty
            this.debits[debitIdx].availableqty = qty - credit.reduce((qty, item) => qty + item.qty, 0)
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

    @action updateDebitsStatus(statusid) {
        try {
            this.loading = true

            const params = {
                debitid: this.selectedRows.map(item => item.debitid),
                statusid: statusid
            }

            this.debitComplexService.updateDebitsStatus(params)
                .then(({ data }) => {
                    data.result.debits.map(debit => {
                        const idx = _.findIndex(this.debits, { debitid: debit.debitid })
                        if (idx > -1)
                            this.debits[idx] = debit
                    })
                })
                .catch(error => {
                    this.error = error.message
                })
                .finally(() => {
                    this.selectedRows = []
                    this.loading = false
                })
        } catch (e) {
            this.error = e.message
        }
    }
}
