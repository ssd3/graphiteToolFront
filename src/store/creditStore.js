import {action, observable} from 'mobx'
import CreditService from '../services/creditService'
import { toJS } from 'mobx'
import Validator from 'validatorjs'

const creditRules = {
    creditid: 'numeric',
    credittypeid: 'required|numeric',
    buyerid: 'required|numeric',
    fromwarehouseid: 'required|numeric',
    towarehouseid: 'required|numeric',
    sent: 'date',
    received: 'date',
    tracknumber: 'required|string|between:1,64',
    creditlosses: 'array|min:0',
    creditdetails: 'required|array|min:1'
}

export default class CreditStore {
    @observable loading = false
    @observable credits = []
    @observable error = ''
    @observable isCreditSidebar = false
    @observable credit = {
        creditid: '',
        credittypeid: '',
        buyerid: '',
        fromwarehouseid: '',
        towarehouseid: '',
        sent: new Date(),
        received: new Date(),
        tracknumber: '',
        creditlosses: [],
        creditcomment: {
            creditcommentid: '',
            comment: ''
        },
        creditdetails: []
    }
    @observable creditLossSum = 0
    @observable creditDetailsCount = 0
    @observable creditDetailsSum = 0
    @observable creditDetailsIncomeSum = 0

    constructor(rootStore) {
        this.rootStore = rootStore
        this.creditService = new CreditService()
    }

    @action showCreditSidebar(flag) {
        this.isCreditSidebar = flag
        if (flag)
            this.addLocalCreditDetails()
    }

    @action addLocalCreditLoss(data) {
        // data.creditlossid = new Date().getTime()
        this.credit.creditlosses = [...this.credit.creditlosses, data]
    }

    @action updateLocalCreditLoss(data) {
        this.credit.creditlosses = data
        this.recalcLocalCreditLoss()
    }

    @action removeLocalCreditLoss(id) {
        const _creditlosses = [...this.credit.creditlosses]
        const index =  _creditlosses.findIndex(item => item.creditlossid === id)
        if (index > -1) {
            _creditlosses.splice(index, 1)
            this.credit.creditlosses = [..._creditlosses]
            this.recalcLocalCreditLoss()
        }
    }

    @action recalcLocalCreditLoss(){
        this.creditLossSum = this.credit.creditlosses.map(item => isNaN(item.rate) ? 0 : +item.rate)
                                                        .reduce((prev, current) => prev + current)
    }

    @action updateLocalCreditComment(data) {
        this.credit.creditcomment.comment = data
    }

    @action addLocalCreditDetails() {
        const { selectedRows: selectedProducts } = this.rootStore.debitComplexStore
        const _creditDetails = [...this.credit.creditdetails]

        selectedProducts.forEach(product => {
            if (_creditDetails.findIndex(creditdetail => creditdetail.product.productid === product.product.productid) === -1) {
                const _price = product.price - (product.price * product.discount.rate / 100)
                if (_price > 0 && product.availableqty > 0)
                    _creditDetails.unshift({
                        debitid: product.debitid,
                        product: product.product,
                        debit: {
                            price: product.price,
                            availableqty: product.availableqty,
                            pricetype: product.pricetype,
                            rowsum: (product.availableqty * _price).toFixed(2),
                            discount: product.discount
                        },
                        discountprice: _price,
                        price: _price,
                        pricetype: product.pricetype,
                        qty: product.availableqty,
                        rowsum: (product.availableqty * _price).toFixed(2),
                        rowincome: 0
                    })
            }
        })
        this.credit.creditdetails = [..._creditDetails]
        this.recalcLocalCreditDetailsTotal()
    }

    @action removeLocalCreditDetail(data) {
        const _creditDetails = [...this.credit.creditdetails]
        const idx = _creditDetails.findIndex(item => item.productid === data)
        if (idx > -1) {
            _creditDetails.splice(idx, 1)
            this.credit.creditdetails = [..._creditDetails]
        }
        this.recalcLocalCreditDetailsTotal()
    }

