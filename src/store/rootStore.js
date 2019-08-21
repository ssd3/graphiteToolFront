import StatusStore from './statusStore'
import ProductStore from './productStore'
import AuthStore from './authStore'
import PagesStore from './pagesStore'
import CategoryStore from './categoryStore'
import WarehouseStore from './warehouseStore'
import PriceTypeStore from './priceTypeStore'
import DiscountStore from './discountStore'
import DebitComplexStore from './debitComplexStore'
import ProductDetailsStore from './productDetailsStore'
import ProductCommentsStore from './productCommentsStore'
import DebitStore from './debitStore'
import CreditStore from './creditStore'
import ListStore from './listStore'
import CreditTypeStore from './creditTypeStore'
import LossTypeStore from './lossTypeStore'
import UserStore from './userStore'

export default class RootStore {
    constructor() {
        this.authStore = new AuthStore(this)
        this.pagesStore = new PagesStore(this)
        this.statusStore = new StatusStore(this)
        this.productStore = new ProductStore(this)
        this.categoryStore = new CategoryStore(this)
        this.warehouseStore = new WarehouseStore(this)
        this.priceTypeStore = new PriceTypeStore(this)
        this.discountStore = new DiscountStore(this)
        this.lossTypeStore = new LossTypeStore(this)
        this.creditTypeStore = new CreditTypeStore(this)
        this.userStore = new UserStore(this)
        this.debitComplexStore = new DebitComplexStore(this)
        this.productDetailsStore = new ProductDetailsStore(this)
        this.productCommentsStore = new ProductCommentsStore(this)
        this.debitStore = new DebitStore(this)
        this.creditStore = new CreditStore(this)
        this.listStore = new ListStore(this)
    }
}
