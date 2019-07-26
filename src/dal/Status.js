import {client} from '../httpClient/client'
import { GET_STATUSES } from '../queries/StatusQueries'

async function StatusesGet(variables = {}) {
    return await client.query({
        query: GET_STATUSES,
        variables: variables
    })
}

export { StatusesGet }