    @action recalcLocalCreditDetailsTotal() {
        this.creditDetailsCount = this.credit.creditdetails
            .map(creditdetail => creditdetail.qty)
            .reduce((acc, current) => acc + current, 0)

        this.creditDetailsSum = this.credit.creditdetails
            .map(creditdetail => creditdetail)
            .reduce((acc, current) => acc + current.price * current.qty, 0)
            .toFixed(2)

        this.credit.creditdetails
            .map(creditdetail => {
                creditdetail.rowsum = (creditdetail.price * creditdetail.qty).toFixed(2)
                creditdetail.rowincome = (creditdetail.rowsum - creditdetail.qty * creditdetail.discountprice).toFixed(2)
            })

        this.creditDetailsIncomeSum = this.credit.creditdetails
            .map(creditdetail => +creditdetail.rowincome)
            .reduce((acc, current) => acc + current, 0)
            .toFixed(2)
    }

    @action updateLocalCreditDetails(data) {
        this.credit.creditdetails = data
        this.recalcLocalCreditDetailsTotal()
    }

    @action saveCredit(){
        console.log(this.credit)

        const validation = new Validator(this.credit, creditRules)
        validation.setAttributeNames({
            credittypeid: 'Credit Type',
            buyerid: 'Buyer',
            fromwarehouseid: 'Warehouse From',
            towarehouseid: 'Warehouse To',
            tracknumber: 'Track Number',
            creditdetails: 'Credit Products'
        })

        if (validation.check()) {
            const tmpCredit = {}
            Object.assign(tmpCredit, toJS(this.credit))

            const creditData = {
                creditid: this.credit.creditid,
                credittypeid: this.credit.credittypeid,
                buyerid: this.credit.buyerid,
                fromwarehouseid: this.credit.fromwarehouseid,
                towarehouseid: this.credit.towarehouseid,
                tracknumber: this.credit.tracknumber,
                sent: this.credit.sent === '' ? null : this.credit.sent,
                received: this.credit.received === '' ? null : this.credit.received
            }

            if (this.credit.creditid === '') {
                creditData.comment = this.credit.creditcomment.comment
            } else {
                creditData.creditcomment = this.credit.creditcomment
            }

            const creditdetails = this.credit.creditdetails.map(creditdetail => {
                const result = {
                    creditdetailsid: creditdetail.creditdetailsid,
                    creditid: creditdetail.creditid,
                    debitid: creditdetail.debitid,
                    productid: creditdetail.product.productid,
                    price: creditdetail.price,
                    qty: creditdetail.qty,
                    pricetypeid: creditdetail.pricetype.pricetypeid
                }

                if (this.credit.creditid === '') {
                    delete result.creditdetailsid
                    delete result.creditid
                }
                else {
                    result.creditid = this.credit.creditid
                    result.creditdetailsid === undefined ? delete result.creditdetailsid : result.creditdetailsid
                }
                return result
            })

            const creditlosses = this.credit.creditlosses.map(creditloss => {
                const result = {
                    creditlossid: creditloss.creditlossid,
                    creditid: creditloss.creditid,
                    losstypeid: creditloss.losstypeid,
                    rate: creditloss.rate,
                    notes: creditloss.notes === '' ? null : creditloss.notes
                }

                if (this.credit.creditid === '') {
                    delete result.creditlossid
                    delete result.creditid
                }
                else {
                    result.creditid = this.credit.creditid
                    result.creditlossid === undefined ? delete result.creditlossid : result.creditlossid
                }

                return result
            })

            creditData.creditdetails = creditdetails
            creditData.creditlosses = creditlosses

            this.creditService.saveCredit(creditData)
                .then(({ data }) => {
                    tmpCredit.creditid = data.result.credit.creditid

                    //update creditid, creditlossid to local tmpCredit.creditlosses
                    data.result.creditlosses.map((creditloss, index) => {
                        tmpCredit.creditlosses[index].creditid = tmpCredit.creditid
                        tmpCredit.creditlosses[index].creditlossid = creditloss.creditlossid
                    })

                    //update creditid, creditdetailsid to local tmpCredit.creditdetails
                    data.result.creditdetails.map((creditdetail, index) => {
                        tmpCredit.creditdetails[index].creditid = tmpCredit.creditid
                        tmpCredit.creditdetails[index].creditdetailsid = creditdetail.creditdetailsid
                    })

                    tmpCredit.creditcomment = data.result.creditcomment

                    this.credit = tmpCredit
                })
                .catch(error => this.error = error.message)
        }
        else
        {
            this.rootStore.debitComplexStore.showErrors(validation.errors.all())
        }
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
}
