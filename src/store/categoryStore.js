import {computed, observable} from 'mobx'
import CategoryService from '../services/categoryService'

export default class CategoryStore {
    @observable loading = false
    @observable categories = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.categoryService = new CategoryService()
    }

    @computed get getCategories() {
        try {
            this.loading = true
            this.categoryService.getCategories()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.categories = data.categories
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
