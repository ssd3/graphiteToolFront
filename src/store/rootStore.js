import StatusStore from './statusStore'
import ProductStore from './productStore'
import AuthStore from './authStore'
import PagesStore from './pagesStore'

export default class RootStore {
    constructor() {
        this.authStore = new AuthStore()
        this.pagesStore = new PagesStore()
        this.statusStore = new StatusStore()
        this.productStore = new ProductStore()
    }
}
