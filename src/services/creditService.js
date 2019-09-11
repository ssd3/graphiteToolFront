import {client} from '../httpClient/client'
import CREATE_CREDIT_COMPLEX from '../queries/creditComplex/createCreditComplex.graphql'
import UPDATE_CREDIT_COMPLEX from '../queries/creditComplex/updateCreditComplex.graphql'

class CreditService {
    saveCredit = async (credit) => {
        return await client.mutate({
            mutation: credit.creditid === '' ? CREATE_CREDIT_COMPLEX : UPDATE_CREDIT_COMPLEX,
            variables: credit
        })
    }
}

export default CreditService
