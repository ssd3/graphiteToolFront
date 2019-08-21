import {client} from '../httpClient/client'
import GET_STAFFS from '../queries/user/getStaffs.graphql'

class UserService {
    getStaffsList = async () => {
        return await client.query({
            query: GET_STAFFS
        })
    }
}

export default UserService
