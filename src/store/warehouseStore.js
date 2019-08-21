import {autorun, computed, observable} from 'mobx'
import WarehouseService from '../services/warehouseService'

export default class WarehouseStore {
    @observable loading = false
    @observable warehouses = []
    @observable in_warehouses = []
    @observable out_warehouses = []
    @observable error = ''

    constructor(rootStore) {
        this.rootStore = rootStore
        this.warehouseService = new WarehouseService()
        autorun(() => {
            this.getWarehousesList({active: true, inField: true, outField: false})
            this.getWarehousesList({active: true, inField: false, outField: true})
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

    getWarehousesList(params) {
        try {
            this.loading = true
            this.warehouseService.getWarehousesList(params)
                .then(({ loading, data }) => {
                    this.loading = loading
                    if (params.inField)
                        this.in_warehouses = data.warehouses.edges.map(node => node.node)
                    else
                        this.out_warehouses = data.warehouses.edges.map(node => node.node)
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
