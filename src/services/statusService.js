import {client} from '../httpClient/client'
import GET_STATUSES from '../queries/status/getStatuses.graphql'
import GET_STATUS from '../queries/status/getStatus.graphql'
import CREATE_STATUS from '../queries/status/createStatus.graphql'
import UPDATE_STATUS from '../queries/status/updateStatus.graphql'
import GET_STATUSES_LIST from '../queries/status/getStatusesList.graphql'

class StatusService {
    getAllStatuses = async () => {
        return await client.query({
            query: GET_STATUSES_LIST
        })
    }

    getStatuses = async (search) => {
        return await client.query({
            query: GET_STATUSES,
            variables: search
        })
    }

    getStatus = async (statusid) => {
        return await client.query({
            query: GET_STATUS,
            variables: statusid
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
