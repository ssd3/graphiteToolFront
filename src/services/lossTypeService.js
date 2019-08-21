import {client} from '../httpClient/client'
import GET_LOSS_TYPES from '../queries/losstype/getLossTypes.graphql'
import GET_LOSS_TYPES_LIST from '../queries/losstype/getLossTypesList.graphql'

class LossTypeService {
    getLossTypes = async () => {
        return await client.query({
            query: GET_LOSS_TYPES
        })
    }

    getLossTypesList = async () => {
        return await client.query({
            query: GET_LOSS_TYPES_LIST
        })
    }
}

export default LossTypeService
