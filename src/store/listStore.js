import {autorun, computed, observable} from 'mobx'

export default class ListStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    get getListData() {
        return {
            categories: this.rootStore.categoryStore.categories,
            statuses: this.rootStore.statusStore.all_statuses,
            pricetypes: this.rootStore.priceTypeStore.pricetypes,
            discounts: this.rootStore.discountStore.discounts,
            in_warehouses: this.rootStore.warehouseStore.in_warehouses,
            out_warehouses: this.rootStore.warehouseStore.out_warehouses
        }
    }
}
