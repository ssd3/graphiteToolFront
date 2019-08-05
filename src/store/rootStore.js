import StatusStore from './statusStore'
import ProductStore from './productStore'
import AuthStore from './authStore'
import PagesStore from './pagesStore'

export default class RootStore {
    constructor() {
        this.authStore = new AuthStore(this)
        this.pagesStore = new PagesStore(this)
        this.statusStore = new StatusStore(this)
        this.productStore = new ProductStore(this)
    }
}
