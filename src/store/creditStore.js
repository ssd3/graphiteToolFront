import {action, observable} from 'mobx'
import CreditService from '../services/creditService'
// import _ from 'lodash'
import { toJS } from 'mobx'

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
        creditProducts: []
    }
    @observable creditLossSum = 0
    @observable creditDetailsSum = 0
    @observable creditProductsCount = 0
    @observable creditProductsSum = 0

    constructor(rootStore) {
        this.rootStore = rootStore
        this.creditService = new CreditService()
    }

    @action showCreditSidebar(flag) {
        this.isCreditSidebar = flag
        if (flag)
            this.addLocalCreditProducts()
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
        // this.creditLossSum = _.sumBy(this.newCredit.creditlosses, item => isNaN(item.rate) ? 0 : +item.rate)
    }

    @action updateLocalCreditComment(data) {
        this.newCredit.comment = data
    }

    @action addLocalCreditProducts() {
        const { selectedRows: selectedProducts } = this.rootStore.debitComplexStore
        const _creditProducts = [...this.newCredit.creditProducts]

        selectedProducts.forEach(item => {
            if (_creditProducts.findIndex(product => product.productid === item.product.productid) === -1) {
                _creditProducts.push({
                    productid: item.product.productid,
                    title: item.product.title,
                    debitprice: item.price,
                    debitpricetype: item.pricetype.title,
                    discount: item.discount.title,
                    debitrowsum: item.price - (item.price * item.discount.rate / 100),
                    debitqty: item.qty,
                    creditprice: item.price - (item.price * item.discount.rate / 100),
                    creditpricetypeid: item.pricetype.pricetypeid,
                    creditpricetype: item.pricetype.title,
                    creditqty: item.qty
                })
            }
        })
        this.newCredit.creditProducts = [..._creditProducts]
        this.getLocalCreditProductsTotal()
    }

    @action removeLocalCreditProduct(data) {
        const _creditProducts = [...this.newCredit.creditProducts]
        const idx = _creditProducts.findIndex(item => item.productid === data)
        if (idx > -1) {
            _creditProducts.splice(idx, 1)
            this.newCredit.creditProducts = [..._creditProducts]
        }
        this.getLocalCreditProductsTotal()
    }

    @action getLocalCreditProductsTotal() {
        this.creditProductsCount = this.newCredit.creditProducts
            .map(product => product.creditqty)
            .reduce((acc, current) => acc + current, 0)

        this.creditProductsSum = this.newCredit.creditProducts
            .map(product => product)
            .reduce((acc, current) => acc + current.creditprice * current.creditqty, 0)
            .toFixed(2)
    }

    @action saveCredit(){
        console.log(toJS(this.newCredit))
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
