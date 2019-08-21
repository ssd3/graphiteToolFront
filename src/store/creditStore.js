import {action, autorun, computed, observable} from 'mobx'
import CreditService from '../services/creditService'

export default class CreditStore {
    @observable loading = false
    @observable credits = []
    @observable error = ''
    @observable isBoxCreditSidebar = false

    constructor(rootStore) {
        this.rootStore = rootStore
        this.creditService = new CreditService()
    }

    @action showBoxCreditSidebar(flag) {
        this.isBoxCreditSidebar = flag
    }
}
