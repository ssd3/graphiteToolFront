import {client} from '../httpClient/client'
import GET_WAREHOUSES from '../queries/warehouse/getWarehouses.graphql'
import GET_WAREHOUSES_LIST from '../queries/warehouse/getWarehousesList.graphql'

class WarehouseService {
    getWarehousesList = async (params) => {
        return await client.query({
            query: GET_WAREHOUSES_LIST,
            variables: params
        })
    }

    getWarehouses = async (params) => {
        return await client.query({
            query: GET_WAREHOUSES,
            variables: params
        })
    }
}

export default WarehouseService
