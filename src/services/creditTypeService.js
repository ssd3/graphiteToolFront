import {client} from '../httpClient/client'
import GET_CREDIT_TYPES from '../queries/credittype/getCreditTypes.graphql'
import GET_CREDIT_TYPES_LIST from '../queries/credittype/getCreditTypeList.graphql'

class CreditTypeService {
    getCreditTypes = async () => {
        return await client.query({
            query: GET_CREDIT_TYPES
        })
    }

    getCreditTypesList = async () => {
        return await client.query({
            query: GET_CREDIT_TYPES_LIST
        })
    }
}

export default CreditTypeService
