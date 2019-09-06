import {action, observable} from 'mobx'
import CreditService from '../services/creditService'
import { toJS } from 'mobx'
import Validator from 'validatorjs'

const newCreditRules = {
    creditid: 'numeric',
    tracknumber: 'string|between:1,64',
    buyerid: 'required|numeric',
    fromwarehouseid: 'required|numeric',
    towarehouseid: 'required|numeric',
    sent: 'date',
    received: 'date',
    creditlosses: 'array|min:0',
    creditdetails: 'array|min:1'
}

export default class CreditStore {
    @observable loading = false
    @observable credits = []
    @observable error = ''
    @observable isCreditSidebar = false
    @observable newCredit = {
        creditid: '',
        credittypeid: '',
        buyerid: '',
        fromwarehouseid: '',
        towarehouseid: '',
        sent: new Date(),
        received: new Date(),
        tracknumber: '',
        creditlosses: [],
        comment: '',
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
        data.creditlossid = new Date().getTime()
        this.newCredit.creditlosses = [...this.newCredit.creditlosses, data]
    }

    @action updateLocalCreditLoss(data) {
        this.newCredit.creditlosses = data
        this.recalcLocalCreditLoss()
    }

    @action removeLocalCreditLoss(id) {
        const _creditlosses = [...this.newCredit.creditlosses]
        const index =  _creditlosses.findIndex(item => item.creditlossid === id)
        if (index > -1) {
            _creditlosses.splice(index, 1)
            this.newCredit.creditlosses = [..._creditlosses]
            this.recalcLocalCreditLoss()
        }
    }

    @action recalcLocalCreditLoss(){
        this.creditLossSum = this.newCredit.creditlosses.map(item => isNaN(item.rate) ? 0 : +item.rate)
                                                        .reduce((prev, current) => prev + current)
    }

    @action updateLocalCreditComment(data) {
        this.newCredit.comment = data
    }

    @action addLocalCreditDetails() {
        const { selectedRows: selectedProducts } = this.rootStore.debitComplexStore
        const _creditDetails = [...this.newCredit.creditdetails]

        selectedProducts.forEach(product => {
            if (_creditDetails.findIndex(creditdetail => creditdetail.productid === product.product.productid) === -1) {
                const _price = product.price - (product.price * product.discount.rate / 100)
                if (_price > 0 && product.availableqty > 0)
                    _creditDetails.unshift({
                        debitid: product.debitid,
                        productid: product.product.productid,
                        title: product.product.title,
                        debitprice: product.price,
                        debitpricetype: product.pricetype.title,
                        discount: product.discount.title,
                        discountprice: _price,
                        debitrowsum: product.availableqty * _price,
                        debitavailableqty: product.availableqty,
                        creditprice: _price,
                        creditpricetypeid: product.pricetype.pricetypeid,
                        creditpricetype: product.pricetype.title,
                        creditqty: product.availableqty,
                        creditrowsum: product.availableqty * _price,
                        creditrowincome: 0
                    })
            }
        })
        this.newCredit.creditdetails = [..._creditDetails]
        this.recalcLocalCreditDetailsTotal()
    }

    @action removeLocalCreditDetail(data) {
        const _creditDetails = [...this.newCredit.creditdetails]
        const idx = _creditDetails.findIndex(item => item.productid === data)
        if (idx > -1) {
            _creditDetails.splice(idx, 1)
            this.newCredit.creditdetails = [..._creditDetails]
        }
        this.recalcLocalCreditDetailsTotal()
    }

    @action recalcLocalCreditDetailsTotal() {
        this.creditDetailsCount = this.newCredit.creditdetails
            .map(creditdetail => creditdetail.creditqty)
            .reduce((acc, current) => acc + current, 0)

        this.creditDetailsSum = this.newCredit.creditdetails
            .map(creditdetail => creditdetail)
            .reduce((acc, current) => acc + current.creditprice * current.creditqty, 0)
            .toFixed(2)

        this.newCredit.creditdetails
            .map(creditdetail => {
                creditdetail.creditrowsum = (creditdetail.creditprice * creditdetail.creditqty).toFixed(2)
                creditdetail.creditrowincome = (creditdetail.creditrowsum - creditdetail.creditqty * creditdetail.discountprice).toFixed(2)
            })

        this.creditDetailsIncomeSum = this.newCredit.creditdetails
            .map(creditdetail => +creditdetail.creditrowincome)
            .reduce((acc, current) => acc + current, 0)
            .toFixed(2)
    }

    @action updateLocalCreditDetails(data) {
        this.newCredit.creditdetails = data
        this.recalcLocalCreditDetailsTotal()
    }

    @action saveCredit(){
        console.log(toJS(this.newCredit))

        const validation = new Validator(this.newCredit, newCreditRules)
        validation.setAttributeNames({ tracknumber: 'Track Number' })
        if (validation.check()) {
            //save data
            console.log('save data!!!')
        }
        else
        {
            this.showErrors(validation.errors.all())
        }
        /*
        this.loading = true
        this.creditService.saveCredit(this.newCredit)
            .then(({ data }) => {
                this.newCredit.creditid = data.result.credit.creditid
                this.newCredit.creditlosses = data.result.creditlosses
                this.newCredit.creditdetails = data.result.creditdetails
            })
            .catch(error => this.error = error.message)
            .finally(() => this.loading = false )
         */
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
