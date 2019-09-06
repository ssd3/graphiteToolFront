import {client} from '../httpClient/client'
import CREATE_CREDIT_COMPLEX from '../queries/creditComplex/createCreditComplex.graphql'

class CreditService {
    saveCredit = async (credit) => {
        return await client.mutate({
            mutation: credit.creditid === '' ? CREATE_CREDIT_COMPLEX : CREATE_CREDIT_COMPLEX,
            variables: credit
        })
    }
}

export default CreditService
