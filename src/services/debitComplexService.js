import {client} from '../httpClient/client'
import GET_DEBITS from '../queries/debitComplex/getDebits.graphql'
import CREATE_DEBIT_COMPLEX from '../queries/debitComplex/createDebit.graphql'
import UPDATE_DEBIT_COMPLEX from '../queries/debitComplex/updateDebit.graphql'

class DebitComplexService {
    getDebitsComplex = async (params) => {
        return await client.query({
            query: GET_DEBITS,
            variables: params
        })
    }

    saveDebitComplex = async (debit) => {
        return await client.mutate({
            mutation: debit.debitid === '' ? CREATE_DEBIT_COMPLEX : UPDATE_DEBIT_COMPLEX,
            variables: debit
        })
    }
}

export default DebitComplexService
