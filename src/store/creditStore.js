import {action, observable} from 'mobx'
import CreditService from '../services/creditService'
import _ from 'lodash'
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
        creditdetails: []
    }
    @observable creditLossSum = 0
    @observable creditDetailsSum = 0

    constructor(rootStore) {
        this.rootStore = rootStore
        this.creditService = new CreditService()
    }

    @action showBoxCreditSidebar(flag) {
        this.isCreditSidebar = flag
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
        const index =  _.findIndex(_creditlosses, { creditlossid: id})
        if (index > -1) {
            _creditlosses.splice(index, 1)
            this.newCredit.creditlosses = [..._creditlosses]
            this.recalcLocalCreditLoss()
        }
    }

    @action recalcLocalCreditLoss(){
        this.creditLossSum = _.sumBy(this.newCredit.creditlosses, item => isNaN(item.rate) ? 0 : +item.rate)
    }

    @action updateLocalCreditComment(data) {
        this.newCredit.comment = data
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
