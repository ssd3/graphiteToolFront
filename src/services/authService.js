import {client} from '../httpClient/client'
import TOKEN_AUTH from '../queries/auth/tokenAuth.graphql'
import VERIFY_TOKEN from '../queries/auth/verifyToken.graphql'

class AuthService {
    tokenAuth = async (username, password) => {
        return await client.mutate({
            mutation: TOKEN_AUTH,
            variables: {
                username: username,
                password: password
            }
        })
    }

    verifyToken = async (token) => {
        return await client.mutate({
            mutation: VERIFY_TOKEN,
            variables: {
                token: token
            }
        })
    }
}

export default AuthService
