import {action, observable} from 'mobx'
import DebitComplexService from '../services/debitComplexService'
import _ from 'lodash'

export default class DebitComplexStore {
    @observable loading = false
    @observable debits = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.debitComplexService = new DebitComplexService()
    }

    getDebits() {
        try {
            this.debitComplexService.getDebitsComplex()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.debits = data.debits.edges.map(node => node.node)
                })
                .catch(error => {
                    this.error = error.message
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
}
