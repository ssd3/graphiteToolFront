import {action, observable} from 'mobx'
import DebitService from '../services/debitService'
import _ from 'lodash'
import Validator from 'validatorjs'

const rules = {
    debitid: 'required|numeric',
    tracknumber: 'required|string|between:1,64',
    statusid: 'required|numeric',
    qty: 'required|numeric',
    price: 'required|numeric',
    pricetypeid: 'required|numeric',
    discountid: 'required|numeric',
    warehouseid: 'required|numeric',
    notes: 'string|between:1,2048'
}


export default class DebitStore {
    @observable loading = false
    @observable debits = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.debitService = new DebitService()
    }

    @action saveDebit(debit, debitid = null) {
        try {
            this.loading = true
            this.debitService.saveDebit(debit)
                .then(({ data }) => {
                    if (debitid !== null) {
                        this.rootStore.debitComplexStore.updateDebit(data.result.debit, debitid)
                    } else {
                        const idx = _.findIndex(this.debits, { debitid: data.result.debit.debitid })
                        if (idx === -1)
                            this.debits.push(data.result.debit)
                        else
                            this.debits[idx] = data.result.debit
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
            const debit = debitComplexStore.expandedRows[debitIdx]

            const updatedDebit = {
                debitid: debit.debitid,
                productid: debit.product.productid,
                tracknumber: debit.tracknumber,
                statusid: debit.status.statusid,
                qty: debit.qty,
                price: debit.price,
                pricetypeid: debit.pricetype.pricetypeid,
                discountid: debit.discount.discountid,
                warehouseid: debit.warehouse.warehouseid,
                notes: debit.notes
            }
            updatedDebit[e.target.id] = e.target.value

            const validation = new Validator(updatedDebit, rules)
            validation.setAttributeNames({ tracknumber: 'Track Number' })
            validation.setAttributeNames({ qty: 'Product Qty' })
            validation.setAttributeNames({ price: 'Product Price' })
            if (validation.check())
                this.saveDebit(updatedDebit, debitid)
            else
            {
                debitComplexStore.showErrors(validation.errors.all())
            }
        }
    }
}
