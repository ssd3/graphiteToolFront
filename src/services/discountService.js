import {client} from '../httpClient/client'
import GET_DISCOUNTS from '../queries/discount/getDiscounts.graphql'

class DiscountService {
    getDiscounts = async () => {
        return await client.query({
            query: GET_DISCOUNTS
        })
    }
}

export default DiscountService
