import {client} from '../httpClient/client'
import GET_WAREHOUSES from '../queries/warehouse/getWarehouses.graphql'

class WarehouseService {
    getWarehouses = async (params) => {
        return await client.query({
            query: GET_WAREHOUSES,
            variables: params
        })
    }
}

export default WarehouseService
