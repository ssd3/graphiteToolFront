import {client} from '../httpClient/client'
import GET_STATUSES from '../queries/status/getStatuses.graphql'
import GET_STATUS from '../queries/status/getStatus.graphql'
import CREATE_STATUS from '../queries/status/createStatus.graphql'
import UPDATE_STATUS from '../queries/status/updateStatus.graphql'

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

    saveStatus = async (status) => {
        return await client.mutate({
            mutation: status.statusid === '' ? CREATE_STATUS : UPDATE_STATUS,
            variables: status
            // refetchQueries: [{ query: GET_STATUSES}]
        })
    }
}

export default StatusService
