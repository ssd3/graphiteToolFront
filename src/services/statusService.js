import {client} from '../httpClient/client'
import GET_STATUSES from '../queries/status/getStatuses.graphql'
import GET_STATUS from '../queries/status/getStatus.graphql'
import CREATE_STATUS from '../queries/status/createStatus.graphql'

class StatusService {
    getStatuses = async () => {
        return await client.query({
            query: GET_STATUSES
        })
    }

    getStatus = async (statusid) => {
        return await client.query({
            query: GET_STATUS,
            variables: { statusid }
        })
    }

    createStatus = async (status) => {
        return await client.mutate({
            mutation: CREATE_STATUS,
            variables: status
        })
    }
}

export default StatusService
