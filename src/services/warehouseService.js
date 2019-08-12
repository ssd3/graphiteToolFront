import {client} from '../httpClient/client'
import GET_WAREHOUSES from '../queries/warehouse/getWarehouses.graphql'
import GET_IN_WAREHOUSES_LIST from '../queries/warehouse/getWarehousesList.graphql'

class WarehouseService {
    getInWarehouses = async () => {
        return await client.query({
            query: GET_IN_WAREHOUSES_LIST
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
