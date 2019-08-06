import {client} from '../httpClient/client'
import GET_PRICETYPES from '../queries/pricetype/getPriceTypes.graphql'

class PriceTypeService {
    getPriceTypes = async () => {
        return await client.query({
            query: GET_PRICETYPES
        })
    }
}

export default PriceTypeService
