import {computed, observable} from 'mobx'
import WarehouseService from '../services/warehouseService'

export default class WarehouseStore {
    @observable loading = false
    @observable warehouses = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.warehouseService = new WarehouseService()
    }

    getWarehouses(params) {
        try {
            this.warehouseService.getWarehouses(params)
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.warehouses = data.warehouses.edges.map(node => node.node)
                })
                .catch(error => {
                    this.error = error.message
                })
        } catch (e) {
            this.error = e.message
        }
    }
}
