import {autorun, computed, observable} from 'mobx'
import WarehouseService from '../services/warehouseService'

export default class WarehouseStore {
    @observable loading = false
    @observable warehouses = []
    @observable in_warehouses = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.warehouseService = new WarehouseService()
        autorun(() => {
            this.getInWarehouses
        })
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

    @computed get getInWarehouses() {
        try {
            this.loading = true
            this.warehouseService.getInWarehouses()
                .then(({ loading, data }) => {
                    this.loading = loading
                    this.in_warehouses = data.warehouses.edges.map(node => node.node)
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
