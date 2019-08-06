import {computed, observable} from 'mobx'
import DebitComplexService from '../services/debitComplexService'

export default class DebitComplexService {
    @observable loading = false
    @observable categories = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.categoryService = new DebitComplexService()
    }

    @computed get getCategories() {
        try {
            this.categoryService.getCategories()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.categories = data.categories
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }
}
